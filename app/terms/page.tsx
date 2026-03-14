"use client";

import { motion } from "framer-motion";
import { Scale, FileText, CheckSquare, AlertCircle } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="relative overflow-hidden min-h-[80vh] py-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm">
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Conditions</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.
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
              <Scale className="text-indigo-400" /> Use of the Website
            </h2>
            <p className="text-gray-300 leading-relaxed">
              This website provides information about certification programs offered by third-party educational platforms. Users agree to use the website for lawful purposes only and not for any activity that may harm the website or other users.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <CheckSquare className="text-indigo-400" /> Third-Party Services
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may contain links to external websites and certification providers. We do not control or guarantee the services, content, or policies of those external platforms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <FileText className="text-indigo-400" /> Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All trademarks, logos, certification names, and brand references belong to their respective owners. They are used on this website only for informational purposes.
            </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <AlertCircle className="text-indigo-400" /> Limitation of Liability & Changes
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We are not responsible for any losses, damages, or issues that may arise from the use of information provided on this website or from third-party platforms. We reserve the right to modify or update these terms at any time without prior notice. By continuing to use this website, you agree to the updated terms and conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
