import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../register-form';
import { AuthProvider } from '@/lib/auth/auth-context';

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock Auth Context
const mockSignUp = jest.fn();
jest.mock('@/lib/auth/auth-context', () => ({
    ...jest.requireActual('@/lib/auth/auth-context'),
    useAuth: () => ({
        signUp: mockSignUp,
        loading: false,
    }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('F1: Registration Form', () => {
    beforeEach(() => {
        mockSignUp.mockClear();
    });

    // F1.1.1
    it('F1.1.1: Valid email + password registers successfully', async () => {
        render(
            <AuthProvider>
                <RegisterForm />
            </AuthProvider>
        );

        // Use precise label matching or getAllByLabelText if needed, but regex with strict start/end is good
        await userEvent.type(screen.getByLabelText(/^Email address$/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/^Password$/i), 'Password123!');
        await userEvent.type(screen.getByLabelText(/^Confirm Password$/i), 'Password123!');

        const submitBtn = screen.getByRole('button', { name: /create account/i });
        await userEvent.click(submitBtn);

        await waitFor(() => {
            expect(mockSignUp).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'Password123!',
                confirmPassword: 'Password123!'
            });
        });
    });

    // F1.1.3
    it('F1.1.3: Rejects invalid email format', async () => {
        render(<RegisterForm />);

        await userEvent.type(screen.getByLabelText(/^Email address$/i), 'invalid-email');
        await userEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(async () => {
            expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
        });
        expect(mockSignUp).not.toHaveBeenCalled();
    });

    // F1.1.4, F1.1.5, F1.1.6
    it('F1.1.4-6: Rejects weak passwords', async () => {
        render(<RegisterForm />);

        // Too short
        await userEvent.type(screen.getByLabelText(/^Password$/i), 'short');
        await userEvent.click(screen.getByRole('button', { name: /create account/i }));
        expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument();

        // No number
        await userEvent.clear(screen.getByLabelText(/^Password$/i));
        await userEvent.type(screen.getByLabelText(/^Password$/i), 'NoNumberHere');
        await userEvent.click(screen.getByRole('button', { name: /create account/i }));
        // Zod error for missing number/uppercase etc might define specific messages. 
        // Based on the implemented schema: "Password must contain at least one number"
        expect(await screen.findByText(/must contain at least one number/i)).toBeInTheDocument();
    });

    // F1.1.11
    it('F1.1.11: Disables button during submission', async () => {
        // Mock loading state
        jest.spyOn(require('@/lib/auth/auth-context'), 'useAuth').mockImplementation(() => ({
            signUp: mockSignUp,
            loading: true,
        }));

        render(<RegisterForm />);
        const submitBtn = screen.getByRole('button', { name: /creating account/i });
        expect(submitBtn).toBeDisabled();
    });
});
