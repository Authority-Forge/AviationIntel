import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Simple Test', () => {
    it('Should pass', () => {
        render(<div>Hello</div>);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
