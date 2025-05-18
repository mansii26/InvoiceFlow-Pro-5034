import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInvoice } from '../context/InvoiceContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { HiPrinter, HiMail, HiShare, HiDownload } from 'react-icons/hi';
import ExportModal from '../components/ExportModal';
import PaymentStatusBadge from '../components/PaymentStatusBadge';
import PaymentHistory from '../components/PaymentHistory';
import PaymentForm from '../components/PaymentForm';
import ReminderButton from '../components/ReminderButton';

export default function InvoiceDetails() {
  const { id } = useParams();
  const { state, dispatch } = useInvoice();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const invoice = state.invoices.find(inv => inv.id === parseInt(id));

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const handlePayment = (paymentData) => {
    dispatch({
      type: 'ADD_PAYMENT',
      payload: {
        invoiceId: invoice.id,
        payment: paymentData
      }
    });
    setShowPaymentForm(false);
  };

  const handleAddReminder = ({ invoiceId, reminder }) => {
    dispatch({
      type: 'ADD_REMINDER',
      payload: { invoiceId, reminder }
    });
  };

  const remainingAmount = invoice.amount - (invoice.paidAmount || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Invoice #{invoice.id}</h2>
            <p className="text-gray-600">
              Created: {format(new Date(invoice.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Print"
            >
              <HiPrinter className="w-6 h-6" />
            </button>
            <button
              onClick={() => window.location.href = `mailto:${invoice.clientEmail}`}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Send Email"
            >
              <HiMail className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Export"
            >
              <HiDownload className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Share"
            >
              <HiShare className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Client Details</h3>
            <p className="text-gray-700">{invoice.clientName}</p>
            <p className="text-gray-700">{invoice.clientEmail}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Status</h3>
            <div className="space-y-2">
              <PaymentStatusBadge status={invoice.status} />
              <p className="text-gray-700">
                Amount Paid: ${invoice.paidAmount?.toFixed(2) || '0.00'}
              </p>
              <p className="text-gray-700">
                Remaining: ${remainingAmount.toFixed(2)}
              </p>
              <div className="mt-4">
                <ReminderButton 
                  invoiceId={invoice.id}
                  onAddReminder={handleAddReminder}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Items</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                </div>
                <div className="flex gap-8">
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-end">
                <p className="text-xl font-bold">
                  Total: ${invoice.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentHistory payments={invoice.payments} />
          
          <div>
            {!showPaymentForm && invoice.status !== 'paid' && (
              <button
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Record New Payment
              </button>
            )}
            
            {showPaymentForm && (
              <PaymentForm
                totalAmount={invoice.amount}
                remainingAmount={remainingAmount}
                onSubmit={handlePayment}
              />
            )}
          </div>
        </div>

        {invoice.reminders?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Reminders</h3>
            <div className="space-y-2">
              {invoice.reminders.map((reminder, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">
                    {format(new Date(reminder.date), 'MMM dd, yyyy')}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    reminder.status === 'sent' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reminder.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ExportModal
        invoice={invoice}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </motion.div>
  );
}