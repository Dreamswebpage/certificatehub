"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Filter, ChevronDown } from "lucide-react";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const formatUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setFilteredCertificates(data);
        // Extract unique categories
        const cats = data.map((cert: any) => cert.category).filter((cat: any) => cat) as string[];
        const uniqueCategories = [...new Set(cats)];
        setCategories(uniqueCategories);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter(cert => cert.category === selectedCategory));
    }
  }, [selectedCategory, certificates]);

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      {/* Header */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">Certificates</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Explore our complete collection of verified achievements across various platforms and categories.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none backdrop-blur-sm"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={cert.id}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={formatUrl(cert.imageUrl) || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-300">
                    {cert.platform}
                  </div>
                  {cert.category && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-300">
                      {cert.category}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{cert.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {cert.certificateUrl && (
                      <a
                        href={formatUrl(cert.certificateUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Certificate <ExternalLink size={16} />
                      </a>
                    )}
                    {cert.link && (
                      <a
                        href={formatUrl(cert.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Verify Certificate <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredCertificates.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-2xl bg-white/5">
                <Award size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-300 mb-2">No certificates found</h3>
                <p className="text-gray-500">No certificates match the selected category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}