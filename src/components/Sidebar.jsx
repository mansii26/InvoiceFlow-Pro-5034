import { NavLink } from 'react-router-dom';
import { HiHome, HiPlusCircle } from 'react-icons/hi';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary-600">InvoiceApp</h1>
      </div>
      <nav className="mt-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 ${
              isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <HiHome className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 ${
              isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <HiPlusCircle className="w-5 h-5 mr-3" />
          Create Invoice
        </NavLink>
      </nav>
    </aside>
  );
}