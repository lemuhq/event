"use client";

import { useAppSelector } from "@/hooks/useReduxHooks";
import { selectAuth } from "@/redux/slices/authSlice";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { user: currentUser } = useAppSelector(selectAuth);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Left side - Logo */}
					<div className="flex items-center">
						<Link href="/" className="text-white font-semibold text-lg">
							EventWave
						</Link>
					</div>

					{/* Right side - Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<div className="flex items-center gap-2">
							<span className="text-neutral-400 text-sm">
								14:41 GMT+1
							</span>
						</div>
						<Link
							href="/explore"
							className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1"
						>
							Explore Events
							<svg
								className="w-4 h-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									d="M7 17L17 7M17 7H7M17 7V17"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
						{!currentUser && (
							<Link
								href="/signin"
								className="text-neutral-400 hover:text-white transition-colors text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
							>
								Sign In
							</Link>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							type="button"
							className="text-neutral-400 hover:text-white"
							onClick={() => setIsOpen(!isOpen)}
						>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? (
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							) : (
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isOpen && (
					<div className="md:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							<Link
								href="/explore"
								className="block text-neutral-400 hover:text-white transition-colors text-sm py-2"
								onClick={() => setIsOpen(false)}
							>
								Explore Events
							</Link>
							<Link
								href="/signin"
								className="block text-neutral-400 hover:text-white transition-colors text-sm py-2"
								onClick={() => setIsOpen(false)}
							>
								Sign In
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
