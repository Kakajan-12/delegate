import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hebent Registration",
  description: "Registration Platform for Turkmen - Chinese",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hebent Reg",
  },
};

export const viewport: Viewport = {
  themeColor: "#E97B27",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ru">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
      </html>
  );
}