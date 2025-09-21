import { ScanResultModal } from '@/app/scan-result-modal';
import UploadBox from '@/components/image-upload/upload-box';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function UploadImageScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const [showModal, setShowModal] = useState(false);
	const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);

	const handleUpload = (uri: string) => {
		// Save image then show modal (simulate analysis)
		setPickedImageUri(uri);
		setShowModal(true);
	};

	const handleModalClose = () => setShowModal(false);

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>      
			<UploadBox onUpload={handleUpload} />

			<ScanResultModal
				visible={showModal}
				onClose={handleModalClose}
				scanResult={{
					name: 'Uploaded Item',
					category: 'Unknown',
					carbonFootprint: 0,
					waterUsage: 0,
					sustainabilityScore: 50,
					imageUrl: pickedImageUri,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
