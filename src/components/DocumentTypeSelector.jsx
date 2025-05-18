import { HiDocumentText, HiReceiptTax, HiCurrencyRupee } from 'react-icons/hi';

const documentTypes = [
  {
    value: 'invoice',
    label: 'Tax Invoice',
    icon: HiReceiptTax,
    description: 'For taxable goods/services with GST'
  },
  {
    value: 'estimate',
    label: 'Proforma/Estimate',
    icon: HiDocumentText,
    description: 'For price quotations before work'
  },
  {
    value: 'cash',
    label: 'Cash Bill',
    icon: HiCurrencyRupee,
    description: 'For immediate cash payments'
  }
];

export default function DocumentTypeSelector({ value, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Document Type
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`p-4 border rounded-lg text-left transition-colors ${
              value === type.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <type.icon className="w-6 h-6 text-primary-600" />
              <div>
                <h4 className="font-medium">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}