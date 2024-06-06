import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from "../src/views/Home";


describe('Home', () => {
    it('should remove an item from the list when the remove button is clicked', () => {
        render(<MemoryRouter>
            <Home />
        </MemoryRouter>);

        const item = screen.getByText('Pakiet XS');
        expect(item).toBeInTheDocument();

        const removeButton = screen.getByTestId('button0');
        fireEvent.click(removeButton);

        expect(item).not.toBeInTheDocument();
    });
});
