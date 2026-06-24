import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Travel Blog", description: "Travel guides, tips, and trip cost breakdowns." };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Travel Blog</h1>
      <p className="mt-2 text-slate-600">Guides, budgets, and tips for your next trip.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.length === 0 && (
          <p className="text-sm text-slate-500">No posts yet. Add some via the Admin Panel → Manage Blogs.</p>
        )}
        {posts.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardContent className="pt-6">
                <CardTitle className="text-base">{p.title}</CardTitle>
                <p className="mt-2 text-sm text-slate-500">{p.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
