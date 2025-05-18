import { format } from 'date-fns';

export const generateCSV = (invoice) => {
  const items = invoice.items.map(item => 
    `${item.description},${item.quantity},${item.price},${item.quantity * item.price}`
  ).join('\n');

  const csv = `
Invoice #${invoice.id}
Date,${format(new Date(invoice.createdAt), 'yyyy-MM-dd')}
Due Date,${invoice.dueDate}
Status,${invoice.status}
Client,${invoice.clientName}
Email,${invoice.clientEmail}

Description,Quantity,Price,Total
${items}

Total Amount,,,${invoice.amount}
`;

  return csv.trim();
};

export const generateJSON = (invoice) => {
  return JSON.stringify(invoice, null, 2);
};

export const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};