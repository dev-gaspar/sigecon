import { Company } from "../../types";
import { storage } from "../../utils/storage";

// Mocks para localStorage
beforeEach(() => {
    localStorage.clear();
});

test('setCompany y getCompany deberían almacenar y recuperar una compañía correctamente', () => {
    const company: Company = {
        name: 'Moda Elegante S.A.',
        rut: '98765432-1',
        address: 'Av. Moda 456, Ciudad de Estilo',
        phone: '+57 310 758 9922',
        email: 'info@modaelegante.com',
    };

    // Llamamos a setCompany
    storage.setCompany(company);

    // Recuperamos la compañía
    const retrievedCompany = storage.getCompany();

    // Verificamos que la compañía almacenada sea la misma que la recuperada
    expect(retrievedCompany).toEqual(company);
});

test('getCompany debería retornar null si no hay datos en localStorage', () => {
    const retrievedCompany = storage.getCompany();
    expect(retrievedCompany).toBeNull();
});
