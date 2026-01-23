'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assetPrefix, basePath } from '@/constants/config';
export type MenuItem = {
  href: string;
  label: string;
};

type MobileMenuButtonProps = {
  menuItems: MenuItem[];
};

export default function MobileMenuButton({ menuItems }: MobileMenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Mobile Menu Button */}
      <div className="flex justify-center [@media(min-width:450px)]:hidden fixed bottom-4 left-0 w-full z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#727272] rounded-full p-4 shadow-lg"
          aria-label="Open menu"
        >
          <Image
            src={`${assetPrefix}images/Menu.svg`}
            alt="Menu icon"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay with fade-in */}
          <div
            className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          {/* Menu modal with scale & slide animation */}
          <div className="relative z-10 mx-4 w-full max-w-xs bg-[#3A4483] rounded-2xl shadow-2xl p-6 animate-slide-down">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-white text-2xl"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <nav className="flex flex-col gap-6 text-center">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white font-bold text-xl hover:text-blue-200"
                  onClick={() => setOpen(false)} // close when clicking a link
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Tailwind/Custom Animations */}
      {/* Custom animations moved to globals.css for SSR consistency */}
    </>
  );
}
