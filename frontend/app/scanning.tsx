import { ScanResultModal } from "@/app/scan-result-modal";
import { FoodPrintButton } from "@/components/foodprint-button";
import { FoodPrintText } from "@/components/foodprint-text";
import { BrandColors, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ScanningScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const cameraRef = useRef<CameraView>(null);

  // Handle camera permission
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <FoodPrintText variant="title" color="primary">
            Loading Camera...
          </FoodPrintText>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <FoodPrintText
            variant="title"
            color="primary"
            style={styles.permissionTitle}
          >
            📸 Camera Permission Required
          </FoodPrintText>

          <FoodPrintText
            variant="body"
            color="muted"
            style={styles.permissionText}
          >
            FoodPrint needs access to your camera to scan food items and analyze
            their environmental impact.
          </FoodPrintText>

          <FoodPrintButton
            variant="accent"
            size="lg"
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            Grant Camera Permission
          </FoodPrintButton>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FoodPrintText variant="body" color="muted">
              ← Go Back
            </FoodPrintText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleScanPress = async () => {
    if (!cameraRef.current) return;

    setIsScanning(true);

    try {
      // Take a photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true
      });

      if (photo?.base64) {
        // Send to backend for analysis
        // Try multiple endpoints in case of network changes
        const endpoints = [
          "http://172.20.10.2:8000/detect-base64", // Previous IP address
          "http://172.20.10.5:8000/detect-base64", // Current IP address
          "http://10.0.0.5:8000/detect-base64", // Alternative IP
          "http://192.168.1.5:8000/detect-base64", // Home network IP
          "http://127.0.0.1:8000/detect-base64", // Primary localhost
          "http://localhost:8000/detect-base64", // Localhost fallback
          "http://172.20.10.3:8000/detect-base64" // Alternative IP from backend logs
        ];

        let response;
        let lastError;

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying to connect to: ${endpoint}`);
            // Create an AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                image: `data:image/jpeg;base64,${photo.base64}`
              }),
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
              console.log(`Successfully connected to: ${endpoint}`);
              break;
            }
          } catch (error) {
            console.log(`Failed to connect to ${endpoint}:`, error);
            lastError = error;
            response = null;
          }
        }

        if (!response) {
          const errorMsg =
            lastError instanceof Error ? lastError.message : "Unknown error";
          throw new Error(
            `Failed to connect to backend. Last error: ${errorMsg}`
          );
        }

        const result = await response.json();

        if (result.success && result.detections.length > 0) {
          // Use the first detection for now
          const detection = result.detections[0];
          const carbonInfo = detection.carbon_footprint_info;

          // Map backend response to frontend format
          const scanResult = {
            name: detection.food_name,
            category: "Food", // Default category
            carbonFootprint: parseFloat(
              carbonInfo?.concise_fact?.match(/[\d.]+/)?.[0] || "0"
            ),
            waterUsage: parseFloat(carbonInfo?.water_usage?.match(/[\d.]+/)?.[0] || "0"),
            // Score=100−( Food′s Carbon Footprint−Best Case ValueWorst Case Value−Best Case Value)∗100
            sustainabilityScore: (() => {
              const score = Math.max(
                0,
                Math.min(
                  100,
                  100 -
                    ((carbonInfo?.concise_fact?.match(/[\d.]+/)?.[0] - 0.3) /
                      (60 - 0.3)) *
                      100
                )
              );
              return parseFloat(score.toFixed(2)); // Return as decimal for database
            })(),

            imageUrl: null,
            detailedInfo:
              carbonInfo?.detailed_info ||
              "No additional information available.",
            educationalSnippets: Array.isArray(carbonInfo?.educational_snippets)
              ? carbonInfo.educational_snippets
              : ["No educational snippets available."],
            alternatives: Array.isArray(carbonInfo?.alternatives)
              ? carbonInfo.alternatives
              : ["No alternative foods available."]
          };

          setScanResult(scanResult);
        } else {
          // Fallback result if no food detected
          setScanResult({
            name: "Unknown Food Item",
            category: "Food",
            carbonFootprint: 0,
            waterUsage: 0,
            sustainabilityScore: 0,
            imageUrl: null,
            detailedInfo:
              "Could not identify the food item. Please try again with a clearer image.",
            educationalSnippets: [
              "Could not identify the food item. Please try again with a clearer image."
            ],
            alternatives: ["Please try scanning a different food item."]
          });
        }
      }
    } catch (error) {
      console.error("Error scanning food:", error);

      // Provide more specific error messages
      let errorMessage = "Unable to process the image. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Failed to connect to backend")) {
          errorMessage =
            "Cannot connect to the backend server. Please make sure the backend is running and check your network connection.";
        } else if (
          error.message.includes("timeout") ||
          error.message.includes("aborted")
        ) {
          errorMessage =
            "Request timed out. The server might be busy. Please try again.";
        } else if (error.message.includes("Network request failed")) {
          errorMessage =
            "Network request failed. Please check your internet connection and try again.";
        }
      }

      // Fallback result on error
      setScanResult({
        name: "Scan Error",
        category: "Food",
        carbonFootprint: 0.5,
        waterUsage: 20,
        sustainabilityScore: 50,
        imageUrl: null,
        detailedInfo: errorMessage,
        educationalSnippets: [errorMessage],
        alternatives: ["Please try again or check your connection."]
      });
    }

    setIsScanning(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* Camera Overlay */}
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.topButton, { backgroundColor: "rgba(0,0,0,0.5)" }]}
            >
              <FoodPrintText
                variant="body"
                color="primary"
                style={styles.topButtonText}
              >
                ← Back
              </FoodPrintText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleCameraFacing}
              style={[styles.topButton, { backgroundColor: "rgba(0,0,0,0.5)" }]}
            >
              <FoodPrintText
                variant="body"
                color="primary"
                style={styles.topButtonText}
              >
                🔄 Flip
              </FoodPrintText>
            </TouchableOpacity>
          </View>

          {/* Scanning Frame */}
          <View style={styles.scanningFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <FoodPrintText
              variant="body"
              color="primary"
              style={styles.scanningText}
            >
              Position food item within the frame
            </FoodPrintText>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <FoodPrintButton
              variant="accent"
              size="lg"
              onPress={handleScanPress}
              style={styles.scanButton}
              disabled={isScanning}
            >
              {isScanning ? "Scanning..." : "📸 Scan Food"}
            </FoodPrintButton>

            <FoodPrintText
              variant="caption"
              color="primary"
              style={styles.instructionText}
            >
              Tap to scan and analyze environmental impact
            </FoodPrintText>
          </View>
        </View>
      </CameraView>

      {/* Scan Result Modal */}
      {scanResult && (
        <ScanResultModal
          visible={showModal}
          onClose={handleModalClose}
          scanResult={scanResult}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent"
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  permissionTitle: {
    textAlign: "center",
    marginBottom: 16
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22
  },
  permissionButton: {
    marginBottom: 24
  },
  backButton: {
    padding: 12
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  topButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  topButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  },
  scanningFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    marginVertical: 14
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: BrandColors.brightOrange,
    borderWidth: 3
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  scanningText: {
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20
  },
  bottomControls: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  scanButton: {
    width: "100%",
    marginBottom: 12,
    shadowColor: BrandColors.brightOrange,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  instructionText: {
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  }
});
