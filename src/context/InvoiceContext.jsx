import { createContext, useContext, useReducer, useEffect } from 'react';
import { format } from 'date-fns';

const InvoiceContext = createContext();

const initialState = {
  invoices: [],
  nextId: 1,
  settings: {
    currency: 'INR',
    taxRate: 18,
    paymentTerms: 15,
    remindersEnabled: true
  }
};

function invoiceReducer(state, action) {
  switch (action.type) {
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, { 
          ...action.payload, 
          id: state.nextId,
          payments: [],
          paidAmount: 0,
          documentType: action.payload.documentType || 'invoice',
          currency: action.payload.currency || state.settings.currency
        }],
        nextId: state.nextId + 1
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };

    // ... (keep existing reducer cases)
    
    case 'ADD_REMINDER':
      return {
        ...state,
        invoices: state.invoices.map(invoice => 
          invoice.id === action.payload.invoiceId
            ? { 
                ...invoice, 
                reminders: [...(invoice.reminders || []), action.payload.reminder]
              }
            : invoice
        )
      };

    default:
      return state;
  }
}

export function InvoiceProvider({ children }) {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  // Check for overdue invoices daily
  useEffect(() => {
    const checkOverdue = () => {
      const today = new Date();
      dispatch({
        type: 'UPDATE_INVOICES',
        payload: state.invoices.map(invoice => {
          if (invoice.status === 'pending' && new Date(invoice.dueDate) < today) {
            return { ...invoice, status: 'overdue' };
          }
          return invoice;
        })
      });
    };

    const interval = setInterval(checkOverdue, 86400000); // Daily check
    return () => clearInterval(interval);
  }, [state.invoices]);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  return useContext(InvoiceContext);
}