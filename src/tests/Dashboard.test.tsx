import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from '../components/dashboard/Dashboard';
import { storage } from "../utils/storage";
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('../utils/storage');

const mockedStorage = storage as jest.Mocked<typeof storage>;

describe('Dashboard', () => {
    beforeEach(() => {
        mockedStorage.getCompany.mockReturnValue({
            name: 'Test Company',
            address: "address",
            email: "companyname@gmail.com",
            phone: "21312312",
            rut: "23141234123"
        });
        mockedStorage.getUsers.mockReturnValue([
            { id: '1', name: 'User 1', role: "admin", email: "user1@gmail.com", createdAt: new Date().toISOString() },
            { id: '2', name: 'User 2', role: 'admin', email: "user2@gmail.com", createdAt: new Date().toISOString() }
        ]);
        mockedStorage.getTransactions.mockReturnValue([
            { id: '1', amount: 100, category: 'Venta', createdBy: 'user', date: new Date().toISOString(), description: 'Pago recibido', type: 'income' },
            { id: '2', amount: 200, category: 'Compra', createdBy: 'user', date: new Date().toISOString(), description: 'Pago realizado', type: 'expense' },
        ]);
        mockedStorage.getInventory.mockReturnValue([
            { id: '1', name: 'Item 1', quantity: 4, price: 100, unit: 10, minStock: 5, lastUpdated: new Date().toISOString() },
            { id: '2', name: 'Item 2', quantity: 20, price: 200, unit: 20, minStock: 10, lastUpdated: new Date().toISOString() },
        ]);
        mockedStorage.getAuditLogs.mockReturnValue([
            { id: '1', action: 'Test Action', timestamp: new Date().toISOString(), details: 'Test Details', userId: '1' },
        ]);
    });

    test('renders dashboard with company name', () => {
        render(
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <Dashboard />
            </Router>
        );
        expect(screen.getByText('Bienvenido a Test Company')).toBeInTheDocument();
    });

    test('renders stats correctly', async () => {
        render(
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <Dashboard />
            </Router>
        );

        // Verifica los títulos
        expect(screen.getByText('Usuarios Activos')).toBeInTheDocument();
        expect(screen.getByText('Transacciones')).toBeInTheDocument();
        expect(screen.getByText('Items en Inventario')).toBeInTheDocument();
        expect(screen.getByText('Registros de Auditoría')).toBeInTheDocument();

        // Verifica los valores usando `toHaveTextContent`
        expect(screen.getByText('Usuarios Activos').closest('dl')).toHaveTextContent('2');
        expect(screen.getByText('Transacciones').closest('dl')).toHaveTextContent('2');
        expect(screen.getByText('Items en Inventario').closest('dl')).toHaveTextContent('2');
        expect(screen.getByText('Registros de Auditoría').closest('dl')).toHaveTextContent('1');
    });

    test('renders latest transactions', () => {
        render(
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <Dashboard />
            </Router>
        );
        expect(screen.getByText('Últimas Transacciones')).toBeInTheDocument();
        expect(screen.getByText('Pago recibido')).toBeInTheDocument();
        expect(screen.getByText('Venta')).toBeInTheDocument();
        expect(screen.getByText('+ $100')).toBeInTheDocument();
        expect(screen.getByText('- $200')).toBeInTheDocument();
    });

    test('renders low inventory items', () => {
        render(
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <Dashboard />
            </Router>
        );
        expect(screen.getByText('Inventario Bajo')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Stock: 4 / Mínimo: 5')).toBeInTheDocument();
    });

});
