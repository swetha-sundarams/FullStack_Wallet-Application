import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wallets = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      const { data } = await axios.get('http://localhost:4000/api/wallets');
      setWallets(data);
    };

    fetchWallets();
  }, []);

  const freezeWallet = async (walletId, frozen) => {
    await axios.post(`http://localhost:4000/api/wallets/${walletId}/freeze`, { frozen });
    setWallets((prevWallets) =>
      prevWallets.map((wallet) => (wallet.id === walletId ? { ...wallet, frozen: !frozen } : wallet))
    );
  };

  return (
    <div>
      <h1>Wallet Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Frozen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.id}</td>
              <td>{wallet.balance}</td>
              <td>{wallet.frozen ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => freezeWallet(wallet.id, wallet.frozen)}>
                  {wallet.frozen ? 'Unfreeze' : 'Freeze'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallets;
