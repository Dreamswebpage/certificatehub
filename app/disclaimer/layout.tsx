import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | CertFinder",
  description: "Read the disclaimer for CertFinder regarding the third-party certification programs listed on our platform.",
  keywords: ["CertFinder disclaimer", "third-party certificates disclaimer", "certificate listing disclaimer"],
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | CertFinder",
    description: "Read the disclaimer for CertFinder.",
    url: "/disclaimer",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer | CertFinder",
    description: "Read the disclaimer for third-party certificate listings on CertFinder.",
  },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
