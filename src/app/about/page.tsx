import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About EventWave</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EventWave is a modern event management platform designed to help organizers create, manage, 
            and promote events of all sizes - from small workshops to large-scale conferences.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full lg:aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
              <div className="flex items-center justify-center h-full">
                <svg className="w-24 h-24 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Mission</h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We believe that events bring people together and create meaningful connections. Our mission is to simplify 
              the event management process, giving organizers powerful tools to create exceptional experiences for attendees.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              By combining intuitive design with powerful features, we aim to be the platform of choice for event 
              organizers worldwide, from individual creators to large organizations.
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">What We Offer</h3>
          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Event Creation</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Create beautiful event pages with custom branding, detailed descriptions, and multimedia content. 
                Our platform gives you complete creative control over how your event is presented.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Ticketing & Registration</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Set up multiple ticket types with flexible pricing options. Manage registrations, track sales, 
                and process payments securely through our integrated payment system.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Attendee Engagement</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Keep your audience engaged with interactive features like polls, Q&A sessions, and live chat. 
                Build community around your events and foster meaningful connections.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Marketing Tools</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Promote your events effectively with built-in marketing tools. Create email campaigns, 
                leverage social media integration, and utilize SEO features to maximize your reach.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Comprehensive Analytics</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Gain valuable insights with our detailed analytics dashboard. Track attendance, monitor ticket sales, 
                analyze audience demographics, and measure the success of your events.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold leading-8 text-gray-900">Seamless Experience</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Provide a smooth attendee experience from registration to post-event follow-up. 
                Our platform is designed to be intuitive and user-friendly for both organizers and attendees.
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="mx-auto mt-20 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ready to host your next event?</h3>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Join thousands of event organizers who trust EventWave for their events.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/signup"
              className="rounded-md bg-primary-default px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-default"
            >
              Get started for free
            </Link>
            <Link href="/events" className="text-sm font-semibold leading-6 text-gray-900">
              Browse events <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 