import { ScanResultModal } from '@/app/scan-result-modal';
import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { BrandColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScanningScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          <FoodPrintText variant="title" color="primary" style={styles.permissionTitle}>
            📸 Camera Permission Required
          </FoodPrintText>
          
          <FoodPrintText variant="body" color="muted" style={styles.permissionText}>
            FoodPrint needs access to your camera to scan food items and analyze their environmental impact.
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
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleScanPress = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowModal(true);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      >
        {/* Camera Overlay */}
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={[styles.topButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            >
              <FoodPrintText variant="body" color="primary" style={styles.topButtonText}>
                ← Back
              </FoodPrintText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={toggleCameraFacing}
              style={[styles.topButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            >
              <FoodPrintText variant="body" color="primary" style={styles.topButtonText}>
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
            
            <FoodPrintText variant="body" color="primary" style={styles.scanningText}>
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
              {isScanning ? 'Scanning...' : '📸 Scan Food'}
            </FoodPrintButton>
            
            <FoodPrintText variant="caption" color="primary" style={styles.instructionText}>
              Tap to scan and analyze environmental impact
            </FoodPrintText>
          </View>
        </View>
      </CameraView>

      {/* Scan Result Modal */}
      <ScanResultModal 
        visible={showModal}
        onClose={handleModalClose}
        scanResult={{
          name: 'Organic Apple',
          category: 'Fruit',
          carbonFootprint: 0.2,
          waterUsage: 15,
          sustainabilityScore: 85,
          imageUrl: null
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  permissionButton: {
    marginBottom: 24,
  },
  backButton: {
    padding: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  topButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scanningFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 14
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: BrandColors.brightOrange,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanningText: {
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  bottomControls: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scanButton: {
    width: '100%',
    marginBottom: 12,
    shadowColor: BrandColors.brightOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  instructionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
