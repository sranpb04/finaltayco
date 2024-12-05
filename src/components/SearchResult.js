// components/SearchResult.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNBlobUtil from 'react-native-blob-util';

import Barcode from 'react-native-barcode-builder';
const SearchResult = ({ data }) => {
  const generateLabel = async () => {
    try {
      
//const barcodeValue = {`${data.order_nr}.${data.item_number}`};
      const htmlContent = `
        <html>
          <head>
            <style>
              .label {
                width: 400px;
                height: 200px;
                padding: 20px;
                border: 1px solid black;
                font-family: Arial;
              }
              .header {
                display: flex;
                justify-content: space-between;
              }
              .order-info {
                font-weight: bold;
              }
              .description {
                margin-top: 20px;
                font-size: 14px;
              }
              .color {
                margin-top: 10px;
                font-style: italic;
              }
              .footer {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="label">
              <div class="header">
                <div class="order-info">
                  <div>ORDER # ${data.order_nr}</div>
                  <div>ITEM # ${data.item_number}</div>
                </div>
                <div class="barcode">
                  ||||||||||||||||
                </div>
                </div>
              <div class="description">${data.item_description}</div>
              <div class="color">COLOR</div>
              <div>PLANT DATE ${data.plant_date}</div>
              <div class="footer">
                <div>${data.quantity}/999 QTY</div>
                <div>___/___ BOXES</div>
              </div>
            </div>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `Label_${data.order_nr}_${data.item_nr}`,
        directory: 'Downloads'
      };

      const file = await RNHTMLtoPDF.convert(options);
      await RNBlobUtil.android.actionViewIntent(file.filePath, 'application/pdf');
    } catch (error) {
      console.error('Error generating label:', error);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.labelContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.orderText}>ORDER # {data.order_nr}</Text>
            <Text style={styles.itemText}>ITEM # {data.item_number}</Text>
          </View>
          <Text style={styles.barcode}>{`${data.order_nr}.${data.item_number}`}</Text>
        </View>
        <Text style={styles.description}>{data.item_description}</Text>
        <Text style={styles.color}>COLOR</Text>
        <Text style={styles.plant_date}>PLANT DATE 1995-05-05</Text>
        <View style={styles.footer}>
          <Text>{data.quantity}/999 QTY</Text>
          <Text>___/___ BOXES</Text>
        </View>
        <Button mode="contained" onPress={generateLabel} style={styles.button}>
          Generate Label
        </Button>
      </Card.Content>
    </Card>
      );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  barcode: {
    alignSelf: 'flex-start',
  },
  description: {
    marginTop: 12,
    fontSize: 12,
  },
  colorText: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
  plantDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    marginTop: 16,
  }
});

export default SearchResult;