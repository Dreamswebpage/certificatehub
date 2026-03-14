"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center py-20">
      {/* background blobs */}
      <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        {/* heading */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-4"
          >
            Contact <span className="text-purple-400">Us</span>
          </motion.h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            If you have any questions, suggestions, partnership inquiries, or
            feedback, feel free to contact us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-purple-400" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-400">
                    cyberabhisharma@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-blue-400" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-400">+91 9680895044</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-indigo-400" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-400">
                    Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <textarea
                rows={4}
                placeholder="Your message"
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}