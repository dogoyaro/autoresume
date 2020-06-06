import React from 'react';
import { Card } from 'antd';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FullNameContentProps as NameProps } from '../FullnameContent';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flex: 1,
  }
});

// Create Document Component
const MyDocument = () => (
  <Card hoverable>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </Card>
);

const NameView: React.FC<NameProps> = ({ firstName, lastName }) => (
  <View>{`${firstName} ${lastName}`}</View>
);

export default MyDocument;
