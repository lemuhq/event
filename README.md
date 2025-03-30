# EventWave - Modern Event Management Platform

EventWave is a comprehensive event management platform built with Next.js and Tailwind CSS. It provides event organizers with powerful tools to create, manage, and promote events of all sizes.

## Features

- **User Authentication**: Secure login, signup, and user management
- **Event Creation**: Create and customize event pages with rich text editing
- **Ticketing**: Set up various ticket types with flexible pricing options
- **Interactive Elements**: Engage with attendees through various interactive features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Analytics Dashboard**: Track and analyze event performance

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Rich Text Editing**: React Quill
- **UI Components**: Headless UI, Heroicons
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 20.x or later
- npm 9.x or later

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/events-frontend.git
cd events-frontend
```

2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application for production:

```bash
npm run build
```

### Starting Production Server

Start the production server:

```bash
npm run start
```

## Project Structure

```
events-frontend/
├── src/                    # Source files
│   ├── app/                # Next.js app directory
│   │   ├── auth/           # Authentication pages (login, signup)
│   │   ├── events/         # Event-related pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components (header, footer)
│   │   └── ui/             # UI components
│   └── lib/                # Shared utilities and helpers
├── public/                 # Static assets
└── tailwind.config.js      # Tailwind CSS configuration
```

## Notes for Further Development

### Backend Integration

This frontend application is designed to work with a backend API. To connect it to your backend:

1. Set up environment variables for API endpoints
2. Implement API service functions for data fetching
3. Replace mock data with real API calls

### Customization

- **Theme**: Modify the `tailwind.config.js` file to change the color scheme and styles
- **Components**: Extend or modify components in the `components` directory
- **Functionality**: Add new features by creating new pages or enhancing existing ones

## License

This project is licensed under the MIT License - see the LICENSE file for details.
