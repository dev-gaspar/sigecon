import { Company, User, Transaction, InventoryItem, AuditLog } from '../types';

export const storage = {
  setCompany: (company: Company) => localStorage.setItem('company', JSON.stringify(company)),
  getCompany: (): Company | null => {
    const data = localStorage.getItem('company');
    return data ? JSON.parse(data) : null;
  },
  
  setUsers: (users: User[]) => localStorage.setItem('users', JSON.stringify(users)),
  getUsers: (): User[] => {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  },
  
  setTransactions: (transactions: Transaction[]) => localStorage.setItem('transactions', JSON.stringify(transactions)),
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  },
  
  setInventory: (inventory: InventoryItem[]) => localStorage.setItem('inventory', JSON.stringify(inventory)),
  getInventory: (): InventoryItem[] => {
    const data = localStorage.getItem('inventory');
    return data ? JSON.parse(data) : [];
  },
  
  addAuditLog: (log: AuditLog) => {
    const logs = storage.getAuditLogs();
    logs.push(log);
    localStorage.setItem('auditLogs', JSON.stringify(logs));
  },
  getAuditLogs: (): AuditLog[] => {
    const data = localStorage.getItem('auditLogs');
    return data ? JSON.parse(data) : [];
  },
};