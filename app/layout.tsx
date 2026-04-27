import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Регистрация — Conf 2026",
  description: "Регистрация участников конференции",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
