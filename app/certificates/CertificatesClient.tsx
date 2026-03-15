"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, ChevronDown, ExternalLink } from "lucide-react";
import { formatUrl, getPricingLabel, type CertificateRecord } from "@/lib/certificate-utils";

type CertificatesClientProps = {
  certificates: CertificateRecord[];
};

export default function CertificatesClient({ certificates }: CertificatesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = certificates.map((cert) => cert.category).filter(Boolean) as string[];
    return [...new Set(cats)];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === "All") {
      return certificates;
    }

    return certificates.filter((cert) => cert.category === selectedCategory);
  }, [selectedCategory, certificates]);

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      <section className="relative px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Explore <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">Certificates</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-400 md:text-xl">
              Open each certificate page to see course name, platform, duration, course content, benefits, and whether the course is free or paid.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="appearance-none rounded-full border border-white/10 bg-gray-900 px-6 py-3 pr-12 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All" className="bg-gray-900 text-white">
                  All Categories
                </option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-900 text-white">
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((cert, index) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={cert.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10"
              >
                <Link href={`/certificates/${cert.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={
                        formatUrl(cert.imageUrl) ||
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      }
                      alt={cert.courseName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 backdrop-blur-md">
                      {cert.platform}
                    </div>
                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                      {getPricingLabel(cert.pricingType)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="mb-3 line-clamp-2 text-xl font-bold text-white">{cert.title}</h2>
                    <p className="mb-4 text-sm text-gray-400">{cert.courseName}</p>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400">{cert.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-300">
                      {cert.category && <span className="rounded-full bg-white/5 px-3 py-1">{cert.category}</span>}
                      {cert.duration && <span className="rounded-full bg-white/5 px-3 py-1">{cert.duration}</span>}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-4 border-t border-white/10 px-6 py-4">
                  <Link
                    href={`/certificates/${cert.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Open Full Details
                  </Link>
                  {cert.certificateUrl && (
                    <a
                      href={formatUrl(cert.certificateUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      View Certificate <ExternalLink size={16} />
                    </a>
                  )}
                  {cert.link && (
                    <a
                      href={formatUrl(cert.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
                    >
                      Official Link <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}

            {filteredCertificates.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-white/20 bg-white/5 py-20 text-center">
                <Award size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="mb-2 text-xl font-bold text-gray-300">No certificates found</h3>
                <p className="text-gray-500">No certificates match the selected category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
