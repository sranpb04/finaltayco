// utils/pdfGenerator.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Barcode from 'react-native-barcode-builder';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 200]); // Standard label size
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Load label settings
  const savedSettings = await AsyncStorage.getItem('labelSettings');
  const settings = savedSettings ? JSON.parse(savedSettings) : {
    fontSize: 16,
    labelWidth: 400,
    labelHeight: 200,
    barcodeSize: { width: 2, height: 40 }
  };

  // Draw Order Number
  page.drawText(`ORDER # ${data.order_nr}`, {
    x: 20,
    y: 160,
    size: settings.fontSize,
    font: helveticaBold
  });

  // Draw Item Number
  page.drawText(`ITEM # ${data.item_nr}`, {
    x: 20,
    y: 140,
    size: settings.fontSize - 2,
    font: helveticaBold
  });

  // Draw Description
  page.drawText('DESCRIPTION ' + data.description, {
    x: 20,
    y: 100,
    size: settings.fontSize - 4,
    font: helvetica,
    maxWidth: 250
  });

  // Draw Color text
  page.drawText('COLOR', {
    x: 20,
    y: 70,
    size: settings.fontSize - 4,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5)
  });

  // Draw Plant Date
  page.drawText('PLANT DATE 1995-05-05', {
    x: 20,
    y: 50,
    size: settings.fontSize - 4,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5)
  });

  // Draw Quantity and Boxes
  page.drawText(`${data.quantity}/999 QTY`, {
    x: 20,
    y: 20,
    size: settings.fontSize - 2,
    font: helvetica
  });

  page.drawText('___/___ BOXES', {
    x: 250,
    y: 20,
    size: settings.fontSize - 2,
    font: helvetica
  });

  // Generate and draw barcode
  const barcodeValue = `${data.order_nr}.${data.item_nr}`;
  const barcodeImage = await Barcode.buildBarcode({
    value: barcodeValue,
    format: 'CODE128',
    width: settings.barcodeSize.width,
    height: settings.barcodeSize.height
  });

  // Place barcode in top right corner
  const barcodeBytes = await fetch(barcodeImage).then(res => res.arrayBuffer());
  const barcode = await pdfDoc.embedPng(barcodeBytes);
  page.drawImage(barcode, {
    x: 280,
    y: 140,
    width: 100,
    height: 40
  });

  return await pdfDoc.save();
}