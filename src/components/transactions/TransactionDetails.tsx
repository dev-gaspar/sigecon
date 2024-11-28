import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import type { Transaction } from '../../types';

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetails({ transaction, onClose }: Props) {
  if (!transaction) return null;

  return (
    <Dialog open={!!transaction} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Detalles de la Transacción</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
              <p className="mt-1 text-sm text-gray-900">{transaction.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
              <p className="mt-1 text-sm text-gray-900">{transaction.type}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Monto</h3>
              <p className={`mt-1 text-sm font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 
                transaction.type === 'expense' ? 'text-red-600' : 
                'text-yellow-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} ${transaction.amount.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
              <p className="mt-1 text-sm text-gray-900">{transaction.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>

            {transaction.details && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Detalles Adicionales</h3>
                <p className="mt-1 text-sm text-gray-900">{transaction.details}</p>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}