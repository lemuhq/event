'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    id: 'ai',
    name: 'AI',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
    color: 'from-pink-500/20 to-purple-500/20',
    count: '1K Events',
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    color: 'from-orange-500/20 to-red-500/20',
    count: '981 Events',
  },
  {
    id: 'climate',
    name: 'Climate',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18M12 18l-6-6 6-6M6 12h12" />
      </svg>
    ),
    color: 'from-green-500/20 to-emerald-500/20',
    count: '744 Events',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12.707 11.293a1 1 0 010 1.414" />
      </svg>
    ),
    color: 'from-orange-500/20 to-yellow-500/20',
    count: '552 Events',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 21l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
    color: 'from-blue-500/20 to-cyan-500/20',
    count: '1K Events',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
    color: 'from-purple-500/20 to-indigo-500/20',
    count: '969 Events',
  },
];

export default function CategoryGrid() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-white mb-8">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/explore/${category.id}`}
              className="block p-6 bg-[#141416] rounded-2xl border border-white/[0.08] hover:border-white/[0.16] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-white/90 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">{category.count}</p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 