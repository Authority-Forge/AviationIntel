import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../login-form';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock Auth Context
const mockSignIn = jest.fn();
jest.mock('@/lib/auth/auth-context', () => ({
    useAuth: () => ({
        signIn: mockSignIn,
        loading: false,
    }),
}));

describe('F1: Login Form', () => {
    beforeEach(() => {
        mockSignIn.mockClear();
    });

    // F1.2.1
    it('F1.2.1: Valid credentials login successfully', async () => {
        render(<LoginForm />);

        await userEvent.type(screen.getByLabelText(/^Email address$/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/^Password$/i), 'Password123!');

        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'Password123!'
            });
        });
    });

    // F1.2.3
    it('F1.2.3: Rejects invalid email', async () => {
        render(<LoginForm />);

        await userEvent.type(screen.getByLabelText(/^Email address$/i), 'not-an-email');
        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(async () => {
            expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
        });
        expect(mockSignIn).not.toHaveBeenCalled();
    });

    // F1.2.9
    it('F1.2.9: Shows loading state during submission', async () => {
        jest.spyOn(require('@/lib/auth/auth-context'), 'useAuth').mockImplementation(() => ({
            signIn: mockSignIn,
            loading: true,
        }));

        render(<LoginForm />);
        expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });
});
