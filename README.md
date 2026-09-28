# Weather App

A weather application built as a learning project to practice modern web development with **Next.js, TypeScript, CSS Modules, APIs, Agile development, and automated testing**.

## About

This project allows users to search for a location and view weather information for that location.

The application is being developed incrementally using an Agile-inspired workflow. Features are broken into smaller tasks, implemented, tested, and committed individually.

## Tech Stack

- **Next.js** — React framework
- **TypeScript** — Static typing
- **CSS Modules** — Component-scoped styling
- **Open-Meteo API** — Weather data
- **Vitest** — Unit testing
- **React Testing Library** — Component testing
- **Vercel** — Deployment

## Features

### Current

- [x] Location search input
- [x] Store searched location
- [ ] Connect location search to weather API
- [ ] Display current weather
- [ ] Display 7-day forecast
- [ ] Display weather conditions
- [ ] Display high and low temperatures
- [ ] Loading state
- [ ] Error handling
- [ ] Responsive design

### Future

- [ ] Fahrenheit/Celsius toggle
- [ ] Favorite locations
- [ ] Use current location
- [ ] Hourly forecast
- [ ] Dark mode

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd weather-app
```

Install dependencies:

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically update as you make changes to the source code.

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── SearchBar/
│       ├── SearchBar.tsx
│       └── SearchBar.module.css
├── lib/
└── types/
```

## Development Approach

This project is being developed as a hands-on learning exercise.

Development focuses on:

- Breaking features into small user stories
- Building features incrementally
- Writing tests alongside functionality
- Using TypeScript to define data structures
- Practicing API integration
- Using Git and Conventional Commits
- Reviewing and refactoring code as the project grows

### Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) format.

Examples:

```text
feat: add weather location search bar
fix: handle empty location searches
test: add search bar validation tests
refactor: extract weather API helper
style: update search bar layout
docs: update project README
```

## Learning Goals

The main purpose of this project is to gain practical experience with:

1. **Next.js and the App Router**
2. **TypeScript**
3. **API integration**
4. **CSS Modules**
5. **Automated testing**
6. **Agile development practices**
7. **Git and version control**
8. **Building and deploying a complete application**

## License

This project is for educational and portfolio purposes.