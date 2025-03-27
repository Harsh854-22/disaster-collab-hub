
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This is a mock authentication state for now
// In a real app, this would connect to a backend auth system
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

export const login = (email: string, password: string): Promise<string> => {
  // Mock login function - would connect to a real backend in production
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('auth_token', token);
        resolve(token);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const logout = (): void => {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
};

// React hook for protected routes
export const useRequireAuth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
};

// Higher order component for protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    useRequireAuth();
    return <Component {...props} />;
  };
};
