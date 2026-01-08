import './globals.css';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ModalProvider } from '@/context/ModalContext';
import AppModal from '@/components/modals/AppModal';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="gap-6 p-1 bg-[#DCDDE3]">
        <AuthProvider>
          <ThemeProvider>
            <ModalProvider>
              <Header></Header>
              {children}
              <AppModal />
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
