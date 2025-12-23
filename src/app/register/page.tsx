import Link from "next/link";

export default function RegisterPage() {
	return (
		<main className="min-h-screen bg-[#A9AECE] flex flex-col items-center justify-center relative px-2 sm:px-4">
			<img
				src="/images/myfinancelogo.png"
				alt="MyFinance Logo"
				className="
    absolute top-1 left-1 sm:top-8 sm:left-8 lg:top-12 lg:left-12
    w-20 h-20
    sm:w-20 sm:h-20
    md:w-36 md:h-36
    lg:w-40 lg:h-40
    shadow-lg rounded-full
    object-cover
  "
			/>

			{/* Centered Register header above the box */}
			<h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#1E1552] mb-8 w-full text-center z-10">
				Register
			</h1>

			<div className="bg-[#3A4483] opacity-75 rounded-2xl flex flex-col justify-center items-center border-4 border-[#29388A] w-full max-w-md sm:max-w-lg md:max-w-l px-4 py-8">
				<form className="w-full flex flex-col gap-1 sm:gap-4 md:gap-6">
					<input
						type="text"
						placeholder="Username"
						className="p-3 rounded-lg bg-[#3A4483] text-white outline-none w-full"
					/>
					<hr className="border-t-4 border-[#29388A] my-0 rounded" />
					<input
						type="password"
						placeholder="Password"
						className="p-3 rounded-lg bg-[#3A4483] text-white outline-none w-full"
					/>
					<hr className="border-t-4 border-[#29388A] my-0 rounded" />

					<input
						type="text"
						placeholder="email"
						className="p-3 rounded-lg bg-[#3A4483] text-white outline-none w-full"
					/>
					<hr className="border-t-4 border-[#29388A] my-0 rounded" />
					<input
						type="text"
						placeholder="Currency"
						className="p-3 rounded-lg bg-[#3A4483] text-white outline-none w-full"
					/>
					<hr className="border-t-4 border-[#29388A] my-0 rounded" />
					<input
						type="date"
						placeholder="Monthly Circle Date"
						className="p-3 rounded-lg bg-[#3A4483] text-white outline-none w-full"
					/>
					<hr className="border-t-4 border-[#29388A] my-0 rounded" />

					<button
						type="submit"
						className="mt-4 p-3 rounded-lg bg-[#1E1552] opacity-50 text-white font-bold hover:bg-[#18123d] hover:opacity-100 transition w-full"
					>
						Submit
					</button>
				</form>
				<p className="text-xs text-white mt-4 opacity-70 text-center">
					Do you have an account already?
					<Link
						href="/login"
						className="font-bold underline cursor-pointer hover:text-blue-200 ml-1"
					>
						Login
					</Link>
				</p>
			</div>
		</main>
	);
}
