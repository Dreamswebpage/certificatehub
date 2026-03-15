"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatUrl, getPricingLabel, type CertificateRecord } from "@/lib/certificate-utils";

export default function HomeClient() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then(setCertificates)
      .catch(console.error);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[5%] w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            Certificate Discovery Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 leading-tight pb-2">Certificates</span>
            <br /> Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Portfolio</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover and verify your professional certificates from various platforms in one centralized location. Build your portfolio with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#certificates" className="group px-8 py-4 rounded-full bg-white text-dark font-semibold text-lg hover:shadow-xl hover:shadow-white/20 transition-all flex items-center gap-2 bg-gradient-to-r hover:from-white hover:to-gray-200 text-black">
              View Certificates <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl w-full relative z-10"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl mx-auto flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{certificates.length}+</h3>
            <p className="text-sm text-gray-400">Certificates</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl mx-auto flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
            <p className="text-sm text-gray-400">Authentic</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl mx-auto flex items-center justify-center mb-4">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">24/7</h3>
            <p className="text-sm text-gray-400">Verification</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center flex flex-col justify-center">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Secured with</h3>
            <p className="font-mono mt-2 text-xl tracking-widest text-white/80">JWT & AES</p>
          </div>
        </motion.div>
      </section>

      <section id="certificates" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Certificates</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Explore our latest verified achievements across multiple trusted platforms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.slice(0, 3).map((cert, index) => (
              <motion.div
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
                      src={formatUrl(cert.imageUrl) || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                      alt={cert.title}
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
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white">{cert.title}</h3>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400">{cert.description}</p>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-4 border-t border-white/10 px-6 py-4">
                  <Link href={`/certificates/${cert.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
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
                </div>
              </motion.div>
            ))}

            {certificates.length > 3 && (
              <div className="col-span-full flex justify-center mt-8">
                <Link href="/certificates" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-purple-500 hover:to-blue-500 transition shadow-lg shadow-purple-500/20 flex items-center gap-2 font-medium">
                  Show More Certificates <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {certificates.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-2xl bg-white/5">
                <Award size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-300 mb-2">No certificates found</h3>
                <p className="text-gray-500">Wait for the admin to add new achievements.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
