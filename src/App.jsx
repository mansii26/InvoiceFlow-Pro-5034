import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceDetails from './pages/InvoiceDetails';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  return (
    <InvoiceProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateInvoice />} />
          <Route path="invoice/:id" element={<InvoiceDetails />} />
        </Route>
      </Routes>
    </InvoiceProvider>
  );
}

export default App;