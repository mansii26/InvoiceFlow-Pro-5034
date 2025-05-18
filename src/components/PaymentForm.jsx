import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCreditCard, HiBanknotes } from 'react-icons/hi2';

export default function PaymentForm({ totalAmount, remainingAmount, onSubmit }) {
  const [paymentData, setPaymentData] = useState({
    amount: remainingAmount,
    method: 'card',
    reference: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...paymentData,
      date: new Date().toISOString(),
      id: Date.now()
    });
    setPaymentData({ amount: remainingAmount, method: 'card', reference: '' });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Amount
        </label>
        <input
          type="number"
          step="0.01"
          max={remainingAmount}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          value={paymentData.amount}
          onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
              paymentData.method === 'card'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-500'
            }`}
            onClick={() => setPaymentData({ ...paymentData, method: 'card' })}
          >
            <HiCreditCard className="w-5 h-5 mr-2" />
            Card
          </button>
          <button
            type="button"
            className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
              paymentData.method === 'bank'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-500'
            }`}
            onClick={() => setPaymentData({ ...paymentData, method: 'bank' })}
          >
            <HiBanknotes className="w-5 h-5 mr-2" />
            Bank Transfer
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reference (Optional)
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          value={paymentData.reference}
          onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
          placeholder="Enter payment reference"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Record Payment
      </button>
    </motion.form>
  );
}