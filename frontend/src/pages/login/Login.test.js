// Login.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';
import Login from './Login';

jest.mock('../../apis/Api');

describe('Login component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display an error toast on failed login', async () => {
        render(<Login />);

        const mockResponse = { 
            data: {
                success: false,
                message: 'Password not matched!'
            }
        };
        loginUserApi.mockResolvedValue(mockResponse);

        // 
        toast.error = jest.fn();

        const email = screen.getByPlaceholderText('Enter your email address')
        const password = screen.getByPlaceholderText('Enter your password')
        const loginBtn = screen.getByText('Login')

        fireEvent.change(email, { target: { value: 'bb@gmail.com' } })
        fireEvent.change(password, { target: { value: 'bb1234' } })
        fireEvent.click(loginBtn)

        
        await waitFor(() => {
            expect(loginUserApi).toHaveBeenCalledWith({ email: 'bb@gmail.com', password: 'bb1234' });
            expect(toast.error).toHaveBeenCalledWith('Password not matched!');
        });
    });

    

    
});