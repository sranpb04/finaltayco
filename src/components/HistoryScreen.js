import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Surface, Text, DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen(data) {
  const [history, setHistory] = useState({
    searches: 4,
    labels: [],
    totalItems: 14
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('labelHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card}>
        <Text style={styles.title}>Activity Summary</Text>
        <Text>Total Searches: {history.searches}</Text>
        <Text>Total Labels Generated: {history.labels.length}</Text>
        <Text>Total Items Processed: {history.totalItems}</Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Order #</DataTable.Title>
            <DataTable.Title numeric>Items</DataTable.Title>
            <DataTable.Title numeric>Boxes</DataTable.Title>
          </DataTable.Header>

          {history.labels.map((label, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{new Date(label.date).toLocaleDateString()}</DataTable.Cell>
              <DataTable.Cell>{label.orderNo}</DataTable.Cell>
              <DataTable.Cell numeric>{label.items}</DataTable.Cell>
              <DataTable.Cell numeric>{label.boxes}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
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
});