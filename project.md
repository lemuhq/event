Project Overview:
-----------------
You are to build the frontend for an event management platform that merges the best features of Luma and Eventbrite. This platform will allow organizers to create customizable event pages, manage ticketing, interact with attendees, and build communities. The frontend should be built using Next.js and styled with Tailwind CSS. It must be responsive, intuitive, and modern.

Key Features to Implement:
--------------------------
1. **User Authentication & Authorization:**
   - Implement signup, login, password reset, and 2FA (two-factor authentication) components.
   - Use secure session management with JWT tokens.

2. **Event Creation and Management:**
   - Develop pages/forms for event creation with a rich text editor for event descriptions.
   - Allow media uploads (images, videos) and dynamic content (headers, attachments).
   - Include customizable templates for event pages that allow drag-and-drop components (or configurable components).

3. **Ticketing & Payment Interface:**
   - Create forms for setting up various ticket types (free, paid, donation-based, early bird, group tickets).
   - Display pricing options, integrate with a payment API (e.g., Stripe) on the frontend for secure payment flows.
   - Show dynamic pricing and availability in real time.

4. **Interactive and Engagement Tools:**
   - Integrate live chat (using a React component or third-party library) on event pages.
   - Include interactive elements such as polls, Q&A sections, and feedback forms.
   - Build components for sending out notifications or reminders (integrated with the backend API).

5. **Community Building and Event Discovery:**
   - Develop a calendar view for events with filters and search functionality.
   - Implement user dashboards where organizers and attendees can see their events, registrations, and past interactions.
   - Include features for event rating and reviews.

6. **Marketing and Promotion:**
   - Create components for email signup forms and social media share buttons.
   - Design a “Featured Events” section on the homepage that pulls curated events from the backend.
   - Include integrations for advertising widgets and tracking pixels if necessary.

7. **Analytics Dashboard:**
   - Build a dashboard page for organizers showing event analytics (views, ticket sales, demographics, engagement metrics).
   - Use charts and graphs (e.g., with Chart.js or Recharts) for data visualization.

8. **Responsive and Accessible Design:**
   - Ensure all pages are mobile-friendly, using Tailwind CSS for styling.
   - Follow accessibility guidelines (WCAG) for all interactive elements.

Development Stages:
-------------------
Stage 1: Setup & Core Layout
  - Initialize a new Next.js project.
  - Install Tailwind CSS and set up the configuration.
  - Create a basic layout with a responsive header, footer, and navigation.

Stage 2: Authentication Flow
  - Implement pages for login, signup, and password reset.
  - Integrate JWT-based session handling with API calls to the backend.

Stage 3: Event Creation & Customization
  - Create a page for event creation with a form that includes rich text editing (e.g., using React Quill or similar).
  - Implement components for media uploads and dynamic content areas.
  - Provide UI options for customizing the look of event pages.

Stage 4: Ticketing & Payment UI
  - Build ticket creation forms with options for various pricing models.
  - Integrate a secure payment flow (mock API calls to Stripe endpoints initially).
  - Implement a checkout page that displays selected tickets and payment status.

Stage 5: Interactive & Community Features
  - Add live chat, Q&A, and poll components to the event page.
  - Create a calendar view and dashboard for event discovery.
  - Build community features such as member directories and discussion boards (if time allows).

Stage 6: Marketing, Analytics, and Final Touches
  - Integrate social media sharing and email marketing signup forms.
  - Create an analytics dashboard for event insights.
  - Refine responsive design and perform accessibility testing.
  - Write unit and integration tests for key components.

Notes:
------
- Ensure all API endpoints are properly secured and errors are handled gracefully.
- Use environment variables for configuration (e.g., API endpoints, payment keys).
- Keep the design minimalistic and intuitive, following modern UI/UX practices.
- Document your code and setup steps clearly in the repository.

Deliverables:
-------------
- A fully functional Next.js application with the features mentioned above.
- Well-documented code with comments and setup instructions.
- A README file explaining how to start the development server, run tests, and build the project.


use this as reference for the theme of the platform 
theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					light: "#F99B6D",
					default: "#FF5400",
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					light: "#2A2A2A",
					default: "#1C1C1C",
					medium: "#919EAB8F",
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				dark: "#292D32",
				textColor: {
					extraLight: "#919EAB",
					light: "#637381",
					default: "#212B36",
				},
				success: {
					light: "#22C55E29",
					default: "#118D57",
					secondary: "#68F611",
				},
				error: {
					light: "#FF563029",
					default: "#B71D18",
				},
				warning: {
					light: "#ED713C14",
					default: "#ED713C",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						h1: {
							color: '#111827',
							fontWeight: '700',
						},
						h2: {
							color: '#111827',
							fontWeight: '600',
						},
						'ul > li': {
							paddingLeft: '1.5em',
						},
						'ul > li::before': {
							backgroundColor: '#6B7280',
						},
					},
				},
			},
		},
	},