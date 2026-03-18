import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Data Analyzer",
  description: "Upload CSV data and get instant automated analysis and charts."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
