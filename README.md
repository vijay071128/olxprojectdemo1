# RealtyHub - Premium Real Estate Marketplace

A modern real estate platform built with React, TypeScript, and Tailwind CSS. Find your perfect property from our collection of houses, apartments, villas, and land for sale or rent.

## Features

- 🏠 Browse properties by category (Houses, Apartments, Villas, Land)
- 🛒 Buy, Rent, and Sell listings
- ❤️ Save favorite properties
- 🔍 Advanced search functionality
- 📱 Responsive design
- 🔐 User authentication
- 📝 Property management (add, edit, delete)

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies
```bash
npm install
```

3. Start the backend server
```bash
cd backend
npm install
npm start
```

4. Start the frontend development server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions
│   └── data/          # Static data and types
├── backend/           # Express.js backend
└── public/            # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
