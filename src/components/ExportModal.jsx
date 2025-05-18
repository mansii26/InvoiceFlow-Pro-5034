import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiDownload, HiClipboardCopy, HiShare } from 'react-icons/hi';
import { generateCSV, generateJSON, downloadFile } from '../utils/exportUtils';

export default function ExportModal({ invoice, isOpen, onClose }) {
  const handleExport = (format) => {
    const fileName = `invoice-${invoice.id}`;
    
    switch (format) {
      case 'csv':
        downloadFile(generateCSV(invoice), `${fileName}.csv`, 'text/csv');
        break;
      case 'json':
        downloadFile(generateJSON(invoice), `${fileName}.json`, 'application/json');
        break;
      default:
        break;
    }
    onClose();
  };

  const copyToClipboard = async (format) => {
    const content = format === 'csv' ? generateCSV(invoice) : generateJSON(invoice);
    try {
      await navigator.clipboard.writeText(content);
      alert('Copied to clipboard!');
      onClose();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareInvoice = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice #${invoice.id}`,
          text: `Invoice for ${invoice.clientName}`,
          url: window.location.href
        });
        onClose();
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('Web Share API not supported');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Export Invoice #{invoice.id}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Download</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center justify-center gap-2 p-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <HiDownload className="w-5 h-5" />
                  CSV Format
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="flex items-center justify-center gap-2 p-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <HiDownload className="w-5 h-5" />
                  JSON Format
                </button>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Copy to Clipboard</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => copyToClipboard('csv')}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <HiClipboardCopy className="w-5 h-5" />
                  Copy as CSV
                </button>
                <button
                  onClick={() => copyToClipboard('json')}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <HiClipboardCopy className="w-5 h-5" />
                  Copy as JSON
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={shareInvoice}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <HiShare className="w-5 h-5" />
                  Share Invoice
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}