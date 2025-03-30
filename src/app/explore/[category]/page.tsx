'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import EventDrawer from '@/components/events/EventDrawer';

export interface Host {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  stats: {
    hosted: number;
    attended: number;
  };
  avatar: string;
  socialLinks: {
    platform: 'twitter' | 'linkedin' | 'website';
    url: string;
  }[];
}

export const hostsData: Record<string, Host> = {
  'nathan-benaich': {
    id: 'nathan-benaich',
    name: "Nathan Benaich (Air Street)",
    role: "General Partner, Air Street Capital, and author of the State of AI Report",
    joinDate: "September 2021",
    stats: {
      hosted: 35,
      attended: 22
    },
    avatar: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/nathanbenaich' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/nathanbenaich' },
      { platform: 'website', url: 'https://lu.ma/nyai' }
    ]
  },
  'sarah-chen': {
    id: 'sarah-chen',
    name: "Sarah Chen",
    role: "AI Ethics Researcher & Community Builder",
    joinDate: "March 2022",
    stats: {
      hosted: 28,
      attended: 15
    },
    avatar: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'website', url: 'https://lu.ma/aiethics' }
    ]
  }
};

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: {
    amount: number;
    currency: string;
  };
  description: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    instagram?: string;
  };
  disclaimer?: string;
  featured?: {
    community: string;
    logo: string;
  };
  image: string;
  status: 'upcoming' | 'past';
}

// Mock data for events
export const eventsByCategory: Record<string, Event[]> = {
  ai: [
    {
      id: 'ai-1',
      title: 'AI & Machine Learning Summit 2024',
      date: '15 March',
      time: '09:00 AM',
      location: {
        name: 'San Francisco Convention Center',
        address: '747 Howard St, San Francisco, CA 94103',
        coordinates: { lat: 37.7849, lng: -122.4005 }
      },
      price: { amount: 299, currency: '$' },
      description: 'Join us for the premier AI event of the year! The AI & Machine Learning Summit brings together industry leaders, researchers, and practitioners for a day of deep learning, neural networks, and the future of artificial intelligence.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
      status: 'upcoming'
    },
    {
      id: 'ai-2',
      title: 'AI Ethics Workshop Series',
      date: '20 March',
      time: '14:00 PM',
      location: {
        name: 'MIT Media Lab',
        address: '75 Amherst St, Cambridge, MA 02139',
        coordinates: { lat: 42.3609, lng: -71.0887 }
      },
      price: { amount: 0, currency: '$' },
      description: 'A comprehensive workshop series exploring the ethical implications of AI development and deployment. Join us for interactive sessions, case studies, and expert panels.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1639322537534-9e33a90d4b4c',
      status: 'upcoming'
    },
    {
      id: 'ai-3',
      title: 'Future of AI in Healthcare',
      date: '10 February',
      time: '10:00 AM',
      location: {
        name: 'London Medical Center',
        address: '123 Harley St, London W1G 7JU',
        coordinates: { lat: 51.5207, lng: -0.1476 }
      },
      price: { amount: 199, currency: '£' },
      description: 'Explore how AI is transforming healthcare delivery, from diagnosis to treatment planning. Features leading healthcare AI researchers and practitioners.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1639322537564-f8b1c6c9b4f5',
      status: 'past'
    },
    {
      id: 'ai-4',
      title: 'Deep Learning Workshop Series',
      date: 'Apr 18, 2024',
      time: '14:00 - 17:00 GMT-4',
      location: {
        name: 'AI Research Lab',
        address: '456 Tech Street, Boston, MA 02108, USA',
        coordinates: {
          lat: 42.3601,
          lng: -71.0589
        }
      },
      price: {
        amount: 149,
        currency: 'US$'
      },
      description: 'Hands-on workshop series covering the latest in deep learning. Perfect for developers and data scientists looking to enhance their skills.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'ai-5',
      title: 'AI Ethics Symposium',
      date: 'Apr 20, 2024',
      time: '10:00 - 16:00 GMT-4',
      location: {
        name: 'University Conference Center',
        address: '789 Academic Drive, Cambridge, MA 02139, USA',
        coordinates: {
          lat: 42.3736,
          lng: -71.1097
        }
      },
      price: {
        amount: 0,
        currency: 'US$'
      },
      description: 'Join leading ethicists and AI researchers for a discussion on the ethical implications of artificial intelligence and machine learning.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'ai-6',
      title: 'AI in Healthcare Summit',
      date: 'May 2, 2024',
      time: '08:00 - 17:00 GMT-4',
      location: {
        name: 'Medical Innovation Center',
        address: '890 Health Tech Road, Houston, TX 77030, USA',
        coordinates: {
          lat: 29.7604,
          lng: -95.3698
        }
      },
      price: {
        amount: 349,
        currency: 'US$'
      },
      description: 'Discover how AI is transforming healthcare, from diagnosis to treatment planning and patient care.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/ai-healthcare.jpg',
      status: 'upcoming'
    },
    {
      id: 'ai-7',
      title: 'Reinforcement Learning Masterclass',
      date: 'May 5, 2024',
      time: '10:00 - 16:00 GMT-4',
      location: {
        name: 'AI Training Center',
        address: '123 Learning Lane, San Jose, CA 95110, USA',
        coordinates: {
          lat: 37.3382,
          lng: -121.8863
        }
      },
      price: {
        amount: 179,
        currency: 'US$'
      },
      description: 'Advanced workshop on reinforcement learning algorithms and their practical applications.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/rl-masterclass.jpg',
      status: 'upcoming'
    },
    {
      id: 'ai-8',
      title: 'AI Startups Pitch Night',
      date: 'May 8, 2024',
      time: '18:00 - 21:00 GMT-4',
      location: {
        name: 'Startup Hub',
        address: '456 Venture Ave, New York, NY 10013, USA',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      },
      price: {
        amount: 25,
        currency: 'US$'
      },
      description: 'Watch innovative AI startups pitch their ideas to investors and industry experts.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/startup-pitch.jpg',
      status: 'upcoming'
    },
    {
      id: 'ai-9',
      title: 'AI in Gaming Symposium',
      date: 'May 12, 2024',
      time: '11:00 - 18:00 GMT-4',
      location: {
        name: 'Game Dev Center',
        address: '789 Gaming Blvd, Los Angeles, CA 90017, USA',
        coordinates: {
          lat: 34.0522,
          lng: -118.2437
        }
      },
      price: {
        amount: 159,
        currency: 'US$'
      },
      description: 'Explore how AI is revolutionizing game development, from NPC behavior to procedural content generation.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/gaming-ai.jpg',
      status: 'upcoming'
    },
    {
      id: 'ai-10',
      title: 'AI for Business Leaders',
      date: 'May 15, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Business Innovation Center',
        address: '321 Enterprise Way, Chicago, IL 60601, USA',
        coordinates: {
          lat: 41.8781,
          lng: -87.6298
        }
      },
      price: {
        amount: 399,
        currency: 'US$'
      },
      description: 'Strategic overview of AI applications in business, focused on decision-making and implementation.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/business-ai.jpg',
      status: 'upcoming'
    }
  ],
  'arts-culture': [
    {
      id: 'arts-1',
      title: 'Contemporary Art Exhibition: Future Forms',
      date: 'Apr 10, 2024',
      time: '10:00 - 20:00 GMT-4',
      location: {
        name: 'Modern Art Gallery',
        address: '456 Gallery Row, New York, NY 10001, USA',
        coordinates: { lat: 40.7505, lng: -73.9934 }
      },
      price: { amount: 25, currency: 'US$' },
      description: 'Experience the intersection of technology and art in this groundbreaking exhibition.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'arts-2',
      title: 'Classical Music Concert Series',
      date: 'Apr 12, 2024',
      time: '19:30 - 22:00 GMT-4',
      location: {
        name: 'Symphony Hall',
        address: '301 Massachusetts Ave, Boston, MA 02115, USA',
        coordinates: { lat: 42.3433, lng: -71.0850 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'An evening of classical masterpieces performed by the renowned Boston Symphony Orchestra.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'arts-3',
      title: 'Street Art Festival',
      date: 'Apr 15, 2024',
      time: '11:00 - 20:00 GMT-4',
      location: {
        name: 'Arts District',
        address: '789 Murals Street, Miami, FL 33127, USA',
        coordinates: { lat: 25.7994, lng: -80.2003 }
      },
      price: { amount: 0, currency: 'US$' },
      description: 'Watch live mural paintings, graffiti art demonstrations, and street performances.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1571498664957-fde285d79857?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'arts-4',
      title: 'Modern Dance Performance',
      date: 'Apr 18, 2024',
      time: '20:00 - 22:00 GMT-4',
      location: {
        name: 'Contemporary Dance Theater',
        address: '567 Performance Way, Chicago, IL 60601, USA',
        coordinates: { lat: 41.8819, lng: -87.6278 }
      },
      price: { amount: 45, currency: 'US$' },
      description: 'An innovative dance performance exploring themes of human connection in the digital age.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/modern-dance.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-5',
      title: 'Photography Workshop',
      date: 'Apr 20, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Creative Studios',
        address: '890 Camera Lane, Portland, OR 97201, USA',
        coordinates: { lat: 45.5155, lng: -122.6789 }
      },
      price: { amount: 129, currency: 'US$' },
      description: 'Learn advanced photography techniques from professional photographers.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/photo-workshop.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-6',
      title: 'Film Festival Opening Night',
      date: 'Apr 22, 2024',
      time: '18:00 - 23:00 GMT-4',
      location: {
        name: 'Historic Theater',
        address: '123 Cinema Blvd, Los Angeles, CA 90028, USA',
        coordinates: { lat: 34.1016, lng: -118.3267 }
      },
      price: { amount: 50, currency: 'US$' },
      description: 'Opening night of the international film festival featuring independent films.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/film-festival.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-7',
      title: 'Poetry Slam Competition',
      date: 'Apr 25, 2024',
      time: '19:00 - 22:00 GMT-4',
      location: {
        name: 'Literary Cafe',
        address: '456 Poets Row, Seattle, WA 98101, USA',
        coordinates: { lat: 47.6097, lng: -122.3331 }
      },
      price: { amount: 15, currency: 'US$' },
      description: 'Watch talented poets compete in this high-energy poetry slam event.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/poetry-slam.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-8',
      title: 'Sculpture Garden Tour',
      date: 'Apr 27, 2024',
      time: '10:00 - 12:00 GMT-4',
      location: {
        name: 'Botanical Gardens',
        address: '789 Garden Path, Minneapolis, MN 55403, USA',
        coordinates: { lat: 44.9778, lng: -93.2650 }
      },
      price: { amount: 20, currency: 'US$' },
      description: 'Guided tour of contemporary sculptures in a beautiful garden setting.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/sculpture-garden.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-9',
      title: 'Opera Gala Night',
      date: 'Apr 30, 2024',
      time: '19:00 - 23:00 GMT-4',
      location: {
        name: 'Grand Opera House',
        address: '321 Opera Plaza, San Francisco, CA 94102, USA',
        coordinates: { lat: 37.7785, lng: -122.4208 }
      },
      price: { amount: 150, currency: 'US$' },
      description: 'A spectacular evening of opera featuring world-renowned performers.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/opera-gala.jpg',
      status: 'upcoming'
    },
    {
      id: 'arts-10',
      title: 'Interactive Art Installation',
      date: 'May 2, 2024',
      time: '11:00 - 19:00 GMT-4',
      location: {
        name: 'Digital Art Space',
        address: '567 Interactive Ave, Austin, TX 78701, USA',
        coordinates: { lat: 30.2669, lng: -97.7428 }
      },
      price: { amount: 35, currency: 'US$' },
      description: 'Experience cutting-edge interactive art installations using the latest technology.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/interactive-art.jpg',
      status: 'upcoming'
    }
  ],
  climate: [
    {
      id: 'climate-1',
      title: 'Climate Action Summit 2024',
      date: 'Apr 22, 2024',
      time: '09:00 - 18:00 GMT-4',
      location: {
        name: 'Green Convention Center',
        address: '789 Sustainability Blvd, Seattle, WA 98101, USA',
        coordinates: { lat: 47.6062, lng: -122.3321 }
      },
      price: { amount: 150, currency: 'US$' },
      description: 'Join environmental leaders for a day of discussion and action on climate change.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'climate-2',
      title: 'Sustainable Cities Workshop',
      date: 'Apr 25, 2024',
      time: '10:00 - 16:00 GMT-4',
      location: {
        name: 'Urban Planning Center',
        address: '456 Green Street, Portland, OR 97201, USA',
        coordinates: { lat: 45.5155, lng: -122.6789 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'Learn about sustainable urban planning and green infrastructure development.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'climate-3',
      title: 'Ocean Conservation Conference',
      date: 'Apr 28, 2024',
      time: '09:00 - 17:00 GMT-4',
      location: {
        name: 'Maritime Center',
        address: '789 Ocean Drive, San Diego, CA 92101, USA',
        coordinates: { lat: 32.7157, lng: -117.1611 }
      },
      price: { amount: 125, currency: 'US$' },
      description: 'Explore solutions for ocean conservation and marine ecosystem protection.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'climate-4',
      title: 'Renewable Energy Expo',
      date: 'May 1, 2024',
      time: '10:00 - 18:00 GMT-4',
      location: {
        name: 'Energy Innovation Center',
        address: '321 Solar Way, Phoenix, AZ 85004, USA',
        coordinates: { lat: 33.4484, lng: -112.0740 }
      },
      price: { amount: 0, currency: 'US$' },
      description: 'Discover the latest in renewable energy technology and sustainable power solutions.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/renewable-energy.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-5',
      title: 'Zero Waste Living Workshop',
      date: 'May 4, 2024',
      time: '13:00 - 16:00 GMT-4',
      location: {
        name: 'Community Center',
        address: '567 Eco Street, Austin, TX 78701, USA',
        coordinates: { lat: 30.2672, lng: -97.7431 }
      },
      price: { amount: 35, currency: 'US$' },
      description: 'Practical tips and strategies for reducing waste and living sustainably.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/zero-waste.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-6',
      title: 'Climate Tech Startup Showcase',
      date: 'May 7, 2024',
      time: '14:00 - 19:00 GMT-4',
      location: {
        name: 'Innovation Hub',
        address: '890 Tech Circle, Boston, MA 02110, USA',
        coordinates: { lat: 42.3601, lng: -71.0589 }
      },
      price: { amount: 50, currency: 'US$' },
      description: 'Showcase of innovative startups developing climate change solutions.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/climate-tech.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-7',
      title: 'Forest Conservation Symposium',
      date: 'May 10, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Forestry Center',
        address: '123 Forest Lane, Denver, CO 80202, USA',
        coordinates: { lat: 39.7392, lng: -104.9903 }
      },
      price: { amount: 85, currency: 'US$' },
      description: 'Discussion on forest preservation and sustainable forestry practices.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/forest-conservation.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-8',
      title: 'Sustainable Fashion Show',
      date: 'May 13, 2024',
      time: '18:00 - 21:00 GMT-4',
      location: {
        name: 'Fashion District',
        address: '456 Style Ave, New York, NY 10018, USA',
        coordinates: { lat: 40.7516, lng: -73.9936 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'Showcase of eco-friendly fashion and sustainable textile innovations.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/sustainable-fashion.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-9',
      title: 'Climate Justice Forum',
      date: 'May 16, 2024',
      time: '10:00 - 17:00 GMT-4',
      location: {
        name: 'Social Justice Center',
        address: '789 Justice Way, Chicago, IL 60601, USA',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      price: { amount: 25, currency: 'US$' },
      description: 'Discussion on environmental justice and equitable climate solutions.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/climate-justice.jpg',
      status: 'upcoming'
    },
    {
      id: 'climate-10',
      title: 'Green Building Conference',
      date: 'May 19, 2024',
      time: '09:00 - 18:00 GMT-4',
      location: {
        name: 'Architecture Center',
        address: '321 Green Build Way, Miami, FL 33130, USA',
        coordinates: { lat: 25.7617, lng: -80.1918 }
      },
      price: { amount: 200, currency: 'US$' },
      description: 'Learn about sustainable architecture and green building practices.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/green-building.jpg',
      status: 'upcoming'
    }
  ],
  fitness: [
    {
      id: 'fitness-1',
      title: 'Urban Fitness Festival',
      date: 'Apr 8, 2024',
      time: '08:00 - 16:00 GMT-4',
      location: {
        name: 'Central Park',
        address: 'Central Park, New York, NY 10022, USA',
        coordinates: { lat: 40.7829, lng: -73.9654 }
      },
      price: { amount: 45, currency: 'US$' },
      description: 'A full day of outdoor fitness activities including HIIT workouts and yoga sessions.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'fitness-2',
      title: 'Marathon Training Camp',
      date: 'Apr 12, 2024',
      time: '07:00 - 11:00 GMT-4',
      location: {
        name: 'Running Track',
        address: '456 Runner\'s Lane, Boston, MA 02108, USA',
        coordinates: { lat: 42.3601, lng: -71.0589 }
      },
      price: { amount: 85, currency: 'US$' },
      description: 'Professional marathon training session with experienced coaches.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'fitness-3',
      title: 'CrossFit Competition',
      date: 'Apr 15, 2024',
      time: '09:00 - 17:00 GMT-4',
      location: {
        name: 'CrossFit Arena',
        address: '789 Strength Ave, Miami, FL 33130, USA',
        coordinates: { lat: 25.7617, lng: -80.1918 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'Regional CrossFit competition featuring elite athletes.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'fitness-4',
      title: 'Yoga in the Park',
      date: 'Apr 18, 2024',
      time: '07:30 - 09:00 GMT-4',
      location: {
        name: 'Sunset Park',
        address: '321 Zen Way, Los Angeles, CA 90012, USA',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      price: { amount: 20, currency: 'US$' },
      description: 'Morning yoga session in a beautiful outdoor setting.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/park-yoga.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-5',
      title: 'Boxing Bootcamp',
      date: 'Apr 21, 2024',
      time: '18:00 - 20:00 GMT-4',
      location: {
        name: 'Fight Club Gym',
        address: '567 Boxer Street, Chicago, IL 60601, USA',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      price: { amount: 30, currency: 'US$' },
      description: 'High-intensity boxing workout for all skill levels.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/boxing-bootcamp.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-6',
      title: 'Spin Class Marathon',
      date: 'Apr 24, 2024',
      time: '10:00 - 14:00 GMT-4',
      location: {
        name: 'Cycle Studio',
        address: '890 Spin Circle, Seattle, WA 98101, USA',
        coordinates: { lat: 47.6062, lng: -122.3321 }
      },
      price: { amount: 40, currency: 'US$' },
      description: 'Four-hour spinning event with multiple instructors and themed rides.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/spin-marathon.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-7',
      title: 'Rock Climbing Workshop',
      date: 'Apr 27, 2024',
      time: '11:00 - 15:00 GMT-4',
      location: {
        name: 'Climbing Gym',
        address: '123 Boulder Way, Denver, CO 80202, USA',
        coordinates: { lat: 39.7392, lng: -104.9903 }
      },
      price: { amount: 65, currency: 'US$' },
      description: 'Indoor climbing workshop for beginners and intermediate climbers.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/rock-climbing.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-8',
      title: 'Swimming Technique Clinic',
      date: 'Apr 30, 2024',
      time: '09:00 - 12:00 GMT-4',
      location: {
        name: 'Aquatic Center',
        address: '456 Pool Lane, San Diego, CA 92101, USA',
        coordinates: { lat: 32.7157, lng: -117.1611 }
      },
      price: { amount: 55, currency: 'US$' },
      description: 'Learn proper swimming techniques from professional coaches.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/swim-clinic.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-9',
      title: 'Pilates Masterclass',
      date: 'May 3, 2024',
      time: '14:00 - 16:00 GMT-4',
      location: {
        name: 'Pilates Studio',
        address: '789 Core Street, Austin, TX 78701, USA',
        coordinates: { lat: 30.2672, lng: -97.7431 }
      },
      price: { amount: 35, currency: 'US$' },
      description: 'Advanced Pilates session focusing on core strength and flexibility.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/pilates-class.jpg',
      status: 'upcoming'
    },
    {
      id: 'fitness-10',
      title: 'Functional Training Workshop',
      date: 'May 6, 2024',
      time: '08:00 - 11:00 GMT-4',
      location: {
        name: 'Fitness Center',
        address: '321 Function Ave, Portland, OR 97201, USA',
        coordinates: { lat: 45.5155, lng: -122.6789 }
      },
      price: { amount: 50, currency: 'US$' },
      description: 'Learn effective functional training techniques for everyday fitness.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/functional-training.jpg',
      status: 'upcoming'
    }
  ],
  wellness: [
    {
      id: 'wellness-1',
      title: 'Mindfulness & Meditation Retreat',
      date: 'Apr 13, 2024',
      time: '09:00 - 17:00 GMT-4',
      location: {
        name: 'Serenity Wellness Center',
        address: '321 Calm Street, Boulder, CO 80302, USA',
        coordinates: { lat: 40.0150, lng: -105.2705 }
      },
      price: { amount: 89, currency: 'US$' },
      description: 'A day of guided meditation and mindfulness practices.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'wellness-2',
      title: 'Sound Healing Journey',
      date: 'Apr 16, 2024',
      time: '19:00 - 21:00 GMT-4',
      location: {
        name: 'Sacred Sound Space',
        address: '456 Harmony Lane, Sedona, AZ 86336, USA',
        coordinates: { lat: 34.8697, lng: -111.7607 }
      },
      price: { amount: 45, currency: 'US$' },
      description: 'Experience the healing power of sound baths and crystal bowls.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'wellness-3',
      title: 'Holistic Health Workshop',
      date: 'Apr 19, 2024',
      time: '10:00 - 16:00 GMT-4',
      location: {
        name: 'Wellness Institute',
        address: '789 Natural Way, Portland, OR 97201, USA',
        coordinates: { lat: 45.5155, lng: -122.6789 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'Learn about natural healing methods and holistic health practices.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'wellness-4',
      title: 'Stress Management Seminar',
      date: 'Apr 22, 2024',
      time: '13:00 - 16:00 GMT-4',
      location: {
        name: 'Mind Body Center',
        address: '321 Balance Ave, San Francisco, CA 94105, USA',
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      price: { amount: 55, currency: 'US$' },
      description: 'Practical techniques for managing stress and anxiety.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/stress-management.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-5',
      title: 'Ayurvedic Cooking Class',
      date: 'Apr 25, 2024',
      time: '11:00 - 14:00 GMT-4',
      location: {
        name: 'Ayurveda Kitchen',
        address: '567 Spice Street, Austin, TX 78701, USA',
        coordinates: { lat: 30.2672, lng: -97.7431 }
      },
      price: { amount: 65, currency: 'US$' },
      description: 'Learn to cook nutritious meals based on Ayurvedic principles.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/ayurvedic-cooking.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-6',
      title: 'Digital Detox Weekend',
      date: 'Apr 28, 2024',
      time: '09:00 - 17:00 GMT-4',
      location: {
        name: 'Nature Retreat Center',
        address: '890 Forest Road, Asheville, NC 28801, USA',
        coordinates: { lat: 35.5951, lng: -82.5515 }
      },
      price: { amount: 150, currency: 'US$' },
      description: 'Disconnect from technology and reconnect with nature.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/digital-detox.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-7',
      title: 'Sleep Optimization Workshop',
      date: 'May 1, 2024',
      time: '18:00 - 20:00 GMT-4',
      location: {
        name: 'Sleep Research Center',
        address: '123 Dream Lane, Chicago, IL 60601, USA',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      price: { amount: 40, currency: 'US$' },
      description: 'Learn techniques for better sleep and improved rest.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/sleep-workshop.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-8',
      title: 'Plant Medicine Symposium',
      date: 'May 4, 2024',
      time: '10:00 - 17:00 GMT-4',
      location: {
        name: 'Botanical Center',
        address: '456 Herbal Way, Denver, CO 80202, USA',
        coordinates: { lat: 39.7392, lng: -104.9903 }
      },
      price: { amount: 95, currency: 'US$' },
      description: 'Explore the healing properties of medicinal plants.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/plant-medicine.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-9',
      title: 'Breathwork Intensive',
      date: 'May 7, 2024',
      time: '14:00 - 17:00 GMT-4',
      location: {
        name: 'Breath Center',
        address: '789 Oxygen Street, Miami, FL 33130, USA',
        coordinates: { lat: 25.7617, lng: -80.1918 }
      },
      price: { amount: 60, currency: 'US$' },
      description: 'Advanced breathing techniques for stress relief and energy.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/breathwork.jpg',
      status: 'upcoming'
    },
    {
      id: 'wellness-10',
      title: 'Energy Healing Workshop',
      date: 'May 10, 2024',
      time: '12:00 - 15:00 GMT-4',
      location: {
        name: 'Energy Center',
        address: '321 Crystal Way, Santa Fe, NM 87501, USA',
        coordinates: { lat: 35.6870, lng: -105.9378 }
      },
      price: { amount: 70, currency: 'US$' },
      description: 'Learn about different energy healing modalities and practices.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/energy-healing.jpg',
      status: 'upcoming'
    }
  ],
  crypto: [
    {
      id: 'crypto-1',
      title: 'Blockchain & Crypto Conference 2024',
      date: 'Apr 18, 2024',
      time: '10:00 - 18:00 GMT-4',
      location: {
        name: 'Digital Innovation Hub',
        address: '555 Crypto Ave, Miami, FL 33101, USA',
        coordinates: { lat: 25.7617, lng: -80.1918 }
      },
      price: { amount: 199, currency: 'US$' },
      description: 'Explore the latest developments in blockchain technology and cryptocurrency.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'crypto-2',
      title: 'DeFi Development Workshop',
      date: 'Apr 21, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Tech Campus',
        address: '456 Blockchain Street, San Francisco, CA 94105, USA',
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      price: { amount: 149, currency: 'US$' },
      description: 'Hands-on workshop for building decentralized finance applications.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: 'https://images.unsplash.com/photo-1645578843704-0163c6e99b2e?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'crypto-3',
      title: 'NFT Art Exhibition',
      date: 'Apr 24, 2024',
      time: '12:00 - 20:00 GMT-4',
      location: {
        name: 'Digital Art Gallery',
        address: '789 Token Lane, New York, NY 10012, USA',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      price: { amount: 50, currency: 'US$' },
      description: 'Showcase of digital art and NFT collections from leading artists.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop',
      status: 'upcoming'
    },
    {
      id: 'crypto-4',
      title: 'Crypto Trading Summit',
      date: 'Apr 27, 2024',
      time: '09:00 - 17:00 GMT-4',
      location: {
        name: 'Trading Center',
        address: '321 Exchange Way, Chicago, IL 60601, USA',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      price: { amount: 299, currency: 'US$' },
      description: 'Learn advanced cryptocurrency trading strategies from experts.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/trading-summit.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-5',
      title: 'Web3 Developer Conference',
      date: 'Apr 30, 2024',
      time: '10:00 - 18:00 GMT-4',
      location: {
        name: 'Developer Hub',
        address: '567 Web3 Street, Austin, TX 78701, USA',
        coordinates: { lat: 30.2672, lng: -97.7431 }
      },
      price: { amount: 179, currency: 'US$' },
      description: 'Conference focused on Web3 development and blockchain integration.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/web3-conference.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-6',
      title: 'Blockchain Gaming Expo',
      date: 'May 3, 2024',
      time: '11:00 - 19:00 GMT-4',
      location: {
        name: 'Gaming Arena',
        address: '890 Game Street, Los Angeles, CA 90015, USA',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      price: { amount: 75, currency: 'US$' },
      description: 'Explore the intersection of blockchain technology and gaming.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/gaming-expo.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-7',
      title: 'Cryptocurrency Regulation Forum',
      date: 'May 6, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Policy Center',
        address: '123 Regulation Road, Washington, DC 20001, USA',
        coordinates: { lat: 38.8977, lng: -77.0365 }
      },
      price: { amount: 225, currency: 'US$' },
      description: 'Discussion on cryptocurrency regulations and compliance.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/crypto-regulation.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-8',
      title: 'Metaverse Investment Summit',
      date: 'May 9, 2024',
      time: '10:00 - 17:00 GMT-4',
      location: {
        name: 'Virtual Reality Center',
        address: '456 Meta Street, Seattle, WA 98101, USA',
        coordinates: { lat: 47.6062, lng: -122.3321 }
      },
      price: { amount: 349, currency: 'US$' },
      description: 'Investment opportunities in metaverse and virtual worlds.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/metaverse-summit.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-9',
      title: 'Crypto Mining Workshop',
      date: 'May 12, 2024',
      time: '13:00 - 17:00 GMT-4',
      location: {
        name: 'Mining Facility',
        address: '789 Mining Way, Houston, TX 77002, USA',
        coordinates: { lat: 29.7604, lng: -95.3698 }
      },
      price: { amount: 125, currency: 'US$' },
      description: 'Learn about cryptocurrency mining operations and sustainability.',
      organizer: {
        id: 'nathan-benaich',
        name: 'Nathan Benaich (Air Street)',
        avatar: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        description: 'Leading organizer of technology conferences and summits in Silicon Valley.'
      },
      image: '/images/events/crypto-mining.jpg',
      status: 'upcoming'
    },
    {
      id: 'crypto-10',
      title: 'Blockchain for Business',
      date: 'May 15, 2024',
      time: '09:00 - 16:00 GMT-4',
      location: {
        name: 'Business Center',
        address: '321 Enterprise Way, Boston, MA 02110, USA',
        coordinates: { lat: 42.3601, lng: -71.0589 }
      },
      price: { amount: 275, currency: 'US$' },
      description: 'How businesses can implement blockchain technology effectively.',
      organizer: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
        description: 'AI Ethics researcher focused on responsible AI development.'
      },
      image: '/images/events/blockchain-business.jpg',
      status: 'upcoming'
    }
  ]
};

const categoryInfo = {
  ai: {
    name: 'Artificial Intelligence',
    description: 'Discover the latest in AI technology, machine learning, and data science.',
    socialLinks: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  'arts-culture': {
    name: 'Arts & Culture',
    description: 'Explore exhibitions, performances, and cultural events from around the world.',
    socialLinks: {
      instagram: '#',
      facebook: '#',
      website: '#'
    }
  },
  climate: {
    name: 'Climate Action',
    description: 'Join the movement for environmental sustainability and climate solutions.',
    socialLinks: {
      twitter: '#',
      instagram: '#',
      website: '#'
    }
  },
  fitness: {
    name: 'Fitness & Training',
    description: 'Get moving with workout sessions, training programs, and fitness challenges.',
    socialLinks: {
      instagram: '#',
      tiktok: '#',
      website: '#'
    }
  },
  wellness: {
    name: 'Wellness & Mindfulness',
    description: 'Focus on mental health, meditation, and holistic well-being.',
    socialLinks: {
      instagram: '#',
      facebook: '#',
      website: '#'
    }
  },
  crypto: {
    name: 'Cryptocurrency & Blockchain',
    description: 'Stay updated on blockchain technology, crypto markets, and decentralized finance.',
    socialLinks: {
      twitter: '#',
      telegram: '#',
      website: '#'
    }
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const info = categoryInfo[category as keyof typeof categoryInfo];
  const events = eventsByCategory[category as keyof typeof eventsByCategory] || [];
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  if (!info) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Category not found</h1>
        </div>
      </div>
    );
  }

  const selectedEventData = events.find(event => event.id === selectedEvent);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero Section */}
      <div className="pt-20 pb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white mb-8 tracking-wider"
          style={{ fontFamily: 'system-ui' }}
        >
          {info.name.split(' ').map((word, i) => (
            <div key={i} className="leading-tight">{word}</div>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 text-neutral-400 text-sm mb-6"
        >
          <span>Times in GMT+1 — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-300 max-w-2xl mx-auto mb-8"
        >
          {info.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          {Object.entries(info.socialLinks).map(([platform, link]) => (
            <Link
              key={platform}
              href={link}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <span className="sr-only">{platform}</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">Events</h2>
          <button className="px-4 py-2 rounded-lg bg-neutral-800/50 text-white text-sm hover:bg-neutral-700/50 transition-colors">
            + Submit Event
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedEvent(event.id)}
                className="w-full text-left"
              >
                <div className="bg-neutral-800/50 rounded-xl overflow-hidden hover:bg-neutral-800 transition-all h-full">
                  {/* Event Image */}
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    {/* Date and Time */}
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white text-lg font-medium group-hover:text-white/90 transition-colors mb-4 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      </svg>
                      <span className="line-clamp-1">{event.location.name}</span>
                    </div>
                    
                    {/* Footer: Organizer and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-700">
                          <img
                            src={event.organizer.avatar}
                            alt={event.organizer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-neutral-400 line-clamp-1">{event.organizer.name}</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {event.price.amount === 0 ? 'Free' : `${event.price.currency}${event.price.amount}`}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Drawer */}
      {selectedEventData && (
        <EventDrawer
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEventData}
        />
      )}
    </div>
  );
} 