"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Database, Link as LinkIcon, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden min-h-[80vh] py-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Policy</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy document explains how we collect, use, and protect your information when you visit our website.
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
              <Eye className="text-blue-400" /> Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may collect basic information such as:
            </p>
            <ul className="list-disc pl-6 text-gray-300">
              <li>Name</li>
              <li>Email address</li>
              <li>Any information you voluntarily provide through contact forms.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <Database className="text-blue-400" /> How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The information we collect may be used for responding to your inquiries, improving our website, and providing better user experience. We do not sell, trade, or rent users&apos; personal information to others.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <LinkIcon className="text-blue-400" /> Third-Party Links
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may contain links to external websites or certification providers. We are not responsible for the privacy practices or content of those websites.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
              <Lock className="text-blue-400" /> Data Security & Consent
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We take reasonable measures to protect your personal information from unauthorized access or misuse. By using our website, you agree to our Privacy Policy.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 p-6 rounded-2xl flex flex-col gap-2 items-start mt-8">
            <h3 className="font-bold flex items-center gap-2"><Shield className="text-blue-400" /> Contact for Privacy</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              If you have any questions regarding this Privacy Policy, please contact us:
            </p>
            <p className="text-sm text-gray-300"><strong>Email:</strong> cyberabhisharma@gmail.com</p>
            <p className="text-sm text-gray-300"><strong>Phone:</strong> +91 9680895044</p>
            <p className="text-sm text-gray-300"><strong>Location:</strong> Jaipur, Rajasthan, India</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
