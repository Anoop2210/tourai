import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } }).catch(() => null);
  return { title: post?.title ?? "Blog Post", description: post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
      <div className="prose prose-slate mt-6 max-w-none whitespace-pre-wrap text-slate-700">{post.content}</div>
    </article>
  );
}