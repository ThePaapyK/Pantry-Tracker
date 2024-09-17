import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kichin - track your groceries",
  description: "Track your groceries with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
	    <link
          rel="icon"
          href="/images/carrot.png"
          sizes="any"
        />
	    {children}</body>
    </html>
  );
}
