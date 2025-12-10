import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Emma 💛",
  description: "A special game for our first date",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💅</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💅</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Game of Emma 💛",
    description: "A special game for our first date",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Game of Emma",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Game of Emma 💛",
    description: "A special game for our first date",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Emma 💛",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FFC629",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
