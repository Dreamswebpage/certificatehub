import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CertificateHub",
  description: "Read the privacy policy of CertificateHub to understand how we handle and protect your information.",
  openGraph: {
    title: "Privacy Policy | CertificateHub",
    description: "Read the privacy policy of CertificateHub to understand how we handle and protect your information.",
  }
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
