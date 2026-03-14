import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | CertFinder",
  description: "Read the disclaimer for CertFinder regarding the third-party certification programs listed on our platform.",
  openGraph: {
    title: "Disclaimer | CertFinder",
    description: "Read the disclaimer for CertFinder.",
  }
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
