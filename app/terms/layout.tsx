import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | CertFinder",
  description: "Review the terms and conditions for accessing and using the CertFinder platform.",
  keywords: ["terms and conditions", "CertFinder terms", "certificate platform terms"],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions | CertFinder",
    description: "Review the terms and conditions for accessing and using the CertFinder platform.",
    url: "/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions | CertFinder",
    description: "Review the terms and conditions for using CertFinder.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
