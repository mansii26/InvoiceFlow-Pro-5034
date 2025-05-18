import { useState } from 'react';
import { HiBell, HiOutlineCalendar } from 'react-icons/hi';
import { format } from 'date-fns';

export default function ReminderButton({ invoiceId, onAddReminder }) {
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReminder({
      invoiceId,
      reminder: {
        date,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    });
    setShowForm(false);
    setDate('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600"
      >
        <HiBell className="w-4 h-4" />
        <span>Remind</span>
      </button>

      {showForm && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <HiOutlineCalendar className="text-gray-400" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="flex-1 text-sm border rounded px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-1 px-3 rounded text-sm"
            >
              Set Reminder
            </button>
          </form>
        </div>
      )}
    </div>
  );
}