'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { eventsByCategory, hostsData } from '@/app/explore/[category]/page';

export default function HostPage() {
  const { id } = useParams();
  
  // Get host data
  const host = hostsData[id as string];
  
  if (!host) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Host not found</h1>
          <p className="text-neutral-400 mb-8">The host you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/explore"
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  // Get all events by this host
  const hostedEvents = Object.values(eventsByCategory)
    .flat()
    .filter(event => event.organizer.id === host.id);

  // Split events into upcoming and past
  const upcomingEvents = hostedEvents.filter(event => event.status === 'upcoming');
  const pastEvents = hostedEvents.filter(event => event.status === 'past');

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#0A0A0B]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-semibold">
            EventWave
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">16:06 GMT+1</span>
            <Link href="/explore" className="text-white hover:text-neutral-200">
              Explore Events →
            </Link>
            <button className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-12">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{host.name}</h1>
              <p className="text-neutral-400 mb-4">{host.role}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                  </svg>
                  <span className="text-neutral-400">Joined {host.joinDate}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white">{host.stats.hosted} <span className="text-neutral-400">Hosted</span></span>
                  <span className="text-white">{host.stats.attended} <span className="text-neutral-400">Attended</span></span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {host.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {link.platform === 'twitter' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    )}
                    {link.platform === 'linkedin' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    )}
                    {link.platform === 'website' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c-4.97 0-9-4.03-9-9m9 9c4.97 0 9-4.03 9-9m-9 0a9 9 0 0 0-9 9m9-9a9 9 0 0 1 9 9"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Link 
                    key={index}
                    href={`/events/${event.id}`}
                    className="block bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-white font-medium mb-1">{event.title}</h3>
                        <p className="text-sm text-neutral-400">{event.date}, {event.time}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Past Events</h2>
                <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <Link 
                    key={index}
                    href={`/events/${event.id}`}
                    className="block bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-white font-medium mb-1">{event.title}</h3>
                        <p className="text-sm text-neutral-400">{event.date}, {event.time}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 