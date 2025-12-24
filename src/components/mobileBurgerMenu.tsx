"use client";
import { useState } from "react";

export default function MobileMenuButton({
	menuContent,
}: {
	menuContent: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Mobile Menu Button */}
			<div className="flex justify-center [@media(min-width:450px)]:hidden fixed bottom-4 left-0 w-full z-50">
				<button
					onClick={() => setOpen(true)}
					className="bg-[#3A4483] opacity-75 rounded-full p-4 shadow-lg"
					aria-label="Open menu"
				>
					<img src="/Menu.svg" alt="Menu icon" className="w-8 h-8" />
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
					<div
						className="relative z-10 mx-4 w-full max-w-xs bg-[#3A4483] rounded-2xl shadow-2xl p-6 
            animate-slide-down"
					>
						{/* Close button */}
						<button
							className="absolute top-3 right-3 text-white text-2xl"
							aria-label="Close menu"
							onClick={() => setOpen(false)}
						>
							×
						</button>
						{menuContent}
					</div>
				</div>
			)}

			{/* Tailwind/Custom Animations */}
			<style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-32px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        .animate-slide-down {
          animation: slide-down 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
		</>
	);
}
