# Visa Checker

A modern, interactive visa requirement checking website built with React, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Visa Requirement Checker**: Check visa requirements between any two countries
- 📋 **Detailed Visa Information**: View comprehensive visa details including duration, cost, and processing time
- 📖 **Application Guide**: Step-by-step guide for visa application process
- 🌙 **Dark Mode**: Full dark mode support with system preference detection
- 📱 **Responsive Design**: Mobile-first design that works on all screen sizes
- ✨ **Modern UI**: Beautiful animations and interactive elements using Framer Motion
- 🎨 **Glassmorphism**: Modern design with glassmorphism effects and gradients

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
visa-checker/
├── src/
│   ├── components/      # React components
│   ├── data/          # Static visa data (JSON)
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Usage

1. **Check Visa Requirements**:
   - Select your origin country
   - Select your destination country
   - Click "Check Visa Requirements"
   - View the results with detailed information

2. **Application Guide**:
   - Navigate to the "Application Guide" tab
   - Follow the step-by-step process
   - Use the progress indicator to navigate between steps

## Data

The visa requirements data is stored in `src/data/visaData.json`. You can extend this file with more country pairs and requirements.

## Customization

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Animations**: Modify Framer Motion animations in component files
- **Data**: Update `src/data/visaData.json` to add more visa requirements

## License

This project is open source and available for personal and commercial use.

## Disclaimer

The information provided on this website is for reference purposes only. Always verify visa requirements with official government sources before traveling.

