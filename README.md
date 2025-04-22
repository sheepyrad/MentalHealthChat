# MentalHealthChat

A web application designed to provide assistance, possibly related to stress management, featuring a chat interface.

## Project Overview

This project is a single-page application (SPA) built using modern web technologies. It features several sections including a dashboard, chat interface, user profile management, authentication, and informational pages.

**Key Features (based on routing):**
- Home Page (`/`)
- About Page (`/about`)
- Authentication (`/auth`)
- User Dashboard (`/dashboard`)
- Chat Interface (`/chat`)
- User Profile (`/profile`)
- Resources Page (`/resources`)

## Technologies Used

This project leverages the following technologies:

- **Frontend Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with shadcn-ui components
- **Routing:** React Router DOM (`react-router-dom`)
- **Data Fetching/State Management:** TanStack Query (`@tanstack/react-query`)
- **Context Management:** React Context API (`ChatProvider`, `ThemeProvider`)
- **UI Components:** shadcn/ui (Toaster, Sonner, Tooltip)

## Project Structure

```
MentalHealthChat/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # Reusable UI components (including shadcn/ui)
│   │   ├── ui/         # shadcn/ui generated components
│   │   └── ThemeProvider.tsx # Theme context provider
│   ├── context/        # Application-wide context (e.g., ChatContext.tsx)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and libraries
│   ├── pages/          # Page components corresponding to routes
│   │   ├── Index.tsx
│   │   ├── About.tsx
│   │   ├── Auth.tsx
│   │   ├── Chat.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   ├── Resources.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx         # Main application component with routing setup
│   ├── main.tsx        # Application entry point
│   ├── index.css       # Global styles (Tailwind base/utilities)
│   └── App.css         # Additional global or App-specific styles (if any)
├── .gitignore          # Git ignore rules
├── components.json     # shadcn/ui configuration
├── index.html          # HTML entry point for Vite
├── package.json        # Project metadata and dependencies
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # Base TypeScript configuration
├── tsconfig.app.json   # App-specific TypeScript configuration
├── tsconfig.node.json  # Node-specific TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Getting Started Locally

To run this project locally, ensure you have Node.js and npm (or yarn/pnpm/bun) installed.

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd stresswise-assistant

# 2. Install dependencies (choose your package manager)
npm install
# or
yarn install
# or
pnpm install
# or
bun install

# 3. Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the Vite development server, typically available at `http://localhost:5173`.

## Deployment

*(Information about deployment - e.g., using Vercel, Netlify, or other platforms - can be added here.)*

## Contributing

*(Information about contributing guidelines can be added here if applicable.)*
