import { ScanResultModal } from "@/app/scan-result-modal";
import { FoodPrintButton } from "@/components/foodprint-button";
import { FoodPrintText } from "@/components/foodprint-text";
import { BrandColors, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

// Types for detection results
interface Detection {
  food_name: string;
  confidence: number;
  bbox: [number, number, number, number];
  carbon_footprint_info: any;
}

interface DetectionOverlay {
  detection: Detection;
  id: string;
  fadeAnim: Animated.Value;
}

export default function ScanningScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [continuousMode, setContinuousMode] = useState(false);
  const [detections, setDetections] = useState<DetectionOverlay[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastDetectionTime = useRef<number>(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Continuous detection function
  const performDetection = useCallback(async () => {
    if (!cameraRef.current || isProcessing) return;

    const now = Date.now();
    if (now - lastDetectionTime.current < 1000) return; // Throttle to 1 second

    setIsProcessing(true);
    lastDetectionTime.current = now;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.6, // Lower quality for faster processing
        base64: true
      });

      if (photo?.base64) {
        const endpoints = [
        "http://172.20.10.5:8000/detect-base64",
          "http://172.19.55.31:8000/detect-base64",
          "http://10.251.141.131:8000/detect-base64",
          "http://127.0.0.1:8000/detect-base64",
          "http://localhost:8000/detect-base64",
          "http://172.20.10.3:8000/detect-base64",
        ];

        let response;

        for (const endpoint of endpoints) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Shorter timeout for continuous mode

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
              break;
            }
          } catch {
            response = null;
          }
        }

        if (response) {
          const result = await response.json();

          // Store image info for better coordinate mapping
          if (result.image_info) {
            setImageInfo(result.image_info);
          }

          if (result.success && result.detections.length > 0) {
            // Filter detections by confidence and validate coordinates
            const validDetections = result.detections.filter(
              (detection: Detection) => {
                const [x1, y1, x2, y2] = detection.bbox;
                return (
                  detection.confidence > 0.3 && // Minimum confidence threshold
                  x1 >= 0 &&
                  y1 >= 0 &&
                  x2 > x1 &&
                  y2 > y1 && // Valid coordinates
                  x2 - x1 > 20 &&
                  y2 - y1 > 20 // Minimum size
                );
              }
            );

            if (validDetections.length === 0) return;

            // Create new detection overlays
            const newOverlays: DetectionOverlay[] = validDetections.map(
              (detection: Detection, index: number) => ({
                detection,
                id: `${Date.now()}-${index}`,
                fadeAnim: new Animated.Value(0)
              })
            );

            // Clear old detections and add new ones
            setDetections((prev) => {
              // Fade out old detections
              prev.forEach((overlay) => {
                Animated.timing(overlay.fadeAnim, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true
                }).start();
              });

              // Fade in new detections
              setTimeout(() => {
                newOverlays.forEach((overlay) => {
                  Animated.timing(overlay.fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                  }).start();
                });
              }, 100);

              return newOverlays;
            });
          }
        }
      }
    } catch (error) {
      console.log("Continuous detection error:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  // Start/stop continuous detection
  useEffect(() => {
    if (continuousMode) {
      intervalRef.current = setInterval(performDetection, 1000); // Every 1 second
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDetections([]); // Clear detections when stopping
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [continuousMode, performDetection]);

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

  const toggleContinuousMode = () => {
    setContinuousMode((current) => !current);
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
          "http://172.19.55.31:8000/detect-base64",
          "http://10.251.141.131:8000/detect-base64", // Alternative IP from backend logs
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
            waterUsage: parseFloat(
              carbonInfo?.water_usage?.match(/[\d.]+/)?.[0] || "0"
            ),
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
              return parseFloat(score.toFixed(1)); // Return as decimal for database
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

  // Render detection overlays
  const renderDetectionOverlays = () => {
    return detections.map((overlay) => {
      const [x1, y1, x2, y2] = overlay.detection.bbox;

      // Simple and accurate coordinate mapping
      // Backend now provides actual image dimensions, so we can do direct scaling
      let scaledX1, scaledY1, scaledX2, scaledY2;

      if (imageInfo && imageInfo.width > 0 && imageInfo.height > 0) {
        // Use actual image dimensions for accurate mapping
        const imageWidth = imageInfo.width;
        const imageHeight = imageInfo.height;

        // Calculate scaling factors from image space to screen space
        const scaleX = screenWidth / imageWidth;
        const scaleY = screenHeight / imageHeight;

        // Scale coordinates directly
        scaledX1 = x1 * scaleX;
        scaledY1 = y1 * scaleY;
        scaledX2 = x2 * scaleX;
        scaledY2 = y2 * scaleY;
      } else {
        // Fallback: assume image dimensions match screen dimensions
        // This is less accurate but prevents crashes
        scaledX1 = x1;
        scaledY1 = y1;
        scaledX2 = x2;
        scaledY2 = y2;
      }

      // Ensure coordinates are within screen bounds
      const clampedX1 = Math.max(0, Math.min(scaledX1, screenWidth));
      const clampedY1 = Math.max(0, Math.min(scaledY1, screenHeight));
      const clampedX2 = Math.max(0, Math.min(scaledX2, screenWidth));
      const clampedY2 = Math.max(0, Math.min(scaledY2, screenHeight));

      // Calculate final dimensions
      const finalWidth = Math.max(0, clampedX2 - clampedX1);
      const finalHeight = Math.max(0, clampedY2 - clampedY1);

      // Only render if the bounding box has valid dimensions
      if (finalWidth < 10 || finalHeight < 10) {
        return null;
      }

      return (
        <Animated.View
          key={overlay.id}
          style={[
            styles.detectionOverlay,
            {
              left: clampedX1,
              top: clampedY1,
              width: finalWidth,
              height: finalHeight,
              opacity: overlay.fadeAnim
            }
          ]}
        >
          {/* Bounding box */}
          <View style={styles.boundingBox} />

          {/* Food name and CO2 footprint */}
          <View style={styles.detectionLabel}>
            <FoodPrintText
              variant="caption"
              color="primary"
              style={styles.detectionText}
            >
              {overlay.detection.food_name} -{" "}
              {overlay.detection.carbon_footprint_info?.concise_fact?.match(
                /[\d.]+/
              )?.[0] || "N/A"}
              kg CO₂/kg
            </FoodPrintText>
          </View>
        </Animated.View>
      );
    });
  };

  // Render debug overlay for coordinate mapping
  const renderDebugOverlay = () => {
    if (!debugMode) return null;

    const screenAspectRatio = screenWidth / screenHeight;

    return (
      <View style={styles.debugOverlay}>
        <FoodPrintText
          variant="caption"
          color="primary"
          style={styles.debugText}
        >
          Screen: {screenWidth}x{screenHeight} (AR:{" "}
          {screenAspectRatio.toFixed(2)})
        </FoodPrintText>
        {imageInfo && imageInfo.width > 0 ? (
          <FoodPrintText
            variant="caption"
            color="primary"
            style={styles.debugText}
          >
            Image: {imageInfo.width}x{imageInfo.height} (AR:{" "}
            {(imageInfo.width / imageInfo.height).toFixed(2)})
          </FoodPrintText>
        ) : (
          <FoodPrintText
            variant="caption"
            color="primary"
            style={styles.debugText}
          >
            Image: Unknown (using fallback)
          </FoodPrintText>
        )}
        <FoodPrintText
          variant="caption"
          color="primary"
          style={styles.debugText}
        >
          Detections: {detections.length}
        </FoodPrintText>
        {detections.length > 0 && (
          <FoodPrintText
            variant="caption"
            color="primary"
            style={styles.debugText}
          >
            First bbox: [{detections[0].detection.bbox.join(", ")}]
          </FoodPrintText>
        )}
        {detections.length > 0 && imageInfo && imageInfo.width > 0 && (
          <FoodPrintText
            variant="caption"
            color="primary"
            style={styles.debugText}
          >
            Scale: {((screenWidth / imageInfo.width) * 100).toFixed(1)}% x{" "}
            {((screenHeight / imageInfo.height) * 100).toFixed(1)}%
          </FoodPrintText>
        )}
      </View>
    );
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

            <TouchableOpacity
              onPress={() => setDebugMode(!debugMode)}
              style={[styles.topButton, { backgroundColor: "rgba(0,0,0,0.5)" }]}
            >
              <FoodPrintText
                variant="body"
                color="primary"
                style={styles.topButtonText}
              >
                {debugMode ? "🐛 Debug ON" : "🐛 Debug"}
              </FoodPrintText>
            </TouchableOpacity>
          </View>

          {/* Debug Overlay */}
          {renderDebugOverlay()}

          {/* Detection Overlays */}
          {renderDetectionOverlays()}

          {/* Scanning Frame - only show in manual mode */}
          {!continuousMode && (
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
          )}

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            {continuousMode ? (
              // Live mode - stop button at bottom
              <View style={styles.liveModeControls}>
                <FoodPrintButton
                  variant="secondary"
                  size="lg"
                  onPress={toggleContinuousMode}
                  style={styles.bottomStopButton}
                >
                  🔴 Stop Live Detection
                </FoodPrintButton>
              </View>
            ) : (
              // Manual mode - both buttons
              <View style={styles.buttonRow}>
                <FoodPrintButton
                  variant="accent"
                  size="lg"
                  onPress={handleScanPress}
                  style={[styles.scanButton, { flex: 1, marginRight: 8 }]}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan Food"}
                </FoodPrintButton>

                <FoodPrintButton
                  variant="secondary"
                  size="lg"
                  onPress={toggleContinuousMode}
                  style={[styles.continuousButton, { flex: 1, marginLeft: 8 }]}
                >
                  🟢 Live
                </FoodPrintButton>
              </View>
            )}

            <FoodPrintText
              variant="caption"
              color="primary"
              style={styles.instructionText}
            >
              {continuousMode
                ? "Point your camera at food items to see real-time detection"
                : "Tap to scan and analyze environmental impact"}
            </FoodPrintText>

            <View style={styles.processingContainer}>
              {isProcessing && (
                <FoodPrintText
                  variant="caption"
                  color="muted"
                  style={styles.processingText}
                >
                  🔄 Processing...
                </FoodPrintText>
              )}
            </View>
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
    position: "absolute",
    top: 150,
    left: 40,
    right: 40,
    bottom: 250, // Increased spacing to match top spacing
    justifyContent: "center",
    alignItems: "center"
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  scanButton: {
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
    borderRadius: 20,
    marginTop: 8
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 12
  },
  liveModeControls: {
    width: "100%",
    alignItems: "center"
  },
  bottomStopButton: {
    width: "100%",
    maxWidth: 300,
    shadowColor: BrandColors.brightOrange,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  continuousButton: {
    shadowColor: BrandColors.brightOrange,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  processingContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8
  },
  processingText: {
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  detectionOverlay: {
    position: "absolute",
    borderWidth: 2,
    borderColor: BrandColors.brightOrange,
    borderRadius: 4
  },
  boundingBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: BrandColors.brightOrange,
    borderRadius: 4
  },
  detectionLabel: {
    position: "absolute",
    top: -25,
    left: 0,
    backgroundColor: BrandColors.brightOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80
  },
  detectionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center"
  },
  debugOverlay: {
    position: "absolute",
    top: 150,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  debugText: {
    color: "#00FF00",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2
  }
});
