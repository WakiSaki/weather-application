# Weather App

A responsive weather application built with Next.js, React, TypeScript, and CSS Modules. Search for a city to see current conditions, an upcoming daily forecast, and an hourly breakdown.

**[View Live Demo](https://weather-application-pink-ten.vercel.app)**

## Features

- **City search with autocomplete**: location suggestions appear after 2 characters, with a 300 ms debounce to limit API calls
- **Current conditions**: temperature in °F and °C, condition, icon, and date for the searched city
- **Daily forecast**: high/low temperatures and conditions for up to 6 upcoming days (the number of days depends on the WeatherAPI plan; the free plan returns 2 upcoming days)
- **Hourly breakdown**: the next 6 hours of the current day
- **Dynamic backgrounds**: the current-weather card shows a background image that matches the condition (sunny, cloudy, rainy, snow, stormy, foggy, wintry, dusty)
- **Skeleton loading state**: placeholder cards that match the real layout while data loads, announced to screen readers and respecting `prefers-reduced-motion`
- **Request cancellation**: a new search aborts the previous request, and outdated responses are ignored, so slow responses never overwrite newer results
- **Error alerts**: invalid searches and API failures show a message that dismisses itself after 5 seconds
- **Responsive layout**: adapts to screens 600 px wide and below

### Planned

- [ ] Fahrenheit/Celsius toggle
- [ ] Favorite locations
- [ ] Use current location
- [ ] Dark mode toggle (dark theme colors are defined but not yet switched on)
- [ ] Hourly breakdown that continues past midnight

## How It Works

The browser never calls WeatherAPI directly. The page calls two Next.js route handlers, which add the API key on the server:

| Route | Purpose |
| --- | --- |
| `GET /api/weather?location=<city>` | Fetches the forecast from WeatherAPI and converts it into the app's `WeatherData` type (`src/lib/weather.ts`) |
| `GET /api/locations?query=<text>` | Returns location suggestions for the search bar |

This keeps the API key out of the client bundle, and keeps the UI independent of the WeatherAPI response format.

## Tech Stack

- **Next.js 16** (App Router): routing and server-side API routes
- **React 19**: component-based UI, with the React Compiler enabled
- **TypeScript**: typed API responses and component props
- **CSS Modules**: component-scoped styling
- **[WeatherAPI.com](https://www.weatherapi.com/)**: weather data and location search
- **Vitest** and **React Testing Library**: component and integration tests
- **Vercel**: deployment and hosting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later
- npm
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

### Installation

```bash
git clone https://github.com/WakiSaki/weather-application.git
cd weather-application
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
WEATHER_API_KEY=your_api_key_here
```

`.env.local` is ignored by Git, so your key will not be committed.

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the tests in watch mode:

```bash
npm test
```

Run them once (for example, before committing):

```bash
npx vitest run
```

Tests cover the search bar, the weather and hourly cards, the skeleton loading state, and the page's loading, success, and error flows.

## Linting

```bash
npm run lint
```

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── locations/route.ts   # Location autocomplete endpoint
│   │   └── weather/route.ts     # Weather forecast endpoint
│   ├── layout.tsx
│   ├── page.tsx                 # Search, loading, and results logic
│   └── globals.css              # Theme colors and global styles
├── components/                  # UI components, CSS Modules, and tests
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   ├── ForecastCard.tsx
│   ├── HourlyForecast.tsx
│   ├── AlertMessage.tsx
│   ├── Skeleton.tsx
│   └── WeatherSkeleton.tsx
├── lib/weather.ts               # Converts WeatherAPI responses to WeatherData
├── utils/weatherBackground.ts   # Maps condition codes to backgrounds
├── types/                       # Shared TypeScript types
└── test/mocks/                  # Mock data for tests
public/weather/                  # Background images
```

## Development Approach

Features are broken into small tasks, implemented incrementally, tested, and committed individually using [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add weather location search
fix: handle invalid location searches
test: add search bar validation tests
style: improve weather card layout
docs: update project README
```

## License

This project is intended for educational and portfolio purposes.
