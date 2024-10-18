import React from 'react';

function BotStatus({ status, onToggle, walletConnected, config, lastTransaction }) {
  const formatInterval = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const nextRunTime = () => {
    if (status !== 'Running' || !lastTransaction) return 'N/A';
    const nextRun = new Date(lastTransaction.timestamp);
    nextRun.setSeconds(nextRun.getSeconds() + parseInt(config.interval));
    return nextRun.toLocaleString();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${status === 'Running' ? 'from-green-900/30 to-blue-900/30' : 'from-red-900/30 to-orange-900/30'} transition-all duration-500 ease-in-out`}></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-400">Bot Status</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 flex items-center justify-between">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${status === 'Running' ? 'bg-green-500 text-gray-900' : 'bg-red-500 text-white'} transition-all duration-300 transform hover:scale-105`}>
              {status}
            </span>
            <button 
              onClick={onToggle}
              disabled={!walletConnected}
              className={`btn ${status === 'Running' ? 'btn-secondary' : 'btn-primary'} ${!walletConnected && 'opacity-50 cursor-not-allowed'} transition-all duration-300 transform hover:scale-105`}
            >
              {status === 'Running' ? 'Stop' : 'Start'} Bot
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Buy Token</p>
            <p className="text-lg font-semibold text-white">{config.buyToken}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Sell Token</p>
            <p className="text-lg font-semibold text-white">{config.sellToken || 'Not set'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Buy Amount</p>
            <p className="text-lg font-semibold text-white">{config.buyAmount} {config.buyToken}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Interval</p>
            <p className="text-lg font-semibold text-white">{formatInterval(config.interval)}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Next Run</p>
          <p className="text-lg font-semibold text-white">{nextRunTime()}</p>
        </div>
        {!walletConnected && (
          <p className="mt-4 text-yellow-400 text-sm animate-pulse">Please connect your wallet to start the bot.</p>
        )}
      </div>
      {status === 'Running' && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
      )}
    </div>
  );
}

export default BotStatus;