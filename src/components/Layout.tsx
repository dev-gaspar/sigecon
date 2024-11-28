import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Users, 
  Receipt, 
  BarChart3, 
  Package, 
  ClipboardList,
  Building2
} from 'lucide-react';
import { storage } from '../utils/storage';

export function Layout() {
  const location = useLocation();
  const company = storage.getCompany();

  const navigation = [
    { name: 'Usuarios', href: '/users', icon: Users },
    { name: 'Transacciones', href: '/transactions', icon: Receipt },
    { name: 'Reportes', href: '/reports', icon: BarChart3 },
    { name: 'Inventario', href: '/inventory', icon: Package },
    { name: 'Auditoría', href: '/audit', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <Building2 className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  {company?.name}
                </span>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          location.pathname === item.href
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <Icon
                          className={`${
                            location.pathname === item.href
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-gray-500'
                          } mr-3 h-5 w-5`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}