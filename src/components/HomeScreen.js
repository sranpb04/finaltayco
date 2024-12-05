import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import { Camera, useCodeScanner, useCameraDevices } from 'react-native-vision-camera';
import { useCameraPermission } from 'react-native-vision-camera';
import HistoryScreen from './HistoryScreen';
import SearchResult from './SearchResult';
import { supabase } from '../services/supabaseClient';

export default function HomeScreen() {
  const [orderId, setOrderId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('joined')
      .select('*')
      .eq('order_nr', orderId.trim());
    
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setSearchResults(data);
      <HistoryScreen data={data}/>
    }
  };

  const handleScan = () => {
    setIsScannerVisible(true);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Order ID"
          value={orderId}
          onChangeText={setOrderId}
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={handleSearch}
          style={styles.button}
        >
          Search
        </Button>
        <Button 
          mode="contained" 
          onPress={handleScan}
          style={styles.button}
        >
          Scan
        </Button>
      </Surface>
      <ScrollView>
        {searchResults.map((result, index) => (
          <SearchResult key={index} data={result} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginLeft: 8,
  }
});