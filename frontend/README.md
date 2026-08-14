# FairHire AI - Premium Recruiter Dashboard

A modern, enterprise-grade SaaS recruiter dashboard built with React, Vite, Tailwind CSS, and Recharts.

## Features

- **Dashboard**: Real-time KPI cards, hiring funnel visualization, and recent candidates overview
- **Candidates**: Advanced search, score filtering, and detailed candidate profiles with modals
- **Analytics**: Comprehensive hiring analytics with charts for funnel, skills, and score distribution
- **Bias Audit**: Fairness metrics, diversity dashboards, and equity recommendations
- **Interview Generator**: AI-powered interview questions with rating rubric and best practices

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Custom components with Tailwind

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

5. Update `.env.local` with your API endpoint:
   ```
   VITE_API_URL=http://localhost:8000
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── CandidateCard.jsx
│   │   └── UploadResume.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Candidates.jsx
│   │   ├── Analytics.jsx
│   │   ├── BiasAudit.jsx
│   │   └── InterviewGenerator.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Theme

- **Primary Color**: Indigo (#4F46E5)
- **Sidebar**: Dark (#0F172A)
- **Accent**: Indigo with gradients
- **Typography**: Modern sans-serif system font

## API Integration

The frontend expects a FastAPI backend at `http://localhost:8000` with the following endpoints:

- `GET /candidates` - Fetch all candidates
- `GET /candidates/{id}` - Fetch candidate details
- `POST /upload` - Upload resume
- `GET /analytics` - Fetch analytics data
- `GET /bias-audit` - Fetch bias audit metrics
- `POST /generate-questions` - Generate interview questions
- `GET /dashboard` - Fetch dashboard data

## Features Detail

### Dashboard
- 4 KPI cards with trend indicators
- Interactive hiring funnel pie chart
- Recruitment trends line chart
- Recent candidates table with action buttons

### Candidates
- Full-text search by name, position, email
- Score-based filtering (80+, 70+, 60+)
- Candidate detail modal with comprehensive information
- Export functionality
- Responsive grid layout

### Analytics
- Hiring funnel bar chart with percentages
- Top skills horizontal bar chart
- Score distribution pie chart
- Time-to-hire trend line
- Position comparison grouped bar chart
- Summary statistics cards

### Bias Audit
- Fairness metrics scoring (5 dimensions)
- Overall fairness score with gauge visualization
- Gender distribution pie chart
- Education distribution bar chart
- Age distribution analysis
- Gender hiring rate comparison
- Radar chart for fairness matrix
- Actionable recommendations

### Interview Generator
- Role-based question generation
- Technical questions with context
- Behavioral questions with listening guides
- Rating rubric with weighted criteria
- Interview best practices tips
- Copy-to-clipboard functionality

## Responsive Design

- Mobile-first approach
- Tablet and desktop optimized layouts
- Flexible grid system
- Touch-friendly buttons and inputs
- Optimized table displays on small screens

## Animations

- Fade-in on page load
- Slide-up modals
- Smooth transitions on all interactive elements
- Hover effects for better UX

## License

Proprietary - FairHire AI

## Support

For issues or questions, contact support@fairhireai.com
