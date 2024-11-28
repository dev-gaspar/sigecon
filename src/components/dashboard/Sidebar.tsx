import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Receipt, 
  BarChart3, 
  Package, 
  ClipboardList,
  Building2,
  X
} from 'lucide-react';
import { storage } from '../../utils/storage';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Building2 },
  { name: 'Usuarios', href: '/users', icon: Users },
  { name: 'Transacciones', href: '/transactions', icon: Receipt },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
  { name: 'Inventario', href: '/inventory', icon: Package },
  { name: 'Auditoría', href: '/audit', icon: ClipboardList },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: Props) {
  const company = storage.getCompany();

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`${
          isOpen ? 'fixed' : 'hidden'
        } md:hidden inset-0 flex z-40`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onClose}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {company?.name}
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => `
                      ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
                      group flex items-center px-2 py-2 text-base font-medium rounded-md
                    `}
                    onClick={onClose}
                  >
                    <Icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              {company?.name}
            </span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => `
                      ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    `}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}