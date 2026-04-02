import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, FolderTree, Search, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatUrl } from "@/lib/certificate-utils";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const [popularCertificates, latestBlogs, categories, totalCertificates, totalPublishedBlogs] = await Promise.all([
    prisma.certificate.findMany({
      include: {
        categoryRecord: true,
      },
      orderBy: [{ viewCount: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.category.findMany({
      include: {
        _count: {
          select: {
            certificates: true,
          },
        },
      },
      orderBy: [{ certificates: { _count: "desc" } }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.certificate.count(),
    prisma.blog.count({
      where: {
        published: true,
      },
    }),
  ]);

  return (
    <div className="relative overflow-hidden bg-[#0b1120] text-white">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.18),_transparent_35%)]" />

      <section className="relative px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                <ShieldCheck size={16} />
                Verified certificate discovery platform
              </div>
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
                Find the right certificate,
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  faster and smarter
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Explore trusted certificate opportunities with clean course pages, category navigation, official links, and SEO-optimized content for learners and professionals.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="#popular-certificates" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-slate-100">
                  Browse Popular Certificates
                  <ArrowRight size={18} />
                </Link>
                <Link href="/blog" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10">
                  Read Latest Blog
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Platform Snapshot</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-4xl font-black">{totalCertificates}+</p>
                    <p className="mt-2 text-sm text-slate-400">Certificates indexed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black">{totalPublishedBlogs}+</p>
                    <p className="mt-2 text-sm text-slate-400">Fresh blog posts</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black">{categories.length}+</p>
                    <p className="mt-2 text-sm text-slate-400">Top categories</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Popular</p>
                <p className="mt-4 text-2xl font-bold">Top certificates ranked by views</p>
                <p className="mt-3 text-sm text-slate-300">Server-rendered popular cards help users discover the most visited certificate pages quickly.</p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-400/10 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-200">SEO Ready</p>
                <p className="mt-4 text-2xl font-bold">Better internal linking</p>
                <p className="mt-3 text-sm text-slate-300">Homepage now connects certificates, blogs, and categories through clear content hubs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Search Section</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Search certificates instantly</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Search by course name, provider, or category and jump straight to the right certificate pages.
              </p>
            </div>

            <form action="/certificates" method="get" className="w-full max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search certificates, providers, or categories"
                    className="w-full rounded-full border border-white/10 bg-slate-950/70 py-4 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>
                <button type="submit" className="rounded-full bg-cyan-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Search Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="popular-certificates" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Popular Certificates</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Most viewed certificate pages</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Discover the certificate opportunities learners are exploring the most right now.
              </p>
            </div>
            <Link href="/certificates" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View All Certificates
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {popularCertificates.map((certificate) => (
              <article key={certificate.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition hover:bg-white/10">
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={
                      formatUrl(certificate.imageUrl) ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                    }
                    alt={certificate.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                    {certificate.platform}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="line-clamp-2 text-2xl font-bold">{certificate.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">Provider: {certificate.platform}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Duration: {certificate.duration || "Self-paced"}</span>
                  </div>
                  <Link href={`/certificates/${certificate.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400">
                    View Certificate
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Latest Blog</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Fresh articles from the blog</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Stay updated with practical guides, certification insights, and learning tips from the latest published posts.
              </p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View All Blogs
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {latestBlogs.map((blog) => (
              <article key={blog.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.25em] text-violet-200">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-4 line-clamp-2 text-2xl font-bold">{blog.title}</h3>
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-300">{blog.metaDescription}</p>
                <Link href={`/blog/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                  Read More
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Categories</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Browse by category</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Jump into focused collections like cybersecurity, cloud, data, and more with clean internal linking to category landing pages.
              </p>
            </div>
            <Link href="/certificates" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore All Categories
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex rounded-2xl bg-emerald-500/15 p-3 text-emerald-200">
                      <FolderTree size={20} />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">{category.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {category.description || `Browse all ${category.name.toLowerCase()} certificate opportunities in one place.`}
                    </p>
                  </div>
                  <ArrowRight size={20} className="mt-1 text-emerald-200 transition group-hover:translate-x-1" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-sm text-emerald-200">
                  <Clock3 size={16} />
                  {category._count.certificates} certificates
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
