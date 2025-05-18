import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function PaymentHistory({ payments }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment History</h3>
      <div className="space-y-3">
        {payments?.length > 0 ? (
          payments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(payment.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <span className={`text-sm ${payment.method === 'card' ? 'text-green-600' : 'text-blue-600'}`}>
                  {payment.method === 'card' ? 'Card Payment' : 'Bank Transfer'}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No payment history available</p>
        )}
      </div>
    </div>
  );
}