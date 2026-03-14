"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BookOpen, ShieldAlert } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="relative overflow-hidden min-h-[80vh] py-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-6 backdrop-blur-sm">
            Important Notice
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Disclaimer</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            The information provided on this website is for general informational and educational purposes only.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <BookOpen className="text-orange-400" /> Informational Platform
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our website acts as a third-party informational platform that lists certification programs from various external providers such as EC-Council, Cisco, Great Learning, and other educational platforms. We do not own, operate, or issue any certificates listed on this website. All certificates are issued directly by their respective organizations or platforms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <ShieldAlert className="text-orange-400" /> Trademarks & Accuracy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All trademarks, logos, brand names, and certification titles belong to their respective owners. We mention these names only for identification and informational purposes. While we try to keep all information accurate and updated, we do not guarantee the completeness, reliability, or accuracy of the information provided. Users are advised to visit the official websites of the certification providers for the most accurate and updated information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <AlertTriangle className="text-orange-400" /> Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By using this website, you acknowledge that we are not responsible for any decisions, enrollments, purchases, or actions taken based on the information provided here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
