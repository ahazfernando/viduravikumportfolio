import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordan — Web Developer & Software Engineer",
  description:
    "Portfolio of Jordan — building full-stack web applications, scalable systems and modern digital experiences.",
  openGraph: {
    title: "Jordan — Web Developer & Software Engineer",
    description: "Building full-stack web applications and modern digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
