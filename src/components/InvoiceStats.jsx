import { format } from 'date-fns';

export default function InvoiceStats({ invoices }) {
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const getOverdueInvoices = () => {
    const today = new Date();
    return invoices.filter(invoice => 
      invoice.status === 'pending' && 
      new Date(invoice.dueDate) < today
    );
  };

  const overdueInvoices = getOverdueInvoices();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-primary-600">${totalAmount.toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Amount</h3>
        <p className="text-3xl font-bold text-warning">${pendingAmount.toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Overdue Invoices</h3>
        <p className="text-3xl font-bold text-danger">{overdueInvoices.length}</p>
      </div>
    </div>
  );
}