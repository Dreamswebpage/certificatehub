import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientEnhancements from "./components/ClientEnhancements";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://certfinder.vercel.app"),
  title: {
    default: "CertFinder - Discover Online Certificates",
    template: "%s | CertFinder",
  },
  description: "Discover valuable online certificates from trusted platforms. Verify your achievements and build your portfolio.",
  keywords: ["online certificates", "cybersecurity", "courses", "education", "portfolio", "IT certifications"],
  authors: [{ name: "Abhishek Sharma" }],
  creator: "Abhishek Sharma",
  publisher: "Abhishek Sharma",
  openGraph: {
    title: "CertFinder - Discover Online Certificates",
    description: "Discover valuable online certificates from trusted platforms. Verify your achievements and build your portfolio.",
    type: "website",
    siteName: "CertFinder",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} antialiased bg-[#0e0e1a] text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <ClientEnhancements />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5278574901328003"
     crossOrigin="anonymous"></script>
    </html>
  );
}
