import { sanityFetch } from "@/sanity/lib/fetch";
import { moreBlogsQuery } from "@/sanity/lib/queries";
import type { MoreBlogsQueryResult } from '@/sanity.types'
import { BlogCard } from "./blog-card";

// --- Font Styles (Injected locally to ensure isolation) ---
const BlogFonts = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-blog-primary { font-family: 'Manrope', sans-serif; }
    .font-blog-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

export default async function MoreBlogs({ skip, limit }: { skip: string; limit: number }) {
  const posts = await sanityFetch({
    query: moreBlogsQuery, 
    params: { skip, limit },
    stega: false,
  });

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 border-t border-neutral-200 dark:border-white/10 font-blog-primary">
         <BlogFonts />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center mb-2">
                <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
               No more articles found
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                Check back later for more updates from our team.
            </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 font-blog-primary">
      <BlogFonts />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post: MoreBlogsQueryResult[number]) => (
          post.slug ? <BlogCard key={post.slug} post={post} /> : null
        ))}
      </div>
    </section>
  );
}