import './globals.css';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="gap-6 p-1 bg-[#DCDDE3]">
        <AuthProvider>
          <ThemeProvider>
            <Header></Header>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
