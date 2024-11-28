import React from 'react';
import { ClipboardList, User, Calendar, Download } from 'lucide-react';
import { storage } from '../../utils/storage';
import { exportToExcel } from '../../utils/export';
import type { AuditLog } from '../../types';

export function AuditList() {
  const auditLogs = storage.getAuditLogs().sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleExport = () => {
    const data = auditLogs.map(log => ({
      Fecha: new Date(log.timestamp).toLocaleString(),
      Acción: log.action,
      Usuario: log.userId,
      Detalles: log.details
    }));
    exportToExcel(data, 'auditoria');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ClipboardList className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Registro de Auditoría</h1>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-5 w-5 mr-2" />
          Exportar
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {auditLogs.map((log: AuditLog) => (
            <li key={log.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {log.action}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {log.userId}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}