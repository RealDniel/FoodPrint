import { BrandColors, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { FoodPrintButton } from "../components/foodprint-button";
import { FoodPrintText } from "../components/foodprint-text";

const { height } = Dimensions.get("window");

interface ScanResult {
  name: string;
  category: string;
  carbonFootprint: number; // kg CO2
  waterUsage: number; // liters
  sustainabilityScore: number; // 0-100
  imageUrl?: string | null;
  detailedInfo?: string; // Additional info from AI
}

interface ScanResultModalProps {
  visible: boolean;
  onClose: () => void;
  scanResult: ScanResult;
}

export function ScanResultModal({
  visible,
  onClose,
  scanResult
}: ScanResultModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getSustainabilityRating = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: colors.success };
    if (score >= 60) return { text: "Good", color: colors.secondary };
    if (score >= 40) return { text: "Fair", color: colors.warning };
    return { text: "Poor", color: colors.error };
  };

  const sustainability = getSustainabilityRating(
    scanResult.sustainabilityScore
  );

  const handleAddToList = () => {
    // TODO: Implement adding to food log
    console.log("Adding to food log:", scanResult);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background }
          ]}
        >
          {/* Modal Handle */}
          <View
            style={[styles.modalHandle, { backgroundColor: colors.border }]}
          />

          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <FoodPrintText variant="title" color="primary">
              📊 Scan Results
            </FoodPrintText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FoodPrintText variant="body" color="muted">
                ✕
              </FoodPrintText>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Food Item Info */}
            <View
              style={[
                styles.section,
                { backgroundColor: colors.backgroundSecondary }
              ]}
            >
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                🍎 {scanResult.name}
              </FoodPrintText>
              <FoodPrintText variant="body" color="muted">
                Category: {scanResult.category}
              </FoodPrintText>
            </View>

            {/* Environmental Impact */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                🌱 Environmental Impact
              </FoodPrintText>

              <View style={styles.metricsContainer}>
                <View
                  style={[
                    styles.metricCard,
                    { backgroundColor: colors.backgroundSecondary }
                  ]}
                >
                  <FoodPrintText variant="title" color="error" size="lg">
                    {scanResult.carbonFootprint}kg
                  </FoodPrintText>
                  <FoodPrintText variant="caption" color="muted">
                    CO₂ Footprint
                  </FoodPrintText>
                </View>

                <View
                  style={[
                    styles.metricCard,
                    { backgroundColor: colors.backgroundSecondary }
                  ]}
                >
                  <FoodPrintText variant="title" color="info" size="lg">
                    {scanResult.waterUsage}L
                  </FoodPrintText>
                  <FoodPrintText variant="caption" color="muted">
                    Water Usage
                  </FoodPrintText>
                </View>
              </View>
            </View>

            {/* Sustainability Score */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                📈 Sustainability Score
              </FoodPrintText>

              <View
                style={[
                  styles.scoreContainer,
                  { backgroundColor: colors.backgroundSecondary }
                ]}
              >
                <View style={styles.scoreCircle}>
                  <FoodPrintText variant="title" color="primary" size="2xl">
                    {scanResult.sustainabilityScore}
                  </FoodPrintText>
                </View>
                <View style={styles.scoreInfo}>
                  <FoodPrintText variant="subtitle" color="primary">
                    {sustainability.text}
                  </FoodPrintText>
                  <FoodPrintText variant="body" color="muted">
                    Environmental Rating
                  </FoodPrintText>
                </View>
              </View>
            </View>

            {/* Eco Tips */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                💡 Eco Tips
              </FoodPrintText>

              <View
                style={[
                  styles.tipCard,
                  { backgroundColor: colors.backgroundTertiary }
                ]}
              >
                <FoodPrintText variant="body" color="primary">
                  • Choose locally grown {scanResult.category.toLowerCase()}{" "}
                  when possible
                </FoodPrintText>
                <FoodPrintText
                  variant="body"
                  color="primary"
                  style={styles.tipText}
                >
                  • Organic options typically have lower environmental impact
                </FoodPrintText>
                <FoodPrintText
                  variant="body"
                  color="primary"
                  style={styles.tipText}
                >
                  • Consider seasonal availability for better sustainability
                </FoodPrintText>
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                📋 Additional Information
              </FoodPrintText>

              <View
                style={[
                  styles.infoCard,
                  { backgroundColor: colors.backgroundSecondary }
                ]}
              >
                <FoodPrintText
                  variant="body"
                  color="primary"
                  style={styles.infoText}
                >
                  {scanResult.detailedInfo ||
                    "No additional information available for this food item."}
                </FoodPrintText>
              </View>
            </View>

            {/* Environmental Impact Details */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                🌍 Environmental Impact Details
              </FoodPrintText>

              <View
                style={[
                  styles.detailsCard,
                  { backgroundColor: colors.backgroundTertiary }
                ]}
              >
                <FoodPrintText
                  variant="body"
                  color="primary"
                  style={styles.detailsText}
                >
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                  qui dolorem ipsum quia dolor sit amet.
                </FoodPrintText>
                <FoodPrintText
                  variant="body"
                  color="primary"
                  style={styles.detailsText}
                >
                  Consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem. Ut enim ad minima veniam, quis nostrum
                  exercitationem ullam corporis suscipit laboriosam.
                </FoodPrintText>
              </View>
            </View>
          </ScrollView>

          {/* Modal Actions */}
          <View style={styles.modalActions}>
            <FoodPrintButton
              variant="accent"
              size="lg"
              onPress={handleAddToList}
              style={styles.actionButton}
            >
              ➕ Add To List
            </FoodPrintButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    height: height * 0.75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  closeButton: {
    padding: 8
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12
  },
  sectionTitle: {
    marginBottom: 12
  },
  metricsContainer: {
    flexDirection: "row",
    gap: 12
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BrandColors.freshMint.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  scoreInfo: {
    flex: 1
  },
  tipCard: {
    padding: 16,
    borderRadius: 12
  },
  tipText: {
    marginTop: 8
  },
  infoCard: {
    padding: 16,
    borderRadius: 12
  },
  infoText: {
    lineHeight: 22,
    marginBottom: 12
  },
  detailsCard: {
    padding: 16,
    borderRadius: 12
  },
  detailsText: {
    lineHeight: 22,
    marginBottom: 12
  },
  modalActions: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  actionButton: {
    width: "100%"
  }
});
