import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Intelligence System",
  description: "Upload PDFs and get summaries, topics, and grounded answers."
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
