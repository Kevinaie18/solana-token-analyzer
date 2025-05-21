import { useState } from 'react';

const ParameterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    token_address: '',
    sol_price: '',
    total_supply: '',
    market_cap_threshold: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="token_address" className="block text-sm font-medium text-gray-700">
          Token Address
        </label>
        <input
          type="text"
          id="token_address"
          name="token_address"
          value={formData.token_address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter Solana token address"
        />
      </div>

      <div>
        <label htmlFor="sol_price" className="block text-sm font-medium text-gray-700">
          SOL Price (USD)
        </label>
        <input
          type="number"
          id="sol_price"
          name="sol_price"
          value={formData.sol_price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter current SOL price in USD"
        />
      </div>

      <div>
        <label htmlFor="total_supply" className="block text-sm font-medium text-gray-700">
          Total Supply
        </label>
        <input
          type="number"
          id="total_supply"
          name="total_supply"
          value={formData.total_supply}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter total token supply"
        />
      </div>

      <div>
        <label htmlFor="market_cap_threshold" className="block text-sm font-medium text-gray-700">
          Market Cap Threshold (USD)
        </label>
        <input
          type="number"
          id="market_cap_threshold"
          name="market_cap_threshold"
          value={formData.market_cap_threshold}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter market cap threshold in USD"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Analyze
      </button>
    </form>
  );
};

export default ParameterForm; 