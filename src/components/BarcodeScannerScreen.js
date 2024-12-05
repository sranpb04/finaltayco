import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCodeScanner, useCameraDevices } from 'react-native-vision-camera';
import { useCameraPermission } from 'react-native-vision-camera';

export default function BarcodeScannerScreen() {
  const [scannedData, setScannedData] = useState(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.back;

  const handleCodeScanned = useCallback((codes) => {
    if (codes.length > 0) {
      const scannedCode = codes[0];
      setScannedData(scannedCode.value);
    }
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'code-39'],
    onCodeScanned: handleCodeScanned
  });

  

  React.useEffect(() => {
    const requestCameraPermission = async () => {
        const granted = await requestPermission();
        return granted;
      };
    if (!hasPermission) {
      requestCameraPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission || !device) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
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
  }
});