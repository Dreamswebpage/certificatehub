"use client";

import { motion } from "framer-motion";
import { BookOpen, MapPin, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden min-h-[80vh] py-20 pb-32">
      <div className="absolute top-[30%] left-[10%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6 backdrop-blur-sm">
            Welcome to CertFinder
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Us</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Discover valuable online certificates from trusted and globally recognized platforms.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Our Platform</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website is designed to help learners discover valuable online certificates from trusted and globally recognized platforms. We collect and organize certification information from various well-known learning platforms such as EC-Council, Cisco, Great Learning, and other professional education providers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our goal is to make it easier for students, professionals, and technology enthusiasts to find the best certifications in different fields such as cybersecurity, networking, programming, artificial intelligence, cloud computing, and many more.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We do not issue certificates ourselves. Instead, we provide information about certification programs and direct users to the official platforms where they can enroll and obtain their certificates.
            </p>

            <div className="bg-black/30 p-8 rounded-2xl border border-white/5 space-y-4 my-8">
              <h3 className="text-lg font-bold flex items-center gap-2"><Award className="text-purple-400" /> Our Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our mission is to create a simple and reliable directory where users can explore certification opportunities, compare options, and access official resources easily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Contact</h4>
                  <p className="text-sm text-gray-400">cyberabhisharma@gmail.com</p>
                  <p className="text-sm text-gray-400">+91 9680895044</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p className="text-sm text-gray-400">Jaipur, Rajasthan</p>
                  <p className="text-sm text-gray-400">India</p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-8 italic text-center">
              If you have any questions, suggestions, or collaboration inquiries, feel free to contact us.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
