import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  const fetchWalletDetails = async () => {
    const { data } = await axios.get('http://localhost:4000/api/wallet/1');
    setBalance(data.balance);
    const transactionsData = await axios.get(`http://localhost:4000/api/transaction/${data.id}`);
    setTransactions(transactionsData.data);
  };

  const addTransaction = async () => {
    await axios.post('http://localhost:4000/api/transaction', {
      walletId: 1,
      type: 'send',
      amount,
      category,
    });
    fetchWalletDetails();
  };

  return (
    <View>
      <Text>Wallet Balance: {balance}</Text>
      <TextInput placeholder="Amount" onChangeText={setAmount} value={amount} />
      <TextInput placeholder="Category" onChangeText={setCategory} value={category} />
      <Button title="Add Transaction" onPress={addTransaction} />
      <FlatList
        data={transactions}
        renderItem={({ item }) => <Text>{item.type}: {item.amount} - {item.category}</Text>}
      />
    </View>
  );
};

export default App;
