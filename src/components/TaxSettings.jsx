export default function TaxSettings({ taxRate, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tax Rate (%)
      </label>
      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={taxRate}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
}