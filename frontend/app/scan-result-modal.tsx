import { BrandColors, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { BrandColors, Colors } from '@/constants/theme';
import { useScanHistory } from '@/contexts/ScanHistoryContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FoodPrintButton } from '../components/foodprint-button';
import { FoodPrintText } from '../components/foodprint-text';

const { height } = Dimensions.get("window");

interface ScanResult {
  name: string;
  category: string;
  carbonFootprint: number; // kg CO2
  waterUsage: number; // liters
  sustainabilityScore: number; // 0-100
  imageUrl?: string | null;
  detailedInfo?: string; // Additional info from AI
  educationalSnippets?: string[]; // Educational snippets
  alternatives?: string[]; // Alternative foods
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
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const { addScan } = useScanHistory();

  const getSustainabilityRating = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: colors.success };
    if (score >= 60) return { text: "Good", color: colors.secondary };
    if (score >= 40) return { text: "Fair", color: colors.warning };
    return { text: "Poor", color: colors.error };
  };

  const sustainability = getSustainabilityRating(
    scanResult.sustainabilityScore
  );

  const handleAddToList = async () => {
    try {
      const { error } = await addScan({
        food_name: scanResult.name,
        food_category: scanResult.category,
        carbon_footprint: scanResult.carbonFootprint,
        water_usage: scanResult.waterUsage,
        sustainability_score: scanResult.sustainabilityScore,
        scan_date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        image_url: scanResult.imageUrl,
        notes: null,
      });

      if (error) {
        Alert.alert('Error', 'Failed to save scan result. Please try again.');
      } else {
        Alert.alert('Success', 'Food item added to your scan history!');
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleMetricInfo = (title: string, description: string) => {
    setSelectedMetric({ title, description });
    setInfoModalVisible(true);
  };

  const closeInfoModal = () => {
    setInfoModalVisible(false);
    setSelectedMetric(null);
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
                <TouchableOpacity
                  style={[
                    styles.metricCard,
                    styles.clickableCard,
                    {
                      backgroundColor: colors.backgroundSecondary,
                      borderColor: colors.border
                    }
                  ]}
                  onPress={() =>
                    handleMetricInfo(
                      "CO₂ Footprint",
                      "Carbon footprint measures the total greenhouse gas emissions caused directly or indirectly by this food item, expressed as carbon dioxide equivalent (CO₂e). This includes emissions from production, processing, transportation, and packaging."
                    )
                  }
                >
                  <View style={styles.metricContent}>
                    <FoodPrintText variant="title" color="secondary" size="lg">
                      {scanResult.carbonFootprint} kg
                    </FoodPrintText>
                    <FoodPrintText variant="caption" color="muted">
                      CO₂ Footprint
                    </FoodPrintText>
                  </View>
                  <View style={styles.infoIcon}>
                    <MaterialIcons
                      name="info-outline"
                      size={16}
                      color={colors.secondary}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.metricCard,
                    styles.clickableCard,
                    {
                      backgroundColor: colors.backgroundSecondary,
                      borderColor: colors.border
                    }
                  ]}
                  onPress={() =>
                    handleMetricInfo(
                      "Water Usage",
                      "Water usage represents the total amount of water required to produce this food item, including irrigation, processing, and packaging. This metric helps assess the environmental impact related to water consumption and scarcity."
                    )
                  }
                >
                  <View style={styles.metricContent}>
                    <FoodPrintText variant="title" color="secondary" size="lg">
                      {scanResult.waterUsage} L/kg
                    </FoodPrintText>
                    <FoodPrintText variant="caption" color="muted">
                      Water Usage
                    </FoodPrintText>
                  </View>
                  <View style={styles.infoIcon}>
                    <MaterialIcons
                      name="info-outline"
                      size={16}
                      color={colors.secondary}
                    />
                  </View>
                </TouchableOpacity>
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

              <TouchableOpacity
                style={[
                  styles.scoreContainer,
                  styles.clickableCard,
                  {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border
                  }
                ]}
                onPress={() =>
                  handleMetricInfo(
                    "Environmental Rating",
                    "A 0-100 score where higher numbers mean lower environmental impact. Based on carbon footprint: nuts and vegetables score near 100, beef scores near 0. The rating considers production, transportation, and processing emissions to give you a quick sustainability assessment."
                  )
                }
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
                <View style={styles.infoIcon}>
                  <MaterialIcons
                    name="info-outline"
                    size={16}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
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
                  styles.infoCard,
                  { backgroundColor: colors.backgroundSecondary }
                ]}
              >
                {scanResult.educationalSnippets?.map(
                  (snippet: string, index: number) => (
                    <FoodPrintText
                      variant="body"
                      color="primary"
                      key={snippet}
                      style={[
                        styles.bulletText,
                        index ===
                          (scanResult.educationalSnippets?.length || 0) - 1 &&
                          styles.lastBulletText
                      ]}
                    >
                      {"• " + snippet}
                    </FoodPrintText>
                  )
                )}
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
                <FoodPrintText variant="body" color="primary">
                  {scanResult.detailedInfo ||
                    "No additional information available for this food item."}
                </FoodPrintText>
              </View>
            </View>

            {/* Alternative Foods */}
            <View style={styles.section}>
              <FoodPrintText
                variant="subtitle"
                color="primary"
                style={styles.sectionTitle}
              >
                🍎 Alternative Foods
              </FoodPrintText>
              <View
                style={[
                  styles.infoCard,
                  { backgroundColor: colors.backgroundSecondary }
                ]}
              >
                {scanResult.alternatives?.map(
                  (alternative: string, index: number) => (
                    <FoodPrintText
                      variant="body"
                      color="primary"
                      key={alternative}
                      style={[
                        styles.bulletText,
                        index === (scanResult.alternatives?.length || 0) - 1 &&
                          styles.lastBulletText
                      ]}
                    >
                      {"• " + alternative}
                    </FoodPrintText>
                  )
                )}
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

      {/* Info Modal */}
      <Modal
        visible={infoModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeInfoModal}
      >
        <View style={styles.infoModalOverlay}>
          <TouchableOpacity
            style={styles.infoModalBackground}
            activeOpacity={1}
            onPress={closeInfoModal}
          />
          <View
            style={[
              styles.infoModalContainer,
              { backgroundColor: colors.backgroundSecondary }
            ]}
          >
            <View style={styles.infoModalHeader}>
              <FoodPrintText variant="subtitle" color="secondary">
                {selectedMetric?.title}
              </FoodPrintText>
              <TouchableOpacity
                onPress={closeInfoModal}
                style={styles.infoCloseButton}
              >
                <FoodPrintText variant="body" color="muted">
                  ✕
                </FoodPrintText>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.infoModalContent}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              <FoodPrintText
                variant="body"
                color="muted"
                style={styles.infoModalText}
              >
                {selectedMetric?.description || "No description available"}
              </FoodPrintText>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  },
  bulletText: {
    lineHeight: 22,
    marginBottom: 8
  },
  lastBulletText: {
    marginBottom: 0
  },
  clickableCard: {
    borderWidth: 1,
    position: "relative"
  },
  metricContent: {
    flex: 1,
    alignItems: "center"
  },
  infoIcon: {
    position: "absolute",
    top: 8,
    right: 8
  },
  infoModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  infoModalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  infoModalContainer: {
    width: "90%",
    maxHeight: "80%",
    minHeight: 300,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16
  },
  infoModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4
  },
  infoCloseButton: {
    padding: 8
  },
  infoModalContent: {
    flex: 1,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.02)"
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20
  },
  infoModalText: {
    lineHeight: 24,
    textAlign: "left",
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "400"
  }
});
