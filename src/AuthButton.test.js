import { render, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButton from './AuthButton';

jest.mock('@auth0/auth0-react');

describe('AuthButton', () => {
  it('renders login button when user is not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    });

    const { getByText } = render(<AuthButton />);
    expect(getByText('Log In')).toBeInTheDocument();
  });

  it('renders logout button when user is authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
    });

    const { getByText } = render(<AuthButton />);
    expect(getByText('Log Out')).toBeInTheDocument();
  });

  it('calls loginWithRedirect when login button is clicked', () => {
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect,
    });

    const { getByText } = render(<AuthButton />);
    fireEvent.click(getByText('Log In'));
    expect(loginWithRedirect).toHaveBeenCalled();
  });

  it('calls logout when logout button is clicked', () => {
    const logout = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout,
    });

    const { getByText } = render(<AuthButton />);
    fireEvent.click(getByText('Log Out'));
    expect(logout).toHaveBeenCalled();
  });
});