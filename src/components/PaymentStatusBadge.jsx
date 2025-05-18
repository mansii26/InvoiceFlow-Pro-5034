import { HiClock, HiCheck, HiX, HiCash } from 'react-icons/hi';

const statusConfig = {
  pending: { icon: HiClock, class: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
  'partially-paid': { icon: HiCash, class: 'bg-blue-100 text-blue-800', text: 'Partially Paid' },
  paid: { icon: HiCheck, class: 'bg-green-100 text-green-800', text: 'Paid' },
  overdue: { icon: HiX, class: 'bg-red-100 text-red-800', text: 'Overdue' },
  cancelled: { icon: HiX, class: 'bg-gray-100 text-gray-800', text: 'Cancelled' }
};

export default function PaymentStatusBadge({ status, className = '' }) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.class} ${className}`}>
      <Icon className="w-4 h-4 mr-1.5" />
      {config.text}
    </span>
  );
}