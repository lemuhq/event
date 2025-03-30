'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const calendars = [
  {
    id: 'reading-rhythms',
    name: 'Reading Rhythms Global',
    description: 'Not a book club. A reading party. Read with friends to live music & ambient sounds.',
    image: '/images/reading-rhythms.png',
  },
  {
    id: 'adp-list',
    name: 'ADPList',
    description: 'Your one-stop-shop for all things happening in the ADPList community.',
    image: '/images/adp-list.png',
  },
  {
    id: 'build-club',
    name: 'Build Club',
    location: 'Sydney',
    description: 'The best place in the world to learn AI. Curated with love.',
    image: '/images/build-club.png',
  },
  {
    id: 'her-workplace',
    name: 'Her Workplace',
    description: 'A community for women in tech and business.',
    image: '/images/her-workplace.png',
  },
  {
    id: 'design-buddies',
    name: 'Design Buddies',
    description: 'The largest design community. Learn, share, and grow together.',
    image: '/images/design-buddies.png',
  },
  {
    id: 'south-park',
    name: 'South Park Commons',
    description: 'A community of builders and learners in San Francisco.',
    image: '/images/south-park.png',
  },
];

export default function FeaturedCalendars() {
  return (
    <section className="mt-24">
      <h2 className="text-2xl font-semibold text-white mb-8">Featured Calendars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calendars.map((calendar, index) => (
          <motion.div
            key={calendar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-[#141416] rounded-2xl border border-white/[0.08] overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-500/20 to-neutral-400/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                      {/* Placeholder for calendar logo */}
                      <div className="w-8 h-8 rounded-lg bg-white/10" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium group-hover:text-white/90 transition-colors">
                        {calendar.name}
                      </h3>
                      {calendar.location && (
                        <p className="text-neutral-400 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          </svg>
                          {calendar.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-neutral-400 text-sm line-clamp-2">{calendar.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 