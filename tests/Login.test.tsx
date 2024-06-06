import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from "../src/views/Login";


describe('LoginPage', () => {
    it('should contain an input element of type text', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);
        const inputElement = screen.getByLabelText(/Username/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('should render password input', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render login button', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const submitButton = screen.getByRole('button', { type: 'submit' });
        expect(submitButton).toBeInTheDocument();
    });

    it('should show error message when username is empty', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { type: 'submit' });
        fireEvent.click(submitButton);

        const emailError = await screen.findByText(/Please input your username!/i);
        expect(emailError).toBeInTheDocument();
    });

    it('should show error message when password is empty', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { type: 'submit' });
        fireEvent.click(submitButton);

        const passwordError = await screen.findByText(/Please input your password!/i);
        expect(passwordError).toBeInTheDocument();
    });
});
