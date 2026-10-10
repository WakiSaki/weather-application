# Weather App

A weather application built with Next.js, TypeScript, and CSS Modules that allows users to search for locations and view current weather conditions and forecasts.

**[View Live Demo](https://weather-application-pink-ten.vercel.app)**

## About

This project is a hands-on web development project focused on building a functional, responsive weather application.

Users can search for a location to retrieve current weather information, view a 7-day forecast, and explore upcoming weather conditions through an hourly forecast.

The application integrates with a weather API to retrieve weather data and uses TypeScript to define data structures and improve type safety.

Development follows an Agile-inspired workflow, with features broken into smaller tasks, implemented incrementally, tested, and committed individually.

## Features

### Implemented

- [x] Location search
- [x] Weather API integration
- [x] Display current weather conditions
- [x] Display current temperature
- [x] Display high and low temperatures
- [x] Display 7-day weather forecast
- [x] Display weather conditions and corresponding icons
- [x] Hourly weather forecast
- [x] Location autocomplete
- [x] Dynamic weather backgrounds
- [x] Smooth transitions between weather displays

### Planned

- [ ] Fahrenheit/Celsius toggle
- [ ] Favorite locations
- [ ] Use current location
- [ ] Dark mode
- [ ] Further responsive design improvements

## Tech Stack

- **Next.js** — React framework and application routing
- **React** — Component-based user interface
- **TypeScript** — Static typing and improved code maintainability
- **CSS Modules** — Component-scoped styling
- **Weather API** — Weather data and forecasts
- **Vitest** — Unit and component testing
- **React Testing Library** — Testing React components and user interactions
- **Git & GitHub** — Version control and source code management
- **Vercel** — Deployment and hosting

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

The application requires a weather API key.

Create a `.env.local` file in the project root and add the environment variables required by the application.

For example:

```env
WEATHER_API_KEY=your_api_key_here
```

Replace `WEATHER_API_KEY` with the actual variable name expected by your application, if different.

Obtain an API key from your weather data provider if you do not already have one.

**Important:** Never commit your actual API key or other secrets to GitHub. Keep private API keys on the server rather than exposing them through client-side environment variables.

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The development server supports hot reloading, allowing you to see many code changes reflected in the browser without manually restarting the server.

## Testing

Run the test suite using:

```bash
npm run test
```

Tests are written with Vitest and React Testing Library to verify component rendering and user interactions.

## Production Build

To create an optimized production build, run:

```bash
npm run build
```

To run the production build locally after building:

```bash
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ...
├── lib/
└── types/
```

The project uses the Next.js App Router, reusable React components, and TypeScript types to organize application logic and presentation.

The structure above is illustrative and may change as the project grows.

## Development Approach

This project is developed using an Agile-inspired workflow, emphasizing incremental improvements, testing, and maintainable code.

Development practices include:

- Breaking features into smaller tasks and user stories
- Implementing features incrementally
- Writing tests for components and user interactions
- Using TypeScript to define data structures and improve type safety
- Integrating external APIs
- Using Git for version control
- Following Conventional Commits
- Reviewing and refactoring code as the application evolves

### Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Examples:

```text
feat: add weather location search
fix: handle invalid location searches
test: add search bar validation tests
refactor: extract weather API helper
style: improve weather card layout
docs: update project README
```

## Learning Goals

This project provides practical experience with:

1. Next.js and the App Router
2. React component architecture
3. TypeScript and type safety
4. External API integration
5. CSS Modules and responsive styling
6. Automated testing with Vitest and React Testing Library
7. Agile-inspired development practices
8. Git and Conventional Commits
9. Production builds and application deployment

## License

This project is intended for educational and portfolio purposes.