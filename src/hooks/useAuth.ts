import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, loginUser, registerUser, generateId } from '@/lib/storage';

export function useAuth() {
  const [currentUser, setUser] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const user = loginUser(email, password);
    if (user) {
      setCurrentUser(user);
      setUser(user);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name: string, email: string, password: string, role: 'seller' | 'bidder' | 'both'): { success: boolean; error?: string } => {
    const { getUsers } = require('@/lib/storage');
    const users = getUsers();
    if (users.find((u: User) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    registerUser(newUser);
    setCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return { currentUser, login, register, logout };
}
