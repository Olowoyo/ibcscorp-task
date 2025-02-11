# React Dashboard with CRUD Operations

A responsive React dashboard application built with TypeScript, React Query, and Tailwind CSS that demonstrates CRUD operations using JSONPlaceholder API.

## Features

- 📱 Responsive design using Tailwind CSS
- 🔄 CRUD operations (Create, Read, Update, Delete)
- 🔍 Search functionality with debouncing
- ⚡ Real-time updates using React Query
- 📊 Sortable columns
- 📝 Pagination
- 🎨 Modern UI with loading states and toasts
- 📱 Mobile-friendly interface

## Technologies

- React 19
- TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- Axios
- React Hot Toast

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Olowoyo/ibcscorp-task.git
cd ibcscorp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── client.ts          # API client configuration
├── components/
│   ├── Dashboard/
│   │   ├── DataTable.tsx
│   │   ├── Filters.tsx
│   │   ├── LoadingState.tsx
│   │   └── Pagination.tsx
│   └── Modal/
│       ├── ConfirmDialog.tsx
│       ├── CreateForm.tsx
│       └── EditForm.tsx
├── hooks/
│   └── useDebounce.ts
├── types/
└── App.tsx
```

## Features in Detail

### Data Management

- Fetch and display user data from JSONPlaceholder API
- Client-side search with debounced input
- Sortable columns (name, email, phone, website, company)
- Pagination with customizable items per page

### CRUD Operations

- Create new users with form validation
- Update existing user information
- Delete users with confirmation dialog
- Real-time updates using React Query

### UI/UX

- Responsive design that works on mobile and desktop
- Loading states for better user experience
- Toast notifications for success/error feedback
- Clean and modern interface using Tailwind CSS

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the fake REST API
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [React Query](https://tanstack.com/query/latest) for data fetching
