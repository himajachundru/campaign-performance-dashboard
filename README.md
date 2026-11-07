
# Campaign Performance Dashboard

A responsive React dashboard designed to monitor and analyze existing campaign performance using interactive visualizations, KPI cards, and filters.

## Features

- Organization-wide campaign overview
- Campaign-specific performance analysis
- Reusable KPI cards
- Interactive bar and line charts
- Campaign and date-range filters
- Responsive desktop and mobile layouts
- Client-side routing
- API data fetching with Axios
- Lazy loading and code splitting
- Loading, error, and empty-data states

## Tech Stack

- React
- JavaScript
- HTML5 and CSS3
- Vite
- React Router
- Recharts
- Axios
- Git and GitHub

## Getting Started

### Prerequisites

Node.js and npm

### Installation

1. Clone this repository:

   git clone https://github.com/himajachundru/campaign-performance-dashboard.git

2. Navigate into the project:

   cd campaign-performance-dashboard

3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

Open the local URL displayed in the terminal.

## Production Build

Run:

    npm run build

Preview the build:

    npm run preview

## Application Pages

### Overview
Displays overall campaign metrics, including total campaigns, targets, reach, achievement percentage, and campaign-wise progress bars.

### Performance
Displays individual campaign metrics and interactive visualizations, with campaign and date-range filtering.

## Data Source

This project uses fictional sample campaign data stored in `public/api/campaigns.json`. Data is retrieved through an HTTP request using Axios.

No live backend or real organizational data is included.

## Purpose

This is a portfolio recreation demonstrating frontend concepts used in campaign performance monitoring, including reusable React components, REST-style data retrieval, responsive UI development, and performance optimization techniques.

## Author

Himaja Chundru
