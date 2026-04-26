import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pratham Dupare",
  description: "Pratham Dupare — Software Developer building open-source tools, mobile apps, and web experiences. BS Mathematics, IISER Bhopal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-black text-gray-100 font-mono text-sm leading-relaxed min-h-screen">
        {children}
      </body>
    </html>
  );
}
