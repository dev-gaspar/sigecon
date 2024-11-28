import React, { useState } from 'react';
import { User, PlusCircle } from 'lucide-react';
import { storage } from '../../utils/storage';
import { UserModal } from './UserModal';
import type { User as UserType } from '../../types';

export function UserList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = storage.getUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users.map((user: UserType) => (
            <li key={user.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <p className="font-medium text-indigo-600 truncate">{user.name}</p>
                      <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.role}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}