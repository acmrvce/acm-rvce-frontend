import { sanityFetch } from "@/sanity/lib/fetch";
import { eventQuery, eventSlugsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PortableTextBlock } from "next-sanity";
import { Calendar, MapPin, Ticket } from "lucide-react";

import Avatar from "@/components/blog/avatar-comp";
import DateComponent from "@/components/blog/date";
import PortableText from "@/components/blog/portable-text";
import MoreEvents from "@/components/events/more-events";
import type { Event as SanityEvent } from "@/sanity.types";

// Re-define the Event type to correctly type the author field
type Event = Omit<SanityEvent, "author" | "mainImage" | "body"> & {
  author?: { name?: string; picture?: string };
  body: PortableTextBlock[];
  imageUrl?: string | null;
  images?: string[];
  date?: string | null;
  venue?: string | null;
  registrationLink?: string | null;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const event = (await sanityFetch({
    query: eventQuery,
    params: await params,
    stega: false,
  })) as Event;

  return {
    authors: event?.author?.name ? [{ name: event?.author?.name }] : [],
    title: event?.title,
    description: event?.description,
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return (await sanityFetch({
    query: eventSlugsQuery,
    perspective: "published",
    stega: false,
  })) as SanityEvent[];
}

export default async function EventPage({ params }: Props) {
  const event = (await sanityFetch({
    query: eventQuery,
    params: await params,
  })) as Event;

  if (!event?._id) {
    return notFound();
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
                        Event
                    </span>
                 </div>
                 
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-primary text-balance text-neutral-900 dark:text-white">
                    {event.title}
                 </h1>

                 {/* Meta Data Row */}
                 <div className="flex flex-wrap items-center justify-center gap-6">
                    {event.author?.picture && (
                        <div className="flex items-center gap-3">
                           {/* Wrapping Avatar in a standardized container */}
                           <div className="scale-90 transform">
                             <Avatar name={event.author.name} src={event.author.picture} />
                           </div>
                        </div>
                    )}
                    {event.date && (
                      <>
                        <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-white/20"/>
                        <div className="flex items-center gap-2 font-tech text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            <Calendar className="h-4 w-4" />
                            <DateComponent dateString={event.date} />
                        </div>
                      </>
                    )}
                    {event.venue && (
                      <>
                        <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-white/20"/>
                        <div className="flex items-center gap-2 font-tech text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                        </div>
                      </>
                    )}
                    {event.category && (
                      <>
                        <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-white/20"/>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-tech font-semibold uppercase tracking-wider">
                            {event.category}
                        </span>
                      </>
                    )}
                 </div>

                 {/* Registration Button */}
                 {event.registrationLink && (
                   <div className="pt-2">
                     <Link
                       href={event.registrationLink}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-primary font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
                     >
                       <Ticket className="h-4 w-4" />
                       Register Now
                       <span className="block h-px w-0 bg-white transition-all group-hover:w-4" />
                     </Link>
                   </div>
                 )}
             </header>

             {/* 2. Full-Height Hero Image */}
             {event.imageUrl && (
               <div className="mx-auto max-w-5xl mb-24 relative">
                  <div className="relative w-full overflow-hidden rounded-[2rem] border border-neutral-200 dark:border-white/10 shadow-2xl bg-neutral-100 dark:bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.imageUrl}
                        alt={event.title || 'Event cover'}
                        className="w-full h-auto object-contain"
                      />
                      
                      {/* Subtle inner shadow for depth */}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem] pointer-events-none" />
                  </div>
               </div>
             )}

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
                    {event.body?.length && (
                        <PortableText
                            className=""
                            value={event.body as PortableTextBlock[]}
                        />
                    )}
                </div>
             </div>
        </article>

        {/* 4. More Photos Section */}
        {event.images && event.images.length > 1 && (
          <section className="border-t border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-[#080808]/50 py-24 mt-12">
              <div className="container max-w-7xl mx-auto px-6">
                  <div className="mb-12">
                      <div className="flex items-center gap-2 mb-3">
                          <span className="h-px w-6 bg-blue-500" />
                          <span className="text-xs font-tech font-bold uppercase tracking-widest text-blue-500">Gallery</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold font-primary tracking-tight text-neutral-900 dark:text-white">
                          More Photos
                      </h2>
                      <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-primary">
                          {event.images.length - 1} more photo{event.images.length - 1 !== 1 ? 's' : ''} from this event
                      </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.images.slice(1).map((img, index) => (
                      <div key={index} className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 shadow-md bg-neutral-100 dark:bg-white/5 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`${event.title} - Photo ${index + 2}`}
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none" />
                      </div>
                    ))}
                  </div>
              </div>
          </section>
        )}

        {/* 5. More Events */}
        <aside className="border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#080808] py-24">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-px w-6 bg-blue-500" />
                            <span className="text-xs font-tech font-bold uppercase tracking-widest text-blue-500">Up Next</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-primary tracking-tight text-neutral-900 dark:text-white">
                            More Events
                        </h2>
                    </div>
                    <Link href="/events" className="group flex items-center gap-2 text-sm font-bold font-tech uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                        View All Events
                        <span className="block h-px w-4 bg-current transition-all group-hover:w-8" />
                    </Link>
                </div>
                
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-96 w-full bg-neutral-200 dark:bg-white/5 animate-pulse rounded-3xl"/>
                        <div className="h-96 w-full bg-neutral-200 dark:bg-white/5 animate-pulse rounded-3xl"/>
                    </div>
                }>
                    <MoreEvents skip={event._id} limit={2} />
                </Suspense>
            </div>
        </aside>
    </div>
  );
}
