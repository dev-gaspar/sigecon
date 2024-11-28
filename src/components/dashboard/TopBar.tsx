import React, { useState } from 'react';
import { Menu, Settings } from 'lucide-react';
import { storage } from '../../utils/storage';
import {
  AuditLog,
  Company,
  InventoryItem,
  Transaction,
  User,
} from '../../types';

interface Props {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: Props) {
  const company = storage.getCompany();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Función para resetear datos
  const handleReset = () => {
    localStorage.clear();
    window.location.reload(); // Recarga para reflejar los cambios
  };

  // Función para cargar datos ficticios
  const handleLoadMockData = () => {
    const mockCompany: Company = {
      name: 'Moda Elegante S.A.',
      rut: '98765432-1',
      address: 'Av. Moda 456, Ciudad de Estilo',
      phone: '+57 310 758 9922',
      email: 'info@modaelegante.com',
    };

    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Administrador Principal',
        email: 'admin@modaelegante.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Contador General',
        email: 'contable@modaelegante.com',
        role: 'accountant',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Vendedor Tienda 1',
        email: 'vendedor1@modaelegante.com',
        role: 'accountant',
        createdAt: new Date().toISOString(),
      },
    ];

    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'income',
        amount: 42000,
        description: 'Venta de vestidos y blusas',
        date: new Date().toISOString(),
        category: 'Ventas',
        createdBy: '3',
        isSale: true,
      },
      {
        id: '2',
        type: 'expense',
        amount: 15000,
        description: 'Compra de perchas y maniquíes',
        date: new Date().toISOString(),
        category: 'Inventario',
        createdBy: '2',
      },
      {
        id: '3',
        type: 'adjustment',
        amount: 2000,
        description: 'Ajuste de precios por descuento',
        date: new Date().toISOString(),
        category: 'Promociones',
        createdBy: '1',
      },
      {
        id: '4',
        type: 'income',
        amount: 60000,
        description: 'Venta de chaquetas y zapatos',
        date: new Date().toISOString(),
        category: 'Ventas',
        createdBy: '3',
        isSale: true,
      },
      {
        id: '5',
        type: 'expense',
        amount: 8000,
        description: 'Mantenimiento de sistemas',
        date: new Date().toISOString(),
        category: 'Servicios',
        createdBy: '2',
      },
    ];

    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Camisa Blanca',
        quantity: 50,
        unit: 'unidad',
        price: 12000,
        minStock: 10,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Pantalón de Vestir Negro',
        quantity: 30,
        unit: 'unidad',
        price: 25000,
        minStock: 5,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Vestido Rojo',
        quantity: 20,
        unit: 'unidad',
        price: 35000,
        minStock: 2,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Zapatos de Cuero',
        quantity: 40,
        unit: 'unidad',
        price: 45000,
        minStock: 8,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Cinturón Café',
        quantity: 60,
        unit: 'unidad',
        price: 8000,
        minStock: 15,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Chaqueta de Jean',
        quantity: 25,
        unit: 'unidad',
        price: 30000,
        minStock: 5,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '7',
        name: 'Blusa Estampada',
        quantity: 70,
        unit: 'unidad',
        price: 15000,
        minStock: 10,
        lastUpdated: new Date().toISOString(),
      },
    ];

    const mockAuditLogs: AuditLog[] = [
      {
        id: '1',
        action: 'Usuario creado',
        userId: '1',
        timestamp: new Date().toISOString(),
        details: 'Se creó al usuario Vendedor Tienda 1',
      },
      {
        id: '2',
        action: 'Venta registrada',
        userId: '3',
        timestamp: new Date().toISOString(),
        details: 'Venta de 2 vestidos y 3 blusas',
      },
      {
        id: '3',
        action: 'Ajuste de precios',
        userId: '1',
        timestamp: new Date().toISOString(),
        details: 'Descuento del 10% en blusas',
      },
      {
        id: '4',
        action: 'Nueva categoría agregada',
        userId: '1',
        timestamp: new Date().toISOString(),
        details: 'Categoría Promociones agregada',
      },
    ];

    storage.setCompany(mockCompany);
    storage.setUsers(mockUsers);
    storage.setTransactions(mockTransactions);
    storage.setInventory(mockInventory);
    mockAuditLogs.forEach((log) => storage.addAuditLog(log));

    window.location.reload();
  };

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <span className="text-xl font-semibold text-gray-900">
            {company?.name || 'Empresa'}
          </span>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
            onClick={toggleMenu}
          >
            <span className="sr-only">Settings</span>
            <Settings className="h-6 w-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={handleReset}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Reset Configuración
              </button>
              <button
                onClick={handleLoadMockData}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cargar Datos Ficticios
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
