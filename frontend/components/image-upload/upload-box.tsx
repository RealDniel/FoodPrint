import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

interface Props {
  // onUpload called only on successful selection; on cancel -> do nothing
  onUpload: (uri: string, base64?: string) => void;
}

export default function UploadBox({ onUpload }: Props) {
  const [localUri, setLocalUri] = useState<string | null>(null);

  const pickFromLibrary = async () => {
    try {
      // Dynamically require to avoid compile errors when package not installed
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ImagePicker = require('expo-image-picker');

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to access your photos to upload an image.');
        return;
      }

      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true, // request base64
      });

      const cancelled = result.cancelled ?? result.canceled ?? false;
      if (cancelled) {
        // do nothing on cancel (no callback)
        return;
      }

      let uri: string | undefined = undefined;
      let base64: string | undefined = undefined;

      if (result.uri) {
        uri = result.uri;
        base64 = result.base64 ?? undefined;
      } else if (result.assets && Array.isArray(result.assets) && result.assets[0]) {
        uri = result.assets[0].uri;
        base64 = result.assets[0].base64 ?? undefined;
      }

      // Fallback: if base64 not returned, read file with expo-file-system
      if (uri && !base64) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const FileSystem = require('expo-file-system');
          // read as base64
          const fileBase64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          if (fileBase64) base64 = fileBase64;
        } catch (fsErr) {
          console.warn('Failed to read file as base64 fallback:', fsErr);
        }
      }

      if (uri) {
        setLocalUri(uri);
        // Only call parent on success
        onUpload(uri, base64);
      }
    } catch (err) {
      console.warn('Image pick error', err);
      Alert.alert('Error', 'Could not open image picker. Is expo-image-picker installed?');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {localUri ? (
          <Image source={{ uri: localUri }} style={styles.preview} />
        ) : (
          <FoodPrintText variant="subtitle" color="primary" style={styles.hint}>
            Upload an image of your food item to analyze its environmental impact.
          </FoodPrintText>
        )}

        <FoodPrintButton variant="accent" size="lg" onPress={pickFromLibrary} style={styles.button}>
          Upload Image
        </FoodPrintButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '92%',
    height: '85%',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  hint: {
    textAlign: 'center',
  },
  preview: {
    width: '100%',
    height: '75%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  button: {
    width: '100%',
  },
});
