import { storage } from "../utils/storage";
import { Company, User, Transaction, InventoryItem, AuditLog } from '../types';

describe('storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('setCompany and getCompany', () => {
        const company: Company = { name: 'Test Company', address: "address", email: "companyname@gmail.com", phone: "21312312", rut: "23141234123" }
        storage.setCompany(company);
        expect(storage.getCompany()).toEqual(company);
    });

    test('setUsers and getUsers', () => {
        const users: User[] = [
            { id: '1', name: 'User 1', role: "admin", email: "user1@gmail.com", createdAt: new Date().toISOString() },
            { id: '2', name: 'User 2', role: 'admin', email: "user2@gmail.com", createdAt: new Date().toISOString() }]

        storage.setUsers(users);
        expect(storage.getUsers()).toEqual(users);
    });

    test('setTransactions and getTransactions', () => {
        const transactions: Transaction[] = [
            { id: '1', amount: 100, category: "transaccion", createdBy: "user", date: new Date().toISOString(), description: "descripcion", type: "income" },
            { id: '2', amount: 200, category: "transaccion", createdBy: "user", date: new Date().toISOString(), description: "descripcion", type: "expense" }]
        storage.setTransactions(transactions);
        expect(storage.getTransactions()).toEqual(transactions);
    });

    test('setInventory and getInventory', () => {
        const inventory: InventoryItem[] = [
            { id: '1', name: 'Item 1', quantity: 10, price: 100, unit: 10, minStock: 5, lastUpdated: new Date().toISOString() },
            { id: '2', name: 'Item 2', quantity: 20, price: 200, unit: 20, minStock: 10, lastUpdated: new Date().toISOString() }];
        storage.setInventory(inventory);
        expect(storage.getInventory()).toEqual(inventory);
    });

    test('addAuditLog and getAuditLogs', () => {
        const log: AuditLog = { id: '1', action: 'Test Action', timestamp: new Date().toISOString(), details: 'Test Details', userId: '1' };
        storage.addAuditLog(log);
        expect(storage.getAuditLogs()).toEqual([log]);

        const log2: AuditLog = { id: '2', action: 'Another Action', timestamp: new Date().toISOString(), details: 'Another Details', userId: '2' };
        storage.addAuditLog(log2);
        expect(storage.getAuditLogs()).toEqual([log, log2]);
    });
});