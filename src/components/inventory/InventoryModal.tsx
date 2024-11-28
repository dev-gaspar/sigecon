import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../utils/storage';
import type { InventoryItem } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  name: '',
  quantity: '',
  unit: 'unidad' as const,
  price: '',
  minStock: '',
};

export function InventoryModal({ isOpen, onClose }: Props) {
  const [item, setItem] = useState<typeof initialState>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      ...item,
      id: uuidv4(),
      quantity: Number(item.quantity),
      price: Number(item.price),
      minStock: Number(item.minStock),
      lastUpdated: new Date().toISOString(),
    };
    
    const inventory = storage.getInventory();
    storage.setInventory([...inventory, newItem]);
    storage.addAuditLog({
      id: uuidv4(),
      action: 'CREATE_INVENTORY_ITEM',
      userId: 'current-user',
      timestamp: new Date().toISOString(),
      details: `Item creado: ${newItem.name}`,
    });
    
    setItem(initialState);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Nuevo Item de Inventario</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={item.quantity}
                  onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Unidad</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={item.unit}
                  onChange={(e) => setItem({ ...item, unit: e.target.value as InventoryItem['unit'] })}
                >
                  <option value="unidad">Unidad</option>
                  <option value="kg">Kilogramo</option>
                  <option value="litro">Litro</option>
                  <option value="metro">Metro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
              <input
                type="number"
                required
                min="0"
                step="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.minStock}
                onChange={(e) => setItem({ ...item, minStock: e.target.value })}
              />
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Crear Item
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}