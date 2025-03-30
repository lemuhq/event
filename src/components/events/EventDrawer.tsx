'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import { Event } from '@/app/explore/[category]/page';
import { Copy, ExternalLink } from 'lucide-react';

interface EventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export default function EventDrawer({ isOpen, onClose, event }: EventDrawerProps) {
  const [ticketCount, setTicketCount] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGetTickets = () => {
    setIsCheckoutOpen(true);
  };

  const handleCopyLink = () => {
    // Generate event URL
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#0A0A0B] border-l border-neutral-800 flex flex-col z-50"
            >
              {/* Header - Fixed */}
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Event Details</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleCopyLink} 
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-1.5 px-3 rounded-md text-sm"
                  >
                    <Copy size={16} />
                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  
                  <Link 
                    href={`/events/${event.id}`} 
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-1.5 px-3 rounded-md text-sm"
                  >
                    <span>Event Page</span>
                    <ExternalLink size={16} />
                  </Link>
                  
                  <button 
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Image */}
                <div className="aspect-video rounded-xl overflow-hidden bg-neutral-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title + Date */}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {event.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-neutral-400">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Location</h3>
                      <p className="text-sm text-neutral-400">{event.location.name}</p>
                      <p className="text-sm text-neutral-400">{event.location.address}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-white/5 rounded-xl p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-white">Get Tickets</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Ticket Price</span>
                    <span className="text-2xl font-bold text-white">
                      {event.price.amount === 0 ? 'Free' : `${event.price.currency}${(event.price.amount * ticketCount).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-400">
                    {ticketCount === 1 ? 'Per ticket' : `${ticketCount} tickets total`}
                  </div>
                  
                  {/* Ticket Counter */}
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                    <span className="text-white font-medium">Tickets</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="text-white font-medium">{ticketCount}</span>
                      <button
                        onClick={() => setTicketCount(ticketCount + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    className="w-full py-3 bg-[#FF5400] text-white font-medium rounded-lg hover:bg-[#FF5400]/90 transition-colors"
                    onClick={handleGetTickets}
                  >
                    {event.price.amount === 0 ? 'Register Now' : `Get ${ticketCount === 1 ? 'Ticket' : 'Tickets'}`}
                  </button>
                </div>

                {/* About Event */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">About Event</h2>
                  <p className="text-neutral-400 whitespace-pre-wrap">{event.description}</p>
                </div>

                {/* Disclaimer */}
                {event.disclaimer && (
                  <div className="text-sm text-neutral-500">
                    <h3 className="font-medium mb-2">Disclaimer:</h3>
                    <p>{event.disclaimer}</p>
                  </div>
                )}

                {/* Organizer */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <h2 className="text-xl font-semibold text-white mb-4">Presented by</h2>
                  <div className="flex items-start justify-between">
                    <Link href={`/hosts/${event.organizer.id}`} className="flex items-center gap-4">
                      <img
                        src={event.organizer.avatar}
                        alt={event.organizer.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="text-white font-medium hover:text-[#FF5400] transition-colors">{event.organizer.name}</h3>
                        <p className="text-sm text-neutral-400">{event.organizer.description}</p>
                      </div>
                    </Link>
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between text-sm text-neutral-500 pt-6">
                  <Link href="#" className="hover:text-neutral-300">Terms</Link>
                  <Link href="#" className="hover:text-neutral-300">Privacy</Link>
                  <Link href="#" className="hover:text-neutral-300">Report Event</Link>
                  <Link href="#" className="hover:text-neutral-300">Help</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Checkout Modal */}
      {event && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          event={event} 
          ticketCount={ticketCount} 
        />
      )}
    </>
  );
} 