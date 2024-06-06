import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from "../src/views/ErrorPage";


describe('ErrorPage', () => {
    it('should contain error text', () => {
        render(<MemoryRouter>
            <ErrorPage />
        </MemoryRouter>);
        const errorText = screen.getByText(/Sorry, the page you visited does not exist/i);
        expect(errorText).toBeInTheDocument();
    });


});
