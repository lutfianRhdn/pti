import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import "@fortawesome/fontawesome-svg-core/styles.css";

// IDENTITAS KELOMPOK
// Kelas : IF-4

// Nama : Lutian Rahdiansyah
// NIM : 10121127

// Nama : Muhammad Fariz Hartawan
// NIM : 10121143

// Nama : Asifa Lestari
// NIM : 10121142

// Nama : Edwin Liona Jaya
// NIM    : 10121154

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
	}) {
	const bgImage = '/assets/images/bg.png';
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>

				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col min-h-screen " style={{
						backgroundImage: `url(${bgImage})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundAttachment:"fixed",
						opacity: 0.9,
					}}>
							{children}						
					</div>
				</Providers>
			</body>
		</html>
	);
}
