import React, { useState } from 'react';
import { PlusCircle, Package, AlertTriangle, Download } from 'lucide-react';
import { storage } from '../../utils/storage';
import { InventoryModal } from './InventoryModal';
import { exportToExcel } from '../../utils/export';
import type { InventoryItem } from '../../types';

const getUnitLabel = (unit: InventoryItem['unit']) => {
  switch (unit) {
    case 'unidad': return 'unidades';
    case 'kg': return 'kg';
    case 'litro': return 'litros';
    case 'metro': return 'metros';
  }
};

export function InventoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inventory = storage.getInventory();

  const handleExport = () => {
    const data = inventory.map(item => ({
      Nombre: item.name,
      Cantidad: item.quantity,
      Unidad: getUnitLabel(item.unit),
      Precio: item.price,
      'Stock Mínimo': item.minStock,
      'Última Actualización': new Date(item.lastUpdated).toLocaleString(),
    }));
    exportToExcel(data, 'inventario');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventario</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Nuevo Item
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {inventory.map((item: InventoryItem) => (
            <li key={item.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Precio: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <div className="flex items-center">
                      <div className="text-lg font-medium text-gray-900">
                        {item.quantity} {getUnitLabel(item.unit)}
                      </div>
                      {item.quantity <= item.minStock && (
                        <AlertTriangle className="ml-2 h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Stock mínimo: {item.minStock} {getUnitLabel(item.unit)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}