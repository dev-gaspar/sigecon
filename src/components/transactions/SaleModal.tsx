import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../utils/storage';
import type { Transaction, InventoryItem } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SaleModal({ isOpen, onClose }: Props) {
  const [sale, setSale] = useState({
    productId: '',
    quantity: 1,
  });

  const inventory = storage.getInventory();
  const selectedProduct = inventory.find(item => item.id === sale.productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;
    
    const totalAmount = selectedProduct.price * sale.quantity;
    
    // Create transaction
    const newTransaction: Transaction = {
      id: uuidv4(),
      type: 'income',
      amount: totalAmount,
      description: `Venta de ${sale.quantity} ${selectedProduct.name}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Ventas',
      createdBy: 'current-user',
      isSale: true,
      details: `Venta de ${sale.quantity} ${selectedProduct.unit === 'unidad' ? 'unidades' : selectedProduct.unit} de ${selectedProduct.name} a $${selectedProduct.price} cada uno`
    };
    
    // Update inventory
    const updatedInventory = inventory.map((item): InventoryItem => {
      if (item.id === sale.productId) {
        return {
          ...item,
          quantity: item.quantity - sale.quantity,
          lastUpdated: new Date().toISOString(),
        };
      }
      return item;
    });
    
    // Save changes
    const transactions = storage.getTransactions();
    storage.setTransactions([...transactions, newTransaction]);
    storage.setInventory(updatedInventory);
    
    // Add audit log
    storage.addAuditLog({
      id: uuidv4(),
      action: 'SALE_CREATED',
      userId: 'current-user',
      timestamp: new Date().toISOString(),
      details: `Venta registrada: ${newTransaction.description} - $${newTransaction.amount}`,
    });
    
    setSale({
      productId: '',
      quantity: 1,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Registrar Venta</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Producto</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={sale.productId}
                onChange={(e) => setSale({ ...sale, productId: e.target.value })}
              >
                <option value="">Seleccionar producto</option>
                {inventory.map((item) => (
                  <option key={item.id} value={item.id} disabled={item.quantity === 0}>
                    {item.name} - Stock: {item.quantity} - ${item.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                type="number"
                min="1"
                max={selectedProduct?.quantity || 1}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={sale.quantity}
                onChange={(e) => setSale({ ...sale, quantity: parseInt(e.target.value) })}
              />
            </div>

            {selectedProduct && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">Total de la venta:</p>
                <p className="text-lg font-medium text-gray-900">
                  ${(selectedProduct.price * sale.quantity).toFixed(2)}
                </p>
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                disabled={!selectedProduct || sale.quantity > selectedProduct.quantity}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Registrar Venta
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}