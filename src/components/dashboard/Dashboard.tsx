import React from 'react';
import { Building2, Users, Receipt, Package, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storage } from '../../utils/storage';

export function Dashboard() {
  const company = storage.getCompany();
  const users = storage.getUsers();
  const transactions = storage.getTransactions();
  const inventory = storage.getInventory();
  const auditLogs = storage.getAuditLogs();

  const stats = [
    { name: 'Usuarios Activos', value: users.length, icon: Users },
    { name: 'Transacciones', value: transactions.length, icon: Receipt },
    { name: 'Items en Inventario', value: inventory.length, icon: Package },
    { name: 'Registros de Auditoría', value: auditLogs.length, icon: ClipboardList },
  ];

  return (
    <div id='dashboard'>
      <div className="flex items-center mb-8">
        <Building2 className="h-8 w-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">
          Bienvenido a {company?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={`/${item.name.toLowerCase().split(' ')[0]}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {item.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Últimas Transacciones</h3>
            <div className="mt-4 flow-root">
              <ul className="divide-y divide-gray-200">
                {transactions.slice(-3).map((transaction) => (
                  <li key={transaction.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                      <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {transaction.type === 'income' ? '+' : '-'} ${transaction.amount}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Inventario Bajo</h3>
            <div className="mt-4 flow-root">
              <ul className="divide-y divide-gray-200">
                {inventory
                  .filter(item => item.quantity <= item.minStock)
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Stock: {item.quantity} / Mínimo: {item.minStock}
                          </p>
                        </div>
                        <div className="text-sm text-yellow-600 font-medium">
                          Stock Bajo
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}