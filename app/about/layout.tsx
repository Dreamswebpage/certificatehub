import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CertFinder",
  description: "Learn more about CertFinder, our mission, and how we help learners discover valuable online certificates from globally recognized platforms.",
  keywords: ["about CertFinder", "certificate directory", "online certification platform"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | CertFinder",
    description: "Learn more about CertFinder, our mission, and how we help learners discover valuable online certificates.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About Us | CertFinder",
    description: "Learn more about CertFinder and our certificate discovery platform.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
