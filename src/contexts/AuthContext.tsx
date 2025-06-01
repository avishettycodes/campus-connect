/**
 * AuthContext.tsx
 * Manages user authentication state and session persistence
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  notifications?: number;
  initials?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  validateSession: () => boolean;
  refreshUserData: () => boolean;
  clearAllUserData: () => void;
  getUserInitials: (name: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing saved user:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    const userWithInitials = {
      ...userData,
      initials: getUserInitials(userData.name)
    };
    setUser(userWithInitials);
    localStorage.setItem('user', JSON.stringify(userWithInitials));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userReservations');
  };

  const validateSession = () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      return false;
    }
    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      return true;
    } catch (err) {
      console.error('Error validating session:', err);
      return false;
    }
  };

  const refreshUserData = () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      return false;
    }
    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      return true;
    } catch (err) {
      console.error('Error refreshing user data:', err);
      return false;
    }
  };

  const clearAllUserData = () => {};

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        validateSession,
        refreshUserData,
        clearAllUserData,
        getUserInitials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 