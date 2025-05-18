import { motion } from 'framer-motion';
import { HiTrash, HiPlus } from 'react-icons/hi';

export default function BillItemForm({ items, onItemChange, onAddItem, onRemoveItem }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">Bill Items</h3>
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center text-primary-600 hover:text-primary-700 px-2 py-1 rounded-md hover:bg-primary-50"
        >
          <HiPlus className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">Add Item</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-50 p-4 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Item #{index + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Item description"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={item.description}
                onChange={(e) => onItemChange(index, 'description', e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={item.quantity}
                    onChange={(e) => onItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={item.price}
                    onChange={(e) => onItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="text-right text-sm font-medium text-gray-600">
                Subtotal: ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}