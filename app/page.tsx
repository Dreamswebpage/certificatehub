import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const homeTitle = "Free Cyber Security Certification 2026 | Cisco, Google, AWS Certificates";
const homeDescription =
  "Discover free and paid certificates with full course details, official links, duration, benefits, and SEO-friendly certificate pages for Cisco, Google, AWS, and more.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "free cyber security certification 2026",
    "cisco free networking certificate",
    "google data analytics certificate free",
    "aws cloud practitioner certificate",
    "online certificates",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  return <HomeClient />;
}
