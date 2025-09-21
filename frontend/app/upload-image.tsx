import { ScanResultModal } from '@/app/scan-result-modal';
import UploadBox from '@/components/image-upload/upload-box';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function UploadImageScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const [showModal, setShowModal] = useState(false);
	const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);
	const [scanResult, setScanResult] = useState<any | null>(null);
	const [isSending, setIsSending] = useState(false);

	// This will be called by UploadBox on successful pick.
	// base64 may be undefined if the picker didn't return it; in that case you can read file as base64 (expo-file-system) or send multipart form-data.
	const handleUpload = async (uri: string, base64?: string) => {
		if (!uri) return;

		setPickedImageUri(uri);
		setIsSending(true);

		// If no base64 provided, consider using expo-file-system to read file as base64:
		// const FileSystem = require('expo-file-system');
		// base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

		try {
			const payloadBase64 = base64 ? base64 : null;
			// Endpoints used in scanning.tsx — reuse same approach
			const endpoints = [
		        "http://172.20.10.2:8000/detect-base64", // Previous IP address
				'http://172.20.10.5:8000/detect-base64',
				'http://10.0.0.5:8000/detect-base64',
				'http://192.168.1.5:8000/detect-base64',
				'http://127.0.0.1:8000/detect-base64',
				'http://localhost:8000/detect-base64',
			];

			let response = null;
			let lastError: any = null;

			for (const endpoint of endpoints) {
				try {
					const controller = new AbortController();
					const timeoutId = setTimeout(() => controller.abort(), 10000);

					response = await fetch(endpoint, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							// backend expects base64 image string e.g. "data:image/jpeg;base64,<data>"
							image: payloadBase64 ? `data:image/jpeg;base64,${payloadBase64}` : null,
							// if you want to send URI instead and backend supports multipart, change accordingly
							uri,
						}),
						signal: controller.signal,
					});

					clearTimeout(timeoutId);

					if (response.ok) break;
					// if not ok, try next
					response = null;
				} catch (err) {
					lastError = err;
					response = null;
				}
			}

			if (!response) {
				const msg = lastError instanceof Error ? lastError.message : 'Unknown error';
				throw new Error(`Failed to connect to backend. Last error: ${msg}`);
			}

			const result = await response.json();

			// Map backend response to frontend scanResult shape (similar to scanning.tsx mapping)
			if (result.success && result.detections && result.detections.length > 0) {
				const detection = result.detections[0];
				const carbonInfo = detection.carbon_footprint_info ?? {};

				const mapped = {
					name: detection.food_name ?? 'Uploaded Item',
					category: 'Food',
					carbonFootprint: parseFloat(carbonInfo?.concise_fact?.match(/[\d.]+/)?.[0] || '0'),
					waterUsage: parseFloat(carbonInfo?.water_usage?.match(/[\d.]+/)?.[0] || '0'),
					sustainabilityScore: (() => {
						const raw = parseFloat(carbonInfo?.concise_fact?.match(/[\d.]+/)?.[0] || '0');
						// example scoring logic; adapt to your backend
						const score = Math.max(0, Math.min(100, 100 - ((raw - 0.3) / (60 - 0.3)) * 100));
						return parseFloat(score.toFixed(2));
					})(),
					imageUrl: uri,
					detailedInfo: carbonInfo?.detailed_info || 'No additional information available.',
					educationalSnippets: Array.isArray(carbonInfo?.educational_snippets)
						? carbonInfo.educational_snippets
						: ['No educational snippets available.'],
					alternatives: Array.isArray(carbonInfo?.alternatives) ? carbonInfo.alternatives : ['No alternatives available.'],
				};

				setScanResult(mapped);
			} else {
				setScanResult({
					name: 'Unknown Food Item',
					category: 'Food',
					carbonFootprint: 0,
					waterUsage: 0,
					sustainabilityScore: 0,
					imageUrl: uri,
					detailedInfo: 'Could not identify the food item. Please try again with a clearer image.',
					educationalSnippets: ['Could not identify the food item. Please try again.'],
					alternatives: ['Please try another photo.'],
				});
			}

			setShowModal(true);
		} catch (err) {
			console.error('Upload error', err);
			Alert.alert('Upload failed', 'Could not send image to server. Please try again.');
		} finally {
			setIsSending(false);
		}
	};

	const handleModalClose = () => setShowModal(false);

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<UploadBox onUpload={handleUpload} />

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
		flex: 1,
	},
});
