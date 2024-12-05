// utils/historyTracker.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateHistory = async (type, data) => {
  try {
    const history = await AsyncStorage.getItem('labelHistory') || '{}';
    const parsedHistory = JSON.parse(history);
    
    switch(type) {
      case 'search':
        parsedHistory.searches = (parsedHistory.searches || 0) + 1;
        break;
      case 'generate':
        parsedHistory.generatedLabels = (parsedHistory.generatedLabels || 0) + 1;
        parsedHistory.sentPDFs = [{
          date: new Date().toISOString(),
          ...data
        }, ...(parsedHistory.sentPDFs || [])].slice(0, 100); // Keep last 100 entries
        break;
    }
    
    await AsyncStorage.setItem('labelHistory', JSON.stringify(parsedHistory));
  } catch (error) {
    console.error('Error updating history:', error);
  }
};