import React, { useState, useEffect } from 'react';
import ConfigForm from './components/ConfigForm';
import BotStatus from './components/BotStatus';
import TransactionHistory from './components/TransactionHistory';
import WalletConnection from './components/WalletConnection';

function App() {
  const [config, setConfig] = useState({
    routerAddress: '0x1234567890123456789012345678901234567890', // DEX Liquidity Pool Address
    buyToken: 'ETH',
    sellToken: '',
    buyAmount: '0.1',
    interval: '3600'
  });

  const [botStatus, setBotStatus] = useState('Stopped');
  const [transactions, setTransactions] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    console.log('New config:', newConfig);
  };

  const toggleBot = () => {
    setBotStatus(botStatus === 'Running' ? 'Stopped' : 'Running');
  };

  // Simulating bot activity
  useEffect(() => {
    if (botStatus === 'Running') {
      const interval = setInterval(() => {
        const newTransaction = { 
          hash: Math.random().toString(36).substring(7), 
          buyToken: config.buyToken,
          sellToken: config.sellToken,
          amount: config.buyAmount, 
          timestamp: new Date().toISOString() 
        };
        setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      }, parseInt(config.interval) * 1000);
      return () => clearInterval(interval);
    }
  }, [botStatus, config]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Base Chain DCA Bot</h1>
          <WalletConnection connected={walletConnected} setConnected={setWalletConnected} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ConfigForm config={config} onConfigChange={handleConfigChange} botStatus={botStatus} />
          <div className="space-y-8">
            <BotStatus 
              status={botStatus} 
              onToggle={toggleBot} 
              walletConnected={walletConnected}
              config={config}
              lastTransaction={transactions[0]}
            />
            <TransactionHistory transactions={transactions} botStatus={botStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;