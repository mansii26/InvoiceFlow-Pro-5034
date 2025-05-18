import { useInvoice } from '../context/InvoiceContext';
import { motion } from 'framer-motion';
import { HiDocumentText, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import StatusChart from '../components/StatusChart';
import InvoiceStats from '../components/InvoiceStats';

export default function Dashboard() {
  const { state } = useInvoice();
  const { invoices } = state;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'approved': return 'text-success';
      case 'rejected': return 'text-danger';
      default: return 'text-gray-500';
    }
  };

  const getStatusData = () => {
    const data = {
      pending: 0,
      approved: 0,
      rejected: 0
    };
    
    invoices.forEach(invoice => {
      data[invoice.status]++;
    });
    
    return data;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Dashboard</h1>
        <Link
          to="/create"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Create New Invoice
        </Link>
      </div>

      <InvoiceStats invoices={invoices} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
            <div className="space-y-4">
              {invoices.slice(-5).reverse().map((invoice) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">Invoice #{invoice.id}</h3>
                    <p className="text-sm text-gray-600">{invoice.clientName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                    <span className={`flex items-center ${getStatusColor(invoice.status)}`}>
                      {invoice.status === 'pending' && <HiClock className="w-5 h-5 mr-1" />}
                      {invoice.status === 'approved' && <HiCheckCircle className="w-5 h-5 mr-1" />}
                      {invoice.status === 'rejected' && <HiXCircle className="w-5 h-5 mr-1" />}
                      {invoice.status}
                    </span>
                    <Link
                      to={`/invoice/${invoice.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <HiDocumentText className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Status Overview</h2>
          <StatusChart data={getStatusData()} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Invoices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Invoice #{invoice.id}</h3>
                  <p className="text-gray-600">{invoice.clientName}</p>
                </div>
                <span className={`flex items-center ${getStatusColor(invoice.status)}`}>
                  {invoice.status === 'pending' && <HiClock className="w-5 h-5 mr-1" />}
                  {invoice.status === 'approved' && <HiCheckCircle className="w-5 h-5 mr-1" />}
                  {invoice.status === 'rejected' && <HiXCircle className="w-5 h-5 mr-1" />}
                  {invoice.status}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Amount: ${invoice.amount.toFixed(2)}</p>
                <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
              </div>
              <Link
                to={`/invoice/${invoice.id}`}
                className="text-primary-600 hover:text-primary-700 flex items-center"
              >
                <HiDocumentText className="w-5 h-5 mr-1" />
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}