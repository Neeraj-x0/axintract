import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import PropTypes from "prop-types";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata = {
  title: "Axintract",
  description: "Leads Management System",
};

const PUBLISHABLE_KEY =
  "pk_test_Z3Jvd2luZy1kb2xwaGluLTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/" publishableKey={PUBLISHABLE_KEY}>
      <html lang="en" className="h-full bg-white">
        <body
          className={`${geistSans.variable} ${comfortaa.variable} ${geistMono.variable} antialiased text-gray-900 bg-white dark:text-white`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
