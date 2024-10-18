import React from 'react';

function TransactionHistory({ transactions, botStatus }) {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg relative overflow-hidden ${botStatus === 'Running' ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${botStatus === 'Running' ? 'from-green-900/30 to-blue-900/30' : 'from-red-900/30 to-orange-900/30'} transition-all duration-500 ease-in-out`}></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-400">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Buy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sell</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{tx.hash}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.buyToken}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.sellToken}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.amount} {tx.buyToken}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No transactions yet. Start the bot to see activity.</p>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;