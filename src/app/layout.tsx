import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { ToastProvider } from "../components/providers/ToastProvider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/providers/ReduxProvider";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

export const metadata: Metadata = {
	title: "EventWave - Create Unforgettable Experiences",
	description:
		"Transform your ideas into extraordinary events with EventWave. From intimate gatherings to grand celebrations.",
	keywords:
		"events, event management, tickets, conferences, celebrations, gatherings",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${poppins.variable}`}>
			<body className="font-sans bg-[#0A0A0B] text-white antialiased">
				<ReduxProvider>
					<ToastProvider />
					<Header />
					<main className="min-h-screen">{children}</main>
					<Toaster
						position="top-right"
						toastOptions={{
							style: {
								background: "#27272A",
								color: "#fff",
								boxShadow:
									"0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
								borderRadius: "0.75rem",
								fontSize: "0.875rem",
								border: "1px solid rgba(255, 255, 255, 0.1)",
							},
							success: {
								iconTheme: {
									primary: "#22C55E",
									secondary: "#27272A",
								},
							},
							error: {
								iconTheme: {
									primary: "#EF4444",
									secondary: "#27272A",
								},
							},
						}}
					/>
				</ReduxProvider>
			</body>
		</html>
	);
}
