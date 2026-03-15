import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CertFinder",
  description: "Get in touch with CertFinder for inquiries, partnerships, or support regarding online certificates.",
  keywords: ["contact CertFinder", "certificate support", "certificate inquiry"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | CertFinder",
    description: "Get in touch with CertFinder for inquiries, partnerships, or support regarding online certificates.",
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | CertFinder",
    description: "Contact CertFinder for support, partnerships, and certificate-related questions.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
