"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, ArrowUpRight, Clock, X, Ticket, ChevronRight } from "lucide-react";

// --- Hook: useOutsideClick (Inline definition to fix import error) ---
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// --- Types (Matching your Sanity Schema) ---
export interface Event {
  _id: string;
  title?: string;
  slug?: { current?: string };
  date?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  registrationLink?: string;
  fullDescription?: ReactNode; // Portable Text or string
  location?: string; // Added field if you have it, otherwise optional
}

// --- Helpers ---
function formatDate(dateString?: string) {
  if (!dateString) return "TBA";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getDay(dateString?: string) {
    if (!dateString) return "00";
    return new Date(dateString).getDate().toString().padStart(2, '0');
}

function getMonth(dateString?: string) {
    if (!dateString) return "XXX";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

// --- Components ---

// 1. Featured Event Card (The "Main" one)
const FeaturedEventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  return (
    <div 
      className="group relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-white/10"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Badges */}
      <div className="absolute top-6 left-6 flex gap-3">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white uppercase tracking-wider">
          Featured
        </span>
        {event.category && (
            <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-xs font-medium text-white uppercase tracking-wider">
            {event.category}
            </span>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
        <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight font-primary">
                {event.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-6 text-neutral-300 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>{formatDate(event.date)}</span>
                </div>
                {event.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>{event.location}</span>
                    </div>
                )}
            </div>

            <div className="h-px w-full bg-white/20 my-2" />

            <div className="flex items-center justify-between">
                <p className="text-neutral-400 text-sm line-clamp-2 max-w-lg">
                    {event.description}
                </p>
                <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-6 h-6" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// 2. Upcoming List Item (The "Secondary" ones)
const UpcomingEventRow = ({ event, onClick }: { event: Event; onClick: () => void }) => {
    return (
        <div 
            onClick={onClick}
            className="group flex gap-4 p-4 rounded-2xl hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-white/10"
        >
            {/* Date Block */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/10 shrink-0">
                <span className="text-xs font-bold text-red-500 uppercase">{getMonth(event.date)}</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white font-tech">{getDay(event.date)}</span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center flex-1 min-w-0">
                <h4 className="text-base font-bold text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(event.date)}
                    </span>
                    {event.category && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                            <span>{event.category}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
        </div>
    )
}

// 3. Details Modal
const EventModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    if (!event) return null;

    return (
        <div className="fixed inset-0 z-[100] grid place-items-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                layoutId={`card-${event._id}`}
                ref={ref}
                className="w-full max-w-2xl bg-white dark:bg-[#0F0F0F] rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col font-primary"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 shrink-0">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {formatDate(event.date)}</span>
                            {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {event.location}</span>}
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="prose prose-sm dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300">
                        {/* If fullDescription is a string, render it. If it's PortableText, you'd render that component here. Assuming string for simplicity based on prompt */}
                        {typeof event.fullDescription === 'string' ? event.fullDescription : event.description}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end">
                        {event.registrationLink ? (
                            <a 
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                            >
                                <Ticket className="w-4 h-4" />
                                Register Now
                            </a>
                        ) : (
                            <button disabled className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-white/10 text-neutral-500 cursor-not-allowed text-sm font-medium">
                                Registration Closed
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// --- Main Component ---
export const UpcomingEvents = ({ events }: { events: Event[] }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Separate logic
  // 1. Sort by date (Assuming ISO string dates)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date || "").getTime() - new Date(b.date || "").getTime()
  );

  // 2. Split
  const featuredEvent = sortedEvents[0];
  const upcomingEvents = sortedEvents.slice(1);

  if (!featuredEvent) return null; // Or return a "No events" state

  return (
    <section className="w-full bg-white dark:bg-[#050505] py-24 px-4 lg:px-12 font-primary border-t border-neutral-200 dark:border-white/10">
      <FontStyles />
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-tech font-bold uppercase tracking-widest text-red-500">Live & Upcoming</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Upcoming Events
                </h2>
            </div>
            
            <a href="/events" className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                View All <ArrowUpRight className="w-4 h-4" />
            </a>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Featured Event (Takes 7 cols) */}
            <div className="lg:col-span-7">
                <FeaturedEventCard 
                    event={featuredEvent} 
                    onClick={() => setSelectedEvent(featuredEvent)} 
                />
            </div>

            {/* Right: Upcoming List (Takes 5 cols) */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <div className="bg-neutral-50 dark:bg-[#0A0A0A] rounded-3xl border border-neutral-200 dark:border-white/5 p-6 h-full">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-neutral-400" />
                        Up Next
                    </h3>
                    
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] pr-2">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) => (
                                <UpcomingEventRow 
                                    key={event._id} 
                                    event={event} 
                                    onClick={() => setSelectedEvent(event)} 
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 text-neutral-500">
                                No other upcoming events scheduled.
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/5 md:hidden">
                        <a href="/events" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-sm font-bold text-neutral-900 dark:text-white">
                            View Full Calendar
                        </a>
                    </div>
                </div>
            </div>

        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
            <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

    </section>
  );
};