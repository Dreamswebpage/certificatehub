import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CertFinder",
  description: "Learn more about CertFinder, our mission, and how we help learners discover valuable online certificates from globally recognized platforms.",
  openGraph: {
    title: "About Us | CertFinder",
    description: "Learn more about CertFinder, our mission, and how we help learners discover valuable online certificates.",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
