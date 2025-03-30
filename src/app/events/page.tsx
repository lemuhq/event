import Link from 'next/link';

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'Join us for the largest tech conference in the world with speakers from top companies.',
    date: 'June 15-17, 2025',
    location: 'San Francisco, CA',
    organizer: 'TechEvents Inc.',
    category: 'Technology',
    price: '$299',
  },
  {
    id: 2,
    title: 'Music Festival',
    description: 'A three-day music festival featuring top artists from around the world.',
    date: 'July 8-10, 2025',
    location: 'Austin, TX',
    organizer: 'SoundWave Productions',
    category: 'Music',
    price: '$150',
  },
  {
    id: 3,
    title: 'Design Workshop',
    description: 'Learn the latest design techniques from industry experts.',
    date: 'August 5, 2025',
    location: 'New York, NY',
    organizer: 'DesignHub',
    category: 'Design',
    price: '$75',
  },
  {
    id: 4,
    title: 'Marketing Summit',
    description: 'Discover new marketing strategies and network with professionals.',
    date: 'September 12-13, 2025',
    location: 'Chicago, IL',
    organizer: 'Marketing Pros',
    category: 'Marketing',
    price: '$199',
  },
  {
    id: 5,
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to investors.',
    date: 'October 5, 2025',
    location: 'Boston, MA',
    organizer: 'StartupLaunch',
    category: 'Business',
    price: 'Free',
  },
  {
    id: 6,
    title: 'Wellness Retreat',
    description: 'A weekend of wellness, yoga, and meditation by the beach.',
    date: 'November 18-20, 2025',
    location: 'Miami, FL',
    organizer: 'Mindful Living',
    category: 'Health & Wellness',
    price: '$350',
  },
];

export default function EventsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover and register for events that match your interests.
          </p>
        </div>
        
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="flex max-w-xl flex-col items-start border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-x-4 text-xs mb-2">
                  <time dateTime="2023-03-16" className="text-gray-500">
                    {event.date}
                  </time>
                  <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                    {event.category}
                  </div>
                </div>
                
                <div className="group">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary-default">
                    <Link href={`/events/${event.id}`} className="hover:underline">
                      {event.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-gray-500 mt-1 mb-2">{event.location}</div>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    By {event.organizer}
                  </div>
                  <div className="font-medium text-primary-default">
                    {event.price}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href={`/events/${event.id}`}
                    className="block w-full text-center rounded-md bg-primary-default px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-default"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="inline-flex shadow-sm rounded-md">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-900 rounded-l-md bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-primary-default focus:text-primary-default"
            >
              Previous
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-white bg-primary-default border border-primary-default hover:bg-primary-light focus:z-10 focus:ring-2 focus:ring-primary-default"
            >
              1
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-primary-default focus:text-primary-default"
            >
              2
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-primary-default focus:text-primary-default"
            >
              3
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-900 rounded-r-md bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-primary-default focus:text-primary-default"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 