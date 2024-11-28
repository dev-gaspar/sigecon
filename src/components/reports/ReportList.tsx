import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Download } from 'lucide-react';
import { storage } from '../../utils/storage';
import { exportToPDF } from '../../utils/export';
import type { Transaction } from '../../types';

export function ReportList() {
  const transactions = storage.getTransactions();
  
  const calculateTotals = () => {
    return transactions.reduce(
      (acc, transaction: Transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.expenses += transaction.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  };

  const { income, expenses } = calculateTotals();
  const balance = income - expenses;

  const reports = [
    {
      name: 'Balance General',
      icon: DollarSign,
      amount: balance,
      description: 'Balance actual',
      color: balance >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      name: 'Ingresos Totales',
      icon: TrendingUp,
      amount: income,
      description: 'Total de ingresos',
      color: 'text-green-600',
    },
    {
      name: 'Gastos Totales',
      icon: TrendingDown,
      amount: expenses,
      description: 'Total de gastos',
      color: 'text-red-600',
    },
  ];

  const handleExport = () => {
    const data = [
      {
        Concepto: 'Balance General',
        Monto: balance.toFixed(2),
      },
      {
        Concepto: 'Ingresos Totales',
        Monto: income.toFixed(2),
      },
      {
        Concepto: 'Gastos Totales',
        Monto: expenses.toFixed(2),
      },
      { Concepto: '', Monto: '' }, // Spacer
      { 
        Concepto: 'Detalle de Transacciones',
        Monto: '',
      },
      ...transactions.map(t => ({
        Concepto: t.description,
        Tipo: t.type,
        Categoría: t.category,
        Fecha: new Date(t.date).toLocaleDateString(),
        Monto: t.amount.toFixed(2),
      })),
    ];

    exportToPDF(data, 'reporte-financiero', 'Reporte Financiero');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Reportes Financieros</h1>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-5 w-5 mr-2" />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {report.name}
                      </dt>
                      <dd className={`text-lg font-medium ${report.color}`}>
                        ${report.amount.toFixed(2)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <p className="text-gray-500">{report.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Últimas Transacciones</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {transactions.slice(-5).map((transaction: Transaction) => (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {transaction.description}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} ${transaction.amount}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}