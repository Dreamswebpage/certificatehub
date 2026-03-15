"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, List, Search, LogOut, ShieldCheck, Home, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { buildDefaultTitle, formatUrl, slugify, type CertificateRecord, type PricingType } from "@/lib/certificate-utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [courseName, setCourseName] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [pricingType, setPricingType] = useState<PricingType>("FREE");
  const [courseContent, setCourseContent] = useState("");
  const [benefits, setBenefits] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("list");

  const router = useRouter();

  async function fetchCertificates() {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(data);
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.role === "ADMIN") {
          setIsAuthenticated(true);
          fetchCertificates();
        }
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCourseName("");
    setPlatform("");
    setCategory("");
    setDuration("");
    setPricingType("FREE");
    setCourseContent("");
    setBenefits("");
    setCertificateUrl("");
    setDescription("");
    setImageUrl("");
    setLink("");
    setMetaTitle("");
    setMetaDescription("");
    setKeywords("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, requestedRole: "ADMIN" }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      fetchCertificates();
    } else {
      alert("Invalid admin credentials");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!editingId;
    const method = isEditing ? "PUT" : "POST";
    const bodyObj = {
      id: editingId,
      title,
      slug,
      courseName,
      platform,
      category,
      duration,
      pricingType,
      courseContent,
      benefits,
      certificateUrl,
      description,
      imageUrl,
      link,
      metaTitle,
      metaDescription,
      keywords,
    };

    const res = await fetch("/api/certificates", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    });

    if (res.ok) {
      resetForm();
      fetchCertificates();
      setActiveTab("list");
      alert(isEditing ? "Updated Successfully!" : "Added Successfully!");
    } else {
      alert("Failed to save certificate");
    }
  };

  const handleEdit = (cert: CertificateRecord) => {
    setEditingId(cert.id);
    setTitle(cert.title);
    setSlug(cert.slug || "");
    setCourseName(cert.courseName || "");
    setPlatform(cert.platform);
    setCategory(cert.category || "");
    setDuration(cert.duration || "");
    setPricingType(cert.pricingType === "PAID" ? "PAID" : "FREE");
    setCourseContent(cert.courseContent || "");
    setBenefits(cert.benefits || "");
    setCertificateUrl(cert.certificateUrl || "");
    setDescription(cert.description || "");
    setImageUrl(cert.imageUrl || "");
    setLink(cert.link || "");
    setMetaTitle(cert.metaTitle || "");
    setMetaDescription(cert.metaDescription || "");
    setKeywords(cert.keywords || "");
    setActiveTab("add");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    const res = await fetch("/api/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("Deleted successfully!");
      fetchCertificates();
    } else {
      alert("Failed to delete certificate");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0e0e1a] flex items-center justify-center text-white"><div className="w-8 h-8 rounded-full border-4 border-t-purple-500 border-white/10 animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0e1a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-sm relative z-10"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShieldCheck size={32} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-center text-white pb-6">Secure Admin Portal</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                placeholder="admin@coursehub.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl font-medium hover:from-purple-500 hover:to-blue-500 transition shadow-lg shadow-purple-500/20 mt-4"
            >
              Verify Authority
            </button>
          </form>
          
          <Link href="/" className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400 hover:text-white transition">
            <Home size={14} /> Back to Website
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl flex flex-col h-full z-20">
        <div className="p-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
               <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Admin<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Portal</span></h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Authority Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab("list")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "list" ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <List size={18} /> Certificates
          </button>
          <button 
            onClick={() => {
              setActiveTab("add");
              resetForm();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === "add" ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Plus size={18} /> Add New
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">
            <Home size={18} /> View Site
          </a>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition">
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === "add" ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
                {editingId ? <Edit className="text-blue-400" /> : <Plus className="text-purple-400" />} 
                {editingId ? "Edit Certificate" : "Issue Verified Certificate"}
              </h2>
              <form onSubmit={handleAddCertificate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Course Name</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => {
                      const nextCourseName = e.target.value;
                      setCourseName(nextCourseName);
                      if (!editingId || !slug) {
                        setSlug(slugify(nextCourseName));
                      }
                      if (!title || title === buildDefaultTitle(courseName, pricingType)) {
                        setTitle(buildDefaultTitle(nextCourseName, pricingType));
                      }
                    }}
                    required
                    className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition"
                    placeholder="e.g. Cisco Cybersecurity"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Certificate Title / Heading</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition"
                    placeholder="e.g. Free Cisco Cybersecurity Certificate (2026) - Apply Now"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(slugify(e.target.value))}
                    required
                    className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition"
                    placeholder="cisco-cybersecurity"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Issuing Platform</label>
                  <input type="text" value={platform} onChange={e => setPlatform(e.target.value)} required className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="e.g. Coursera, Udemy" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition">
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Duration</label>
                  <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="e.g. 6 weeks" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Pricing Type</label>
                  <select
                    value={pricingType}
                    onChange={(e) => {
                      const nextPricingType = e.target.value as PricingType;
                      setPricingType(nextPricingType);
                      if (!title || title === buildDefaultTitle(courseName, pricingType)) {
                        setTitle(buildDefaultTitle(courseName, nextPricingType));
                      }
                    }}
                    className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition"
                  >
                    <option value="FREE">Free</option>
                    <option value="PAID">Paid</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Image URL</label>
                  <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="https://" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Short Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition h-28 resize-none" placeholder="Short intro for listing card and page hero"></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Certificate URL</label>
                  <input type="url" value={certificateUrl} onChange={e => setCertificateUrl(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="https://" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Official Course Link</label>
                  <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="https://" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Course Content</label>
                  <textarea value={courseContent} onChange={e => setCourseContent(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition h-32 resize-none" placeholder={"One point per line\nNetwork security basics\nThreat detection fundamentals"}></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Course Benefits</label>
                  <textarea value={benefits} onChange={e => setBenefits(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition h-32 resize-none" placeholder={"One benefit per line\nIndustry-recognized credential\nBeginner-friendly learning path"}></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Meta Title (Optional)</label>
                  <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="Blank chhodne par auto-generate hoga" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Meta Description (Optional)</label>
                  <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition h-28 resize-none" placeholder="Blank chhodne par auto-generate hoga"></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Keywords (Optional)</label>
                  <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} className="w-full bg-black/30 border border-white/10 focus:border-purple-500 p-3 rounded-xl text-white outline-none transition" placeholder="Blank chhodne par auto-generate hoga" />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
                  {editingId && (
                    <button type="button" onClick={() => { resetForm(); setActiveTab("list"); }} className="border border-white/10 bg-white/5 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition flex items-center gap-2 font-medium">
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-500 hover:to-blue-500 transition shadow-lg shadow-purple-500/25 flex items-center gap-2 font-medium">
                    <ShieldCheck size={18} /> {editingId ? "Save Changes" : "Authenticate & Issue"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h2 className="text-2xl font-bold flex items-center gap-2"><List className="text-blue-400" /> Database Registry</h2>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search registry..." className="bg-black/30 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-64 transition" />
                </div>
              </div>
              
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="group bg-black/30 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-black/50 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                        {cert.imageUrl ? <img src={formatUrl(cert.imageUrl)} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-purple-900/20"></div>}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-200">{cert.title}</h3>
                        <p className="text-xs text-purple-400 font-medium uppercase tracking-wider">{cert.platform}</p>
                        <p className="text-xs text-gray-500">{`/${cert.slug} • ${cert.pricingType}`}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {cert.slug && <a href={`/certificates/${cert.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 bg-white/5 rounded-lg text-gray-400 hover:text-white transition" title="Open"><Home size={16} /></a>}
                      {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 bg-white/5 rounded-lg text-gray-400 hover:text-white transition" title="Verify"><ShieldCheck size={16} /></a>}
                      <button onClick={() => handleEdit(cert)} className="p-2 border border-blue-500/30 bg-blue-500/10 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500 transition" title="Edit"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(cert.id)} className="p-2 border border-red-500/30 bg-red-500/10 rounded-lg text-red-400 hover:text-white hover:bg-red-500 transition" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                {certificates.length === 0 && <p className="text-gray-500 text-center py-10 italic">Registry is currently empty. Issue a new certificate to begin.</p>}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
