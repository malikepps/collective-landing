import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collective - Empowering Nonprofits Through Technology",
  description: "Collective is a modern platform that connects nonprofits with technology solutions, volunteers, and resources to amplify their impact and drive positive change in communities worldwide.",
  keywords: "nonprofit, technology, volunteer, community, social impact, collective",
  authors: [{ name: "Collective" }],
  openGraph: {
    title: "Collective - Empowering Nonprofits Through Technology",
    description: "Connect nonprofits with technology solutions, volunteers, and resources to amplify their impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
