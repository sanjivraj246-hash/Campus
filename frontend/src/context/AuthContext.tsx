'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(INITIAL_USERS[3]); // Default Aarav Patel (Student)
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [token, setToken] = useState<string | null>('mock-jwt-token-campus-ai');

  useEffect(() => {
    const saved = localStorage.getItem('campusiq_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setRole(parsed.role);
      } catch (e) {
        // use default
      }
    }
  }, []);

  const login = (email: string, selectedRole?: UserRole): boolean => {
    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      const u = selectedRole ? { ...found, role: selectedRole } : found;
      setUser(u);
      setRole(u.role);
      setToken('mock-jwt-token-' + u.id);
      localStorage.setItem('campusiq_user', JSON.stringify(u));
      return true;
    }
    // Create new user if not found
    const newUser: User = {
      id: Date.now(),
      email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      role: selectedRole || 'STUDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };
    setUser(newUser);
    setRole(newUser.role);
    setToken('mock-jwt-token-' + newUser.id);
    localStorage.setItem('campusiq_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campusiq_user');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'ADMIN') {
      const admin = INITIAL_USERS.find(u => u.role === 'ADMIN') || INITIAL_USERS[0];
      setUser(admin);
      setRole('ADMIN');
      localStorage.setItem('campusiq_user', JSON.stringify(admin));
    } else if (newRole === 'FACULTY') {
      const faculty = INITIAL_USERS.find(u => u.role === 'FACULTY') || INITIAL_USERS[1];
      setUser(faculty);
      setRole('FACULTY');
      localStorage.setItem('campusiq_user', JSON.stringify(faculty));
    } else {
      const student = INITIAL_USERS.find(u => u.role === 'STUDENT') || INITIAL_USERS[3];
      setUser(student);
      setRole('STUDENT');
      localStorage.setItem('campusiq_user', JSON.stringify(student));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
