jest.mock('jspdf', () => {
    return {
        default: jest.fn(() => ({
            autoTable: jest.fn(),
            save: jest.fn(),
            text: jest.fn(),
        })),
    };
});
