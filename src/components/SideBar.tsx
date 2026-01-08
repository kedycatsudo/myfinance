'use client';

import Link from 'next/link';
import Image from 'next/image';
import { navItems } from '@/data/navItems';

type SideBarProps = {
  className?: string;
  activePath?: string;
};
export default function SideBar({ className = '', activePath }: SideBarProps) {
  return (
    <aside
      className={`flex flex-col bg-[#989899] opacity-75 items-center w-[180px] min-w-[180px] ${className}`}
      aria-label="Sidebar Navigation"
    >
      <Image
        src="/Menu.svg"
        alt="Menu icon"
        width={80}
        height={80}
        className="w-8 h-8 mt-2 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
        priority
      />
      <nav className="w-full mt-2" aria-label="Main">
        {navItems.map(({ href, label }) => {
          const isActive = activePath === href;
          return (
            <div
              key={label}
              className={`w-full relative ${isActive ? 'bg-[#3A4483] rounded' : ''}`}
            >
              <Link
                href={href}
                className={`block text-xs xs:text-xl font-bold cursor-pointer hover:text-[#1E1552] text-center py-2 z-[9999] ${
                  isActive ? 'text-white' : 'text-[#1E1552]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
              {/* Decorative underline bar */}
              <div className="w-full h-2 bg-[#29388A] rounded" />
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
