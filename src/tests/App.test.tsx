import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// Mock para el método de storage
jest.mock('./mocks/storage', () => ({
    storage: {
        getCompany: jest.fn(() => null),
        setCompany: jest.fn(),
    },
}));

test('renderiza la pantalla de configuración de la compañía si no hay compañía configurada', () => {
    render(<App />);

    // Verificamos que la pantalla de configuración de la compañía esté presente
    expect(screen.getByText(/Configuración de la Empresa/i)).toBeInTheDocument();
});


