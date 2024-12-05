import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Switch, Button, TextInput, Slider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    fontSize: 16,
    labelWidth: 400,
    labelHeight: 200,
    darkMode: false,
    barcodeSize: {
      width: 2,
      height: 40
    }
  });

  const saveSettings = async (key, value) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await AsyncStorage.setItem('labelSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('labelSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  return (
    <View style={styles.container}>
      <Surface style={styles.card}>
        <Text style={styles.title}>Label Settings</Text>
        
        <View style={styles.setting}>
          <Text>Font Size</Text>
          <TextInput
            mode="outlined"
            value={settings.fontSize.toString()}
            onChangeText={(value) => saveSettings('fontSize', parseInt(value))}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.setting}>
          <Text>Label Width</Text>
          <TextInput
            mode="outlined"
            value={settings.labelWidth.toString()}
            onChangeText={(value) => saveSettings('labelWidth', parseInt(value))}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.setting}>
          <Text>Barcode Size</Text>
          <View style={styles.barcodeSettings}>
            <TextInput
              mode="outlined"
              label="Width"
              value={settings.barcodeSize.width.toString()}
              onChangeText={(value) => 
                saveSettings('barcodeSize', {...settings.barcodeSize, width: parseInt(value)})
              }
              keyboardType="numeric"
              style={styles.smallInput}
            />
            <TextInput
              mode="outlined"
              label="Height"
              value={settings.barcodeSize.height.toString()}
              onChangeText={(value) => 
                saveSettings('barcodeSize', {...settings.barcodeSize, height: parseInt(value)})
              }
              keyboardType="numeric"
              style={styles.smallInput}
            />
          </View>
        </View>

        <View style={styles.setting}>
          <Text>Dark Mode</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => saveSettings('darkMode', value)}
          />
        </View>

        <Button 
          mode="contained" 
          onPress={() => setSettings({
            fontSize: 16,
            labelWidth: 400,
            labelHeight: 200,
            darkMode: false,
            barcodeSize: {
              width: 2,
              height: 40
            }
          })}
          style={styles.resetButton}
        >
          Reset to Defaults
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    width: 100,
  },
  smallInput: {
    width: 80,
    marginHorizontal: 4,
  },
  barcodeSettings: {
    flexDirection: 'row',
  },
  resetButton: {
    marginTop: 16,
  }
});