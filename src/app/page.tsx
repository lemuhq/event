'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Import the Event interface from the explore page
import { Event } from '@/app/explore/[category]/page';

// Sample events data - in a real app, this would come from an API or database
const sampleEvents: Event[] = [
  {
    id: 'ai-1',
    title: 'AI & Machine Learning Summit 2024',
    location: {
      name: 'San Francisco Convention Center',
      address: '747 Howard St, San Francisco, CA 94103'
    },
    date: '15 March',
    time: '09:00 AM',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
    price: { amount: 299, currency: '$' },
    description: 'Join us for the premier AI event of the year! The AI & Machine Learning Summit brings together industry leaders, researchers, and practitioners.',
    organizer: {
      id: 'nathan-benaich',
      name: 'Nathan Benaich (Air Street)',
      avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
      description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
    },
    status: 'upcoming'
  },
  {
    id: 'ai-2',
    title: 'AI Ethics Workshop Series',
    location: {
      name: 'MIT Media Lab',
      address: '75 Amherst St, Cambridge, MA 02139'
    },
    date: '20 March',
    time: '14:00 PM',
    image: 'https://images.unsplash.com/photo-1639322537534-9e33a90d4b4c',
    price: { amount: 0, currency: '$' },
    description: 'A comprehensive workshop series exploring the ethical implications of AI development and deployment.',
    organizer: {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
      description: 'AI Ethics researcher focused on responsible AI development.'
    },
    status: 'upcoming'
  },
  {
    id: 'ai-3',
    title: 'Future of AI in Healthcare',
    location: {
      name: 'London Medical Center',
      address: '123 Harley St, London W1G 7JU'
    },
    date: '10 February',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1639322537564-f8b1c6c9b4f5',
    price: { amount: 199, currency: '£' },
    description: 'Explore how AI is transforming healthcare delivery, from diagnosis to treatment planning.',
    organizer: {
      id: 'nathan-benaich',
      name: 'Nathan Benaich (Air Street)',
      avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
      description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
    },
    status: 'past'
  },
  {
    id: 'web3-1',
    title: 'Web3 Conference',
    location: {
      name: 'Tech Campus',
      address: '123 Innovation Ave, Austin, TX 78701'
    },
    date: '22 April',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    price: { amount: 149, currency: '$' },
    description: 'The premier conference for blockchain and web3 developers.',
    organizer: {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
      description: 'AI Ethics researcher focused on responsible AI development.'
    },
    status: 'upcoming'
  },
  {
    id: 'design-1',
    title: 'DesignMatters 2024',
    location: {
      name: 'Design Center',
      address: '456 Creative Blvd, Portland, OR 97205'
    },
    date: '5 May',
    time: '11:00 AM',
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349',
    price: { amount: 99, currency: '$' },
    description: 'A conference focused on design principles and UX innovations.',
    organizer: {
      id: 'nathan-benaich',
      name: 'Nathan Benaich (Air Street)',
      avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
      description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
    },
    status: 'upcoming'
  }
];

// Function to get placeholder image for events without images
const getEventImage = (event: Event) => {
  // If the event has an image, return it
  if (event.image && event.image.startsWith('http')) {
    return event.image;
  }
  
  // Otherwise use a placeholder with the event title
  return `https://placehold.co/600x400/purple/white?text=${encodeURIComponent(event.title)}`;
};

export default function HomePage() {
  // State for current displayed events
  const [currentMainEvent, setCurrentMainEvent] = useState(0);
  const [currentLeftEvent, setCurrentLeftEvent] = useState(1);
  const [currentRightEvent, setCurrentRightEvent] = useState(2);

  // Change events every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainEvent((prev) => (prev + 1) % sampleEvents.length);
      setCurrentLeftEvent((prev) => (prev + 1) % sampleEvents.length);
      setCurrentRightEvent((prev) => (prev + 1) % sampleEvents.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get current events
  const mainEvent = sampleEvents[currentMainEvent];
  const leftEvent = sampleEvents[currentLeftEvent];
  const rightEvent = sampleEvents[currentRightEvent];

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10 pointer-events-none" />
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Create</span>
              <br />
              <span className="text-white">unforgettable</span>
              <br />
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-transparent bg-clip-text">experiences</span>
                <span className="text-[#FF5400]">.</span>
              </div>
            </h1>

            <p className="mt-6 text-lg text-neutral-400 max-w-2xl">
              Transform your ideas into extraordinary events. From intimate gatherings to grand celebrations, make every moment count.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/events/create"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-colors duration-200"
              >
                Start Creating
              </Link>
              <Link 
                href="/events"
                className="inline-flex items-center px-6 py-3 rounded-full border border-neutral-700 text-white font-medium hover:bg-white/5 transition-colors duration-200"
              >
                Browse Events
              </Link>
            </div>
          </motion.div>

          {/* Right column - Floating UI elements with clickable events */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[600px] w-full max-w-[500px] mx-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main event card - centered */}
              <Link href={`/events/${mainEvent.id}`}>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[320px] aspect-[4/3] bg-black rounded-2xl border border-neutral-800/50 shadow-2xl overflow-hidden cursor-pointer hover:border-neutral-700 transition-all z-20"
                >
                  {/* Network visualization overlay */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="0.5">
                        {/* Cubes pattern */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <g key={i} transform={`translate(${5 + (i % 10) * 10}, ${5 + Math.floor(i / 10) * 10})`}>
                            <rect x="0" y="0" width="10" height="10" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(5, 8.66) rotate(30)" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(13.66, 5) rotate(60)" />
                            {i % 3 === 0 && <line x1="5" y1="5" x2={15 + (i % 5) * 5} y2={10 + ((i + 1) % 5) * 5} />}
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>

                  {/* Dark overlay for bottom section */}
                  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-black"></div>
                  
                  {/* Content container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    {/* Top section - Date and time */}
                    <div className="text-neutral-400 text-sm font-medium mb-3">
                      {mainEvent.date} • {mainEvent.time}
                    </div>
                    
                    {/* Middle section - Title */}
                    <h3 className="text-white text-3xl font-bold mb-4 leading-tight">
                      {mainEvent.title}
                    </h3>
                    
                    {/* Bottom section - Location, organizer and price */}
                    <div className="space-y-3">
                      {/* Location */}
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-neutral-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-neutral-300">{mainEvent.location.name}</span>
                      </div>
                      
                      {/* Organizer and price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 mr-3 flex items-center justify-center">
                            <span className="text-xs text-neutral-400">
                              {mainEvent.organizer.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-neutral-300">{mainEvent.organizer.name}</span>
                        </div>
                        <span className="text-green-500 font-semibold">
                          {mainEvent.price.amount === 0 
                            ? 'Free' 
                            : `${mainEvent.price.currency}${mainEvent.price.amount}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Left floating event card */}
              <Link href={`/events/${leftEvent.id}`}>
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    rotate: [2, -2, 2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-[20%] left-[22%] w-48 h-36 bg-black rounded-xl border border-neutral-800/50 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all z-10"
                >
                  {/* Network visualization - simpler pattern for small card */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="0.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <g key={i} transform={`translate(${5 + (i % 5) * 20}, ${5 + Math.floor(i / 5) * 20})`}>
                            <rect x="0" y="0" width="10" height="10" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(5, 8.66) rotate(30)" />
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>

                  {/* Dark overlay for bottom section */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <div className="text-neutral-400 text-xs mb-1">
                      {leftEvent.date} • {leftEvent.time}
                    </div>
                    <h3 className="text-white text-sm font-medium line-clamp-1">
                      {leftEvent.title}
                    </h3>
                    <div className="mt-1 text-neutral-400 text-xs">
                      {leftEvent.location.name}
                    </div>
                    <div className="mt-auto text-green-500 text-xs font-medium">
                      {leftEvent.price.amount === 0 
                        ? 'Free' 
                        : `${leftEvent.price.currency}${leftEvent.price.amount}`
                      }
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Right floating event card */}
              <Link href={`/events/${rightEvent.id}`}>
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    x: [5, -5, 5],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute bottom-[25%] left-[8%] w-56 h-40 bg-black rounded-xl border border-neutral-800/50 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all z-10"
                >
                  {/* Network visualization - simpler pattern for small card */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="0.5">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <g key={i} transform={`translate(${5 + (i % 6) * 16}, ${5 + Math.floor(i / 6) * 16})`}>
                            <rect x="0" y="0" width="10" height="10" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(5, 8.66) rotate(30)" />
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>

                  {/* Dark overlay for bottom section */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="text-neutral-400 text-xs mb-1">
                      {rightEvent.date} • {rightEvent.time}
                    </div>
                    <h3 className="text-white text-sm font-medium mb-1 line-clamp-2">
                      {rightEvent.title}
                    </h3>
                    <div className="text-neutral-400 text-xs mb-1">
                      {rightEvent.location.name}
                    </div>
                    <div className="mt-auto text-green-500 text-xs font-medium">
                      {rightEvent.price.amount === 0 
                        ? 'Free' 
                        : `${rightEvent.price.currency}${rightEvent.price.amount}`
                      }
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Third floating event card */}
              <Link href={`/events/${sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].id}`}>
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    x: [3, -3, 3],
                    rotate: [1, -1, 1]
                  }}
                  transition={{ 
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-[15%] right-[10%] w-48 h-36 bg-black rounded-xl border border-neutral-800/50 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all z-10"
                >
                  {/* Network visualization - simpler pattern for small card */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="0.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <g key={i} transform={`translate(${5 + (i % 5) * 18}, ${5 + Math.floor(i / 5) * 18})`}>
                            <rect x="0" y="0" width="10" height="10" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(5, 8.66) rotate(30)" />
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>

                  {/* Dark overlay for bottom section */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <div className="text-neutral-400 text-xs mb-1">
                      {sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].date} • {sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].time}
                    </div>
                    <h3 className="text-white text-sm font-medium line-clamp-1">
                      {sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].title}
                    </h3>
                    <div className="mt-1 text-neutral-400 text-xs">
                      {sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].location.name}
                    </div>
                    <div className="mt-auto text-green-500 text-xs font-medium">
                      {sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].price.amount === 0 
                        ? 'Free' 
                        : `${sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].price.currency}${sampleEvents[(currentLeftEvent + 2) % sampleEvents.length].price.amount}`
                      }
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Fourth floating event card */}
              <Link href={`/events/${sampleEvents[(currentMainEvent + 3) % sampleEvents.length].id}`}>
                <motion.div
                  animate={{ 
                    y: [7, -7, 7],
                    x: [-4, 4, -4],
                    rotate: [-1.5, 1.5, -1.5]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute bottom-[15%] right-[18%] w-40 h-32 bg-black rounded-xl border border-neutral-800/50 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all z-10"
                >
                  {/* Network visualization - simpler pattern for small card */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="0.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <g key={i} transform={`translate(${5 + (i % 3) * 30}, ${5 + Math.floor(i / 3) * 30})`}>
                            <rect x="0" y="0" width="10" height="10" />
                            <rect x="0" y="0" width="10" height="10" transform="translate(5, 8.66) rotate(30)" />
                          </g>
                        ))}
                      </g>
                    </svg>
                  </div>

                  {/* Dark overlay for bottom section */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-black"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <div className="text-neutral-400 text-xs mb-1">
                      {sampleEvents[(currentMainEvent + 3) % sampleEvents.length].date} • {sampleEvents[(currentMainEvent + 3) % sampleEvents.length].time}
                    </div>
                    <h3 className="text-white text-sm font-medium line-clamp-1">
                      {sampleEvents[(currentMainEvent + 3) % sampleEvents.length].title}
                    </h3>
                    <div className="mt-1 text-neutral-400 text-xs">
                      {sampleEvents[(currentMainEvent + 3) % sampleEvents.length].location.name}
                    </div>
                    <div className="mt-auto text-green-500 text-xs font-medium">
                      {sampleEvents[(currentMainEvent + 3) % sampleEvents.length].price.amount === 0 
                        ? 'Free' 
                        : `${sampleEvents[(currentMainEvent + 3) % sampleEvents.length].price.currency}${sampleEvents[(currentMainEvent + 3) % sampleEvents.length].price.amount}`
                      }
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
