import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CertFinder",
  description: "Get in touch with CertFinder for inquiries, partnerships, or support regarding online certificates.",
  openGraph: {
    title: "Contact Us | CertFinder",
    description: "Get in touch with CertFinder for inquiries, partnerships, or support regarding online certificates.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
