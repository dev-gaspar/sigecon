export interface Company {
  name: string;
  rut: string;
  address: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'accountant';
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'adjustment';
  amount: number;
  description: string;
  date: string;
  category: string;
  createdBy: string;
  details?: string;
  isSale?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: 'unidad' | 'kg' | 'litro' | 'metro' | any;
  price: number;
  minStock: number;
  lastUpdated: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
  details: string;
}