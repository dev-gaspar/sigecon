import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../utils/storage';
import type { Transaction } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({ isOpen, onClose }: Props) {
  const [transaction, setTransaction] = useState<Omit<Transaction, 'id' | 'createdBy'>>({
    type: 'income',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      createdBy: 'current-user', // In a real app, this would come from auth context
    };
    
    const transactions = storage.getTransactions();
    storage.setTransactions([...transactions, newTransaction]);
    storage.addAuditLog({
      id: uuidv4(),
      action: 'CREATE_TRANSACTION',
      userId: 'current-user',
      timestamp: new Date().toISOString(),
      details: `Transacción creada: ${newTransaction.description} - $${newTransaction.amount}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Nueva Transacción</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={transaction.type}
                onChange={(e) => setTransaction({ ...transaction, type: e.target.value as Transaction['type'] })}
              >
                <option value="income">Ingreso</option>
                <option value="expense">Egreso</option>
                <option value="adjustment">Ajuste</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Monto</label>
              <input
                type="number"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={transaction.amount}
                onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={transaction.description}
                onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={transaction.category}
                onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={transaction.date}
                onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
              />
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Crear Transacción
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}