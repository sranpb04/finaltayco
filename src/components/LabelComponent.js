// components/LabelGenerator.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import RNBlobUtil from 'react-native-blob-util';

export const generateLabel = async (data) => {
  const barcodeValue = `${data.order_nr}.${data.item_nr}`;
  
  const htmlContent = `
    <div style="width: 400px; height: 200px; padding: 20px; border: 1px solid black;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <div style="font-weight: bold;">ORDER # ${data.order_nr}</div>
          <div style="font-weight: bold;">ITEM # ${data.item_nr}</div>
        </div>
        <div id="barcode"></div>
      </div>
      <div style="margin-top: 20px;">${data.description}</div>
      <div style="font-style: italic; margin-top: 10px;">COLOR</div>
      <div style="margin-top: 10px;">PLANT DATE 1995-05-05</div>
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <div>${data.quantity}/999 QTY</div>
        <div>___/___ BOXES</div>
      </div>
    </div>
  `;

  try {
    const options = {
      html: htmlContent,
      fileName: `Label_${data.order_nr}_${data.item_nr}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};

const styles = StyleSheet.create({
  label: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderInfo: {
    flex: 1,
  },
  barcodeContainer: {
    width: '40%',
  },
  orderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    marginTop: 10,
  },
  color: {
    fontStyle: 'italic',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});