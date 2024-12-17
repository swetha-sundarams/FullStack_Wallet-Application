import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const TransactionForm = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    onAddTransaction(amount, category);
    setAmount('');
    setCategory('');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Transaction" onPress={handleSubmit} />
    </View>
  );
};

export default TransactionForm;
