import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CertificateHub",
  description: "Read the privacy policy of CertificateHub to understand how we handle and protect your information.",
  keywords: ["privacy policy", "certificate website privacy", "user data policy"],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | CertificateHub",
    description: "Read the privacy policy of CertificateHub to understand how we handle and protect your information.",
    url: "/privacy-policy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | CertificateHub",
    description: "Read how CertificateHub handles and protects your information.",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
