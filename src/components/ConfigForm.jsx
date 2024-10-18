import React, { useState } from 'react';

function ConfigForm({ config, onConfigChange, botStatus }) {
  const [intervalConfig, setIntervalConfig] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 60
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    onConfigChange({ ...config, [name]: value });
  };

  const handleIntervalChange = (e) => {
    const { name, value } = e.target;
    const newIntervalConfig = { ...intervalConfig, [name]: parseInt(value) || 0 };
    setIntervalConfig(newIntervalConfig);
    const totalSeconds = (newIntervalConfig.days * 86400) + (newIntervalConfig.hours * 3600) + 
                         (newIntervalConfig.minutes * 60) + newIntervalConfig.seconds;
    onConfigChange({ ...config, interval: totalSeconds.toString() });
  };

  const tokenOptions = ['ETH', 'USDC', 'WBTC', 'DAI', 'LINK'];

  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg relative overflow-hidden ${botStatus === 'Running' ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${botStatus === 'Running' ? 'from-green-900/30 to-blue-900/30' : 'from-red-900/30 to-orange-900/30'} transition-all duration-500 ease-in-out`}></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-400">Bot Configuration</h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">DEX Liquidity Pool Address</label>
            <div className="relative">
              <input 
                type="text" 
                name="routerAddress" 
                value={config.routerAddress} 
                onChange={handleChange} 
                className="input pl-10 pr-4 py-2 transition-all duration-300 focus:ring-2 focus:ring-green-500 hover:bg-gray-700"
                placeholder="0x1234... (DEX Liquidity Pool Address)"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Buy Token</label>
              <div className="relative">
                <select 
                  name="buyToken" 
                  value={config.buyToken} 
                  onChange={handleChange} 
                  className="input pl-10 pr-4 py-2 transition-all duration-300 focus:ring-2 focus:ring-green-500 hover:bg-gray-700 appearance-none"
                >
                  {tokenOptions.map(token => (
                    <option key={token} value={token}>{token}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Sell Token</label>
              <div className="relative">
                <select 
                  name="sellToken" 
                  value={config.sellToken} 
                  onChange={handleChange} 
                  className="input pl-10 pr-4 py-2 transition-all duration-300 focus:ring-2 focus:ring-green-500 hover:bg-gray-700 appearance-none"
                >
                  <option value="">Select Token</option>
                  {tokenOptions.filter(token => token !== config.buyToken).map(token => (
                    <option key={token} value={token}>{token}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Buy Amount</label>
            <div className="relative">
              <input 
                type="number" 
                name="buyAmount" 
                value={config.buyAmount} 
                onChange={handleChange} 
                className="input pl-10 pr-4 py-2 transition-all duration-300 focus:ring-2 focus:ring-green-500 hover:bg-gray-700"
                step="0.01" 
                min="0"
                placeholder="0.1"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Interval</label>
            <div className="grid grid-cols-4 gap-2">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="flex flex-col">
                  <div className="relative">
                    <input 
                      type="number" 
                      name={unit}
                      value={intervalConfig[unit]} 
                      onChange={handleIntervalChange}
                      className="input pl-8 pr-2 py-2 transition-all duration-300 focus:ring-2 focus:ring-green-500 hover:bg-gray-700 text-center"
                      min="0"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 text-center mt-1">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigForm;