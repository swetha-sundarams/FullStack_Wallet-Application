import React from 'react';
import { View, Text } from 'react-native';

const BalanceDisplay = ({ balance }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Wallet Balance: {balance}</Text>
  </View>
);

export default BalanceDisplay;
