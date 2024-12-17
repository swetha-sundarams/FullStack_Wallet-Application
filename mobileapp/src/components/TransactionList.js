import React from 'react';
import { View, Text, FlatList } from 'react-native';

const TransactionList = ({ transactions }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Transaction History:</Text>
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginVertical: 5 }}>
          <Text>
            {item.type}: {item.amount} ({item.category})
          </Text>
        </View>
      )}
    />
  </View>
);

export default TransactionList;
