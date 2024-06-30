import { render, screen, waitFor } from '@testing-library/react';
import Homepage from './Homepage';
import { getAllProducts } from '../../apis/Api';
import mockProducts from '../../__mock__/mockProducts';
import '@testing-library/jest-dom';

jest.mock('../../apis/Api'); // Mock the API module

describe('Homepage component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    it('should fetch and display products', async () => {
        // Mock API response
        const mock_data = mockProducts;

        getAllProducts.mockResolvedValue({ data: { products: mock_data } });

        // Render the Homepage component
        render(<Homepage />);

        // Wait for the products to be fetched and displayed
        await waitFor(() => {
            // Check if the product names are in the document
            mockProducts.forEach(product => {
                expect(screen.getByText(product.productName)).toBeInTheDocument();
            });
        });
    });

   
});
