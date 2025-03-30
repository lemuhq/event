'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';

// Mock data for user's events
const myEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: 'June 15-17, 2025',
    location: 'San Francisco, CA',
    attendees: 352,
    ticketsSold: 427,
    revenue: 128073,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Design Workshop',
    date: 'August 5, 2025',
    location: 'New York, NY',
    attendees: 48,
    ticketsSold: 52,
    revenue: 3900,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Product Launch Webinar',
    date: 'April 10, 2025',
    location: 'Online',
    attendees: 1024,
    ticketsSold: 1024,
    revenue: 0,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Annual Developer Meetup',
    date: 'January 15, 2025',
    location: 'Austin, TX',
    attendees: 215,
    ticketsSold: 230,
    revenue: 6900,
    status: 'past',
  },
  {
    id: 5,
    title: 'Marketing Summit',
    date: 'December 10, 2024',
    location: 'Chicago, IL',
    attendees: 178,
    ticketsSold: 195,
    revenue: 19500,
    status: 'past',
  },
];

// Mock data for registered events
const registeredEvents = [
  {
    id: 101,
    title: 'Music Festival',
    date: 'July 8-10, 2025',
    location: 'Austin, TX',
    ticketType: 'VIP Pass',
    ticketQuantity: 2,
    orderDate: 'March 15, 2025',
    status: 'confirmed',
  },
  {
    id: 102,
    title: 'Startup Pitch Night',
    date: 'October 5, 2025',
    location: 'Boston, MA',
    ticketType: 'General Admission',
    ticketQuantity: 1,
    orderDate: 'February 28, 2025',
    status: 'confirmed',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardPage() {
  const [tabCategories] = useState({
    'My Events': myEvents.filter(event => event.status === 'upcoming'),
    'Past Events': myEvents.filter(event => event.status === 'past'),
    'Registered Events': registeredEvents,
  });

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dashboard</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Manage your events and see your registrations.
          </p>
        </div>
        
        <div className="mt-10 flex flex-col md:flex-row gap-8">
          {/* Stats */}
          <div className="md:w-1/4">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Statistics</h3>
                
                <dl className="mt-5 grid grid-cols-1 gap-5">
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Events</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{myEvents.length}</dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Attendees</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      {myEvents.reduce((sum, event) => sum + event.attendees, 0)}
                    </dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Revenue</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      ${myEvents.reduce((sum, event) => sum + event.revenue, 0).toLocaleString()}
                    </dd>
                  </div>
                </dl>
                
                <div className="mt-6">
                  <Link
                    href="/events/create"
                    className="block w-full rounded-md bg-primary-default px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-default"
                  >
                    Create New Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="md:w-3/4">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                {Object.keys(tabCategories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-default focus:outline-none',
                        selected
                          ? 'bg-white text-primary-default shadow'
                          : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-default'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {/* My Events Tab */}
                <Tab.Panel className="rounded-xl bg-white p-3">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Date</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Location</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Attendees</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {tabCategories['My Events'].map((event) => (
                          <tr key={event.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {event.title}
                            </td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">{event.date}</td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{event.location}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.attendees} / {event.ticketsSold}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${event.revenue.toLocaleString()}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/events/${event.id}/manage`} className="text-primary-default hover:text-primary-light">
                                Manage<span className="sr-only">, {event.title}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                
                {/* Past Events Tab */}
                <Tab.Panel className="rounded-xl bg-white p-3">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Date</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Location</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Attendees</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {tabCategories['Past Events'].map((event) => (
                          <tr key={event.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {event.title}
                            </td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">{event.date}</td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{event.location}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.attendees} / {event.ticketsSold}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${event.revenue.toLocaleString()}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/events/${event.id}/analytics`} className="text-primary-default hover:text-primary-light">
                                Analytics<span className="sr-only">, {event.title}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                
                {/* Registered Events Tab */}
                <Tab.Panel className="rounded-xl bg-white p-3">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Date</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Location</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ticket</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {tabCategories['Registered Events'].map((event) => (
                          <tr key={event.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {event.title}
                            </td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">{event.date}</td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">{event.location}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {event.ticketType} ({event.ticketQuantity})
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {event.status}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/events/${event.id}`} className="text-primary-default hover:text-primary-light">
                                View<span className="sr-only">, {event.title}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
} 