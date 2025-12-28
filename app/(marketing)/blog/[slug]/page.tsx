import { client } from "@/sanity/lib/client";
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import Avatar from '@/components/blog/avatar-comp'
import CoverImage from '@/components/blog/cover-image'
import DateComponent from '@/components/blog/date'
import MoreBlogs from '@/components/blog/more-blogs'
import PortableText from '@/components/blog/portable-text'

import { sanityFetch } from '@/sanity/lib/fetch'
import { postQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { type PortableTextBlock } from 'next-sanity'
import type { Post as SanityPost } from '@/sanity.types'
import { cn } from "@/lib/utils"

// Re-define the Post type to correctly type the author field
type Post = Omit<SanityPost, 'author' | 'mainImage' | 'body'> & {
  author?: { name?: string; picture?: string }
  body: PortableTextBlock[]
  coverImage?: string
  date?: string
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = (await sanityFetch({ query: postQuery, params: await params, stega: false })) as Post

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.description,
  } satisfies Metadata
}

export async function generateStaticParams() {
  return (await sanityFetch({ query: postSlugsQuery, perspective: 'published', stega: false })) as SanityPost[]
}

export default async function PostPage({ params }: Props) {
  const post = (await sanityFetch({ query: postQuery, params: await params })) as Post

  if (!post?._id) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
        {/* Inject fonts locally to ensure this page looks right even in isolation */}
        <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
            .font-primary { font-family: 'Manrope', sans-serif; }
            .font-tech { font-family: 'Space Grotesk', monospace; }
        `}} />

        <article className="relative pt-32 pb-20 px-6">
             {/* 1. Cinematic Header */}
             <header className="mx-auto max-w-4xl text-center mb-16 space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>
                    <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        Blog Post
                    </span>
                 </div>
                 
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-primary text-balance text-neutral-900 dark:text-white">
                    {post.title}
                 </h1>

                 {/* Meta Data Row */}
                 <div className="flex flex-wrap items-center justify-center gap-6">
                    {post.author?.picture && (
                        <div className="flex items-center gap-3">
                           {/* Wrapping Avatar in a standardized container */}
                           <div className="scale-90 transform">
                             <Avatar name={post.author.name} src={post.author.picture} />
                           </div>
                        </div>
                    )}
                    <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-white/20"/>
                    <div className="font-tech text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        <DateComponent dateString={post.date} />
                    </div>
                 </div>
             </header>

             {/* 2. Immersive Cover Image */}
             <div className="mx-auto max-w-7xl mb-24 relative">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-neutral-200 dark:border-white/10 shadow-2xl bg-neutral-100 dark:bg-white/5">
                    {post.coverImage && <CoverImage src={post.coverImage} priority />}
                    
                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem] pointer-events-none" />
                </div>
             </div>

             {/* 3. Article Body */}
             <div className="mx-auto max-w-3xl">
                <div className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-primary prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900 dark:prose-headings:text-white
                    prose-p:font-primary prose-p:leading-8 prose-p:text-neutral-600 dark:prose-p:text-neutral-300
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:font-bold prose-strong:text-neutral-900 dark:prose-strong:text-white
                    prose-code:font-tech prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-600 dark:prose-code:text-blue-400
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300
                    prose-li:text-neutral-600 dark:prose-li:text-neutral-300
                    marker:text-blue-500
                ">
                    {post.body?.length && (
                        <PortableText
                            className=""
                            value={post.body as PortableTextBlock[]}
                        />
                    )}
                </div>
             </div>
        </article>

        {/* 4. Footer / Read More Area */}
        <aside className="border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#080808] py-24 mt-12">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-px w-6 bg-blue-500" />
                            <span className="text-xs font-tech font-bold uppercase tracking-widest text-blue-500">Read Next</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-primary tracking-tight text-neutral-900 dark:text-white">
                            More from the Blog
                        </h2>
                    </div>
                    <Link href="/blog" className="group flex items-center gap-2 text-sm font-bold font-tech uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                        View All Posts
                        <span className="block h-px w-4 bg-current transition-all group-hover:w-8" />
                    </Link>
                </div>
                
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-96 w-full bg-neutral-200 dark:bg-white/5 animate-pulse rounded-3xl"/>
                        <div className="h-96 w-full bg-neutral-200 dark:bg-white/5 animate-pulse rounded-3xl"/>
                    </div>
                }>
                    <MoreBlogs skip={post._id} limit={2} />
                </Suspense>
            </div>
        </aside>
    </div>
  )
}