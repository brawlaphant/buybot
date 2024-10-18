import React from 'react';

function WalletConnection({ connected, setConnected }) {
  const handleConnect = () => {
    // Here you would typically implement the actual wallet connection logic
    setConnected(!connected);
  };

  return (
    <button
      onClick={handleConnect}
      className={`px-4 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
        connected
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      }`}
    >
      {connected ? 'Wallet Connected' : 'Connect Wallet'}
    </button>
  );
}

export default WalletConnection;