import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoice } from '../context/InvoiceContext';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import CurrencySelector from '../components/CurrencySelector';
import TaxSettings from '../components/TaxSettings';
import BillItemForm from '../components/BillItemForm';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { dispatch } = useInvoice();
  const [currentStep, setCurrentStep] = useState(1);
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    dueDate: '',
    notes: '',
    documentType: 'invoice',
    currency: 'INR',
    taxRate: 18
  });

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subtotal = calculateTotal();
    const tax = formData.documentType === 'invoice' 
      ? subtotal * (formData.taxRate / 100)
      : 0;
    
    const invoice = {
      ...formData,
      items,
      subtotal,
      tax,
      amount: subtotal + tax,
      status: 'pending',
      createdAt: new Date().toISOString(),
      dueDate: formData.dueDate || format(addDays(new Date(), 15), 'yyyy-MM-dd')
    };
    
    dispatch({ type: 'ADD_INVOICE', payload: invoice });
    navigate('/');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.clientName && formData.clientEmail && formData.dueDate;
      case 2:
        return items.every(item => item.description && item.quantity > 0 && item.price > 0);
      default:
        return true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of 2
            </span>
            <span className="text-sm font-medium text-primary-600">
              {currentStep === 1 ? 'Client Details' : 'Bill Items'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <DocumentTypeSelector 
                value={formData.documentType}
                onChange={(type) => setFormData({...formData, documentType: type})}
              />

              <CurrencySelector
                value={formData.currency}
                onChange={(currency) => setFormData({...formData, currency})}
              />

              {formData.documentType === 'invoice' && (
                <TaxSettings
                  taxRate={formData.taxRate}
                  onChange={(rate) => setFormData({...formData, taxRate: rate})}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <BillItemForm
                items={items}
                onItemChange={handleItemChange}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
              />
            </motion.div>
          )}

          <div className="mt-8 flex justify-between items-center">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
            )}
            <div className="ml-auto">
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Invoice
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}