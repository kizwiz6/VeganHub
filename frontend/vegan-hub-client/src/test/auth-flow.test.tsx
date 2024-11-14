// src/tests/auth-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

describe('Auth Flow', () => {
  it('handles login flow', async () => {
    const mockLogin = vi.fn();
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});