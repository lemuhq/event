'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'ai',
    name: 'AI',
    eventCount: '1K Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    color: 'bg-purple-500/20'
  },
  {
    id: 'arts-culture',
    name: 'Arts & Culture',
    eventCount: '981 Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    color: 'bg-rose-500/20'
  },
  {
    id: 'climate',
    name: 'Climate',
    eventCount: '744 Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
      </svg>
    ),
    color: 'bg-green-500/20'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    eventCount: '552 Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
      </svg>
    ),
    color: 'bg-orange-500/20'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    eventCount: '1K Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    color: 'bg-blue-500/20'
  },
  {
    id: 'crypto',
    name: 'Crypto',
    eventCount: '969 Events',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    color: 'bg-indigo-500/20'
  }
];

const featuredCalendars = [
  {
    id: 'reading-rhythms',
    name: 'Reading Rhythms Global',
    description: 'Not a book club. A reading party. Read with friends to live music & ambient sounds.',
    avatar: '/images/organizers/reading-rhythms.jpg'
  },
  {
    id: 'adplist',
    name: 'ADPList',
    description: 'Your one-stop-shop for all things happening in the ADPList community.',
    avatar: '/images/organizers/adplist.jpg'
  },
  {
    id: 'build-club',
    name: 'Build Club',
    location: 'Sydney',
    description: 'The best place in the world to learn AI. Curated with love.',
    avatar: '/images/organizers/build-club.jpg'
  },
  {
    id: 'her-workplace',
    name: 'Her Workplace',
    description: 'A community for women in tech to connect, learn, and grow together.',
    avatar: '/images/organizers/her-workplace.jpg'
  },
  {
    id: 'design-studies',
    name: 'Design Studies',
    description: 'Weekly design workshops and critiques for growing designers.',
    avatar: '/images/organizers/design-studies.jpg'
  }
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4">Discover Events</h1>
          <p className="text-neutral-400 text-lg mb-12">
            Explore popular events near you, browse by category, or check out some of the great community calendars.
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/explore/${category.id}`}>
                  <div className="bg-neutral-800/50 rounded-xl p-4 hover:bg-neutral-800 transition-all flex items-center gap-4">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{category.name}</h3>
                      <p className="text-sm text-neutral-400">{category.eventCount}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8">Featured Calendars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCalendars.map((calendar, index) => (
              <motion.div
                key={calendar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-800/50 rounded-xl p-6 hover:bg-neutral-800 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-700 overflow-hidden">
                    <img
                      src={calendar.avatar}
                      alt={calendar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white flex items-center gap-2">
                      {calendar.name}
                      {calendar.location && (
                        <span className="text-sm text-neutral-400">• {calendar.location}</span>
                      )}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">{calendar.description}</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 rounded-lg border border-neutral-700 text-sm text-white hover:bg-neutral-700 transition-all">
                  Subscribe
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 