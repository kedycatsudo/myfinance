'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';
import { mockUser } from '@/data/user';
//Define the shape for context
type AuthContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  register: (user: Omit<User, 'id' | 'hashedPassword'> & { password: string }) => {
    success: boolean;
    message: string;
  };
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  //Simulate your regiustered user iin strate for MVP

  const [users, setUsers] = useState<User[]>(mockUser);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // --Login method--
  function login(username: string, password: string) {
    //Simulate "auth" (never do this in production), use a backend + hash check
    const user = users.find((u) => u.username === username);
    if (!user) {
      return { success: false, message: 'User not founded' };
    }
    // WARNING: Hash comparison is backend-only
    //For now, fake just check string match(if using a real hash)
    if (user.hashedPassword !== password) {
      return { success: false, message: 'Login failed(incorrect password' };
    }
    setCurrentUser(user);
    return { success: true, message: 'Login successful.' };
  }

  //--Logout method--
  function logout() {
    setCurrentUser(null);
  }
  // -- Register method--

  function register(newUser: Omit<User, 'id' | 'hashedPassword'> & { password: string }) {
    //Check for unique username/email
    if (users.some((u) => u.username === newUser.username || u.email === newUser.email)) {
      return { success: false, message: 'Username or email already exist.' };
    }

    //create a new user with a (*faked) password hash
    const fakeHashed = newUser.password; // Only for demo, Replace with hash when backend is ready.
    const user: User = {
      ...newUser,
      id: 'user' + (users.length + 1),
      hashedPassword: fakeHashed,
    };
    setUsers([...users, user]);
    setCurrentUser(user); //Optionally log in after registration
    return { success: true, message: 'Registration successful' };
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Easy hook to use context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used under <AuthProvider>');
  return ctx;
}
