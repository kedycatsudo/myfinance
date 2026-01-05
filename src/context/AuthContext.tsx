'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';
import { mockUser } from '@/data/user';
//Define the shape for context
type AuthContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => { success: boolean };
};
