import React, { useState } from 'react';
import { PlusCircle, ArrowUpCircle, ArrowDownCircle, RefreshCw, ShoppingCart, Download } from 'lucide-react';
import { storage } from '../../utils/storage';
import { TransactionModal } from './TransactionModal';
import { SaleModal } from './SaleModal';
import { TransactionDetails } from './TransactionDetails';
import { exportToExcel } from '../../utils/export';
import type { Transaction } from '../../types';

export function TransactionList() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'adjustment' | 'sales'>('all');
  
  const transactions = storage.getTransactions().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'sales') return transaction.isSale === true;
    if (filter === 'income') return transaction.type === 'income' && !transaction.isSale;
    return transaction.type === filter;
  });

  const getTransactionIcon = (type: Transaction['type'], isSale?: boolean) => {
    if (isSale) return <ShoppingCart className="h-8 w-8 text-blue-500" />;
    switch (type) {
      case 'income':
        return <ArrowUpCircle className="h-8 w-8 text-green-500" />;
      case 'expense':
        return <ArrowDownCircle className="h-8 w-8 text-red-500" />;
      case 'adjustment':
        return <RefreshCw className="h-8 w-8 text-yellow-500" />;
    }
  };

  const handleExport = () => {
    const data = filteredTransactions.map(t => ({
      Fecha: new Date(t.date).toLocaleDateString(),
      Tipo: t.isSale ? 'Venta' : t.type,
      Descripción: t.description,
      Categoría: t.category,
      Monto: t.amount,
      Detalles: t.details || ''
    }));
    exportToExcel(data, 'transacciones');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transacciones</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <button
            onClick={() => setIsSaleModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Nueva Venta
          </button>
          <button
            onClick={() => setIsTransactionModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Nueva Transacción
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filter === 'income' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Ingresos
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filter === 'expense' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Egresos
          </button>
          <button
            onClick={() => setFilter('adjustment')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filter === 'adjustment' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Ajustes
          </button>
          <button
            onClick={() => setFilter('sales')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filter === 'sales' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Ventas
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction: Transaction) => (
            <li 
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    {getTransactionIcon(transaction.type, transaction.isSale)}
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="mt-1 text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <div className={`text-lg font-medium ${
                      transaction.type === 'income' || transaction.isSale ? 'text-green-600' : 
                      transaction.type === 'expense' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>
                      {transaction.type === 'income' || transaction.isSale ? '+' : '-'} ${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <TransactionModal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} />
      <SaleModal isOpen={isSaleModalOpen} onClose={() => setIsSaleModalOpen(false)} />
      <TransactionDetails 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />
    </div>
  );
}