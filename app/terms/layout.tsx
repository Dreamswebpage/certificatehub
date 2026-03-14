import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | CertFinder",
  description: "Review the terms and conditions for accessing and using the CertFinder platform.",
  openGraph: {
    title: "Terms and Conditions | CertFinder",
    description: "Review the terms and conditions for accessing and using the CertFinder platform.",
  }
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
