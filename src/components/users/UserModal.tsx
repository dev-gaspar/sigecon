import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../utils/storage';
import type { User } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ isOpen, onClose }: Props) {
  const [user, setUser] = useState<Omit<User, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    const users = storage.getUsers();
    storage.setUsers([...users, newUser]);
    storage.addAuditLog({
      id: uuidv4(),
      action: 'CREATE_USER',
      userId: newUser.id,
      timestamp: new Date().toISOString(),
      details: `Usuario creado: ${newUser.name}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Nuevo Usuario</Dialog.Title>
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
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value as User['role'] })}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                <option value="accountant">Contador</option>
              </select>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}