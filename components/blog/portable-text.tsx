import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";

// --- Font Styles (Injected locally to ensure isolation) ---
const BlogFonts = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-blog-primary { font-family: 'Manrope', sans-serif; }
    .font-blog-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return (
          <div className="my-8 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 shadow-lg">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.url}
              alt={value.alt || "Blog Image"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="mt-12 mb-6 text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white font-blog-primary">
            {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-blog-primary relative inline-block">
            {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-4 text-2xl font-semibold text-neutral-900 dark:text-white font-blog-primary">
            {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-6 mb-3 text-xl font-semibold text-neutral-900 dark:text-white font-blog-primary">
            {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="mb-2 text-lg font-semibold font-blog-tech text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
            {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-sm font-semibold font-blog-tech text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className="mb-6 leading-8 text-lg text-neutral-600 dark:text-neutral-300 font-blog-primary">
            {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-blue-500 pl-6 py-2 italic text-xl text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-white/5 rounded-r-lg font-blog-primary">
          "{children}"
        </blockquote>
      ),
    },
    marks: {
      // --- The Link Preview Enhancement ---
      link: ({ children, value }) => {
        return (
          <LinkPreview 
            url={value?.href} 
            // Added 'break-all' to force long URLs to wrap and prevent overflow
            className="text-blue-600 dark:text-blue-400 font-semibold decoration-blue-300/30 underline-offset-4 break-all"
          >
            {children}
          </LinkPreview>
        );
      },
      code: ({ children }) => (
        <code className="bg-neutral-100 dark:bg-neutral-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-blog-tech font-medium border border-neutral-200 dark:border-neutral-700 break-words">
            {children}
        </code>
      ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-600 dark:text-neutral-300 font-blog-primary marker:text-blue-500">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-600 dark:text-neutral-300 font-blog-primary marker:text-blue-500">{children}</ol>,
    }
  };

  return (
    <div className={cn(
        "prose prose-lg dark:prose-invert max-w-none font-blog-primary",
        className
    )}>
      <BlogFonts />
      <PortableText components={components} value={value} />
    </div>
  );
}