# FairHire AI - Setup & Installation Guide

## Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9+ or yarn 3+
- FastAPI backend running on port 8000

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your settings:
   ```
   VITE_API_URL=http://localhost:8000
   VITE_APP_ENV=development
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Required Backend Endpoints

Ensure your FastAPI backend provides these endpoints:

### Candidates
- `GET /candidates` - List all candidates
- `GET /candidates/{id}` - Get candidate details
- `POST /candidates` - Create new candidate
- `PUT /candidates/{id}` - Update candidate
- `DELETE /candidates/{id}` - Delete candidate

### Resume Upload
- `POST /upload` - Upload and parse resume
- `POST /upload-resume` - Alternative upload endpoint

### Analytics
- `GET /analytics` - Get analytics dashboard data
- `GET /analytics/funnel` - Get hiring funnel data
- `GET /analytics/skills` - Get skills distribution

### Bias Audit
- `GET /bias-audit` - Get fairness metrics
- `GET /bias-audit/gender` - Gender distribution
- `GET /bias-audit/education` - Education distribution
- `GET /bias-audit/age` - Age distribution

### Interview
- `POST /generate-questions` - Generate interview questions
- `GET /interview-templates/{role}` - Get role templates

### Dashboard
- `GET /dashboard` - Get dashboard overview data

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── constants.js       # Constants and utility functions
│   ├── App.jsx            # Root component with routing
│   ├── main.jsx           # React DOM render
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── README.md              # Documentation
```

## Key Technologies

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS
- **Recharts** - Charting library
- **Axios** - HTTP client
- **React Router 6** - Client-side routing
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## Features Implemented

### ✅ Dashboard
- KPI cards with trend indicators
- Hiring funnel pie chart
- Recruitment trends line chart
- Recent candidates table

### ✅ Candidates
- Full-text search
- Score-based filtering
- Candidate detail modal
- Export functionality
- Responsive card layout

### ✅ Analytics
- Hiring funnel analysis
- Top skills distribution
- Score distribution
- Time-to-hire trends
- Position comparison

### ✅ Bias Audit
- Fairness metrics dashboard
- Gender/education/age distribution
- Radar chart analysis
- Equity recommendations
- Hiring rate comparison

### ✅ Interview Generator
- Role-based question generation
- Technical questions
- Behavioral questions
- Rating rubric
- Interview best practices

## Styling

All styling is done with Tailwind CSS. Key configurations:

- **Primary Color**: Indigo (#4F46E5)
- **Dark Sidebar**: #0F172A
- **Background**: White with gray-50 accents
- **Responsive**: Mobile-first, tablet, desktop

## API Integration

The app uses Axios for HTTP requests. Modify the API base URL in:
- `.env.local` - `VITE_API_URL` environment variable
- `src/services/api.js` - Axios instance configuration

## Development Tips

1. **Hot Module Replacement (HMR)** - Changes auto-refresh
2. **Tailwind IntelliSense** - Install VS Code extension
3. **React DevTools** - Browser extension for debugging
4. **Mock Data** - Using mock data in development, replace with real API calls

## Troubleshooting

### Issue: CORS errors
**Solution**: Ensure backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: API not responding
**Solution**: 
- Check backend is running on port 8000
- Verify `VITE_API_URL` in `.env.local`
- Check network tab in DevTools

### Issue: Styles not loading
**Solution**:
- Clear `.vite` cache: `rm -rf .vite`
- Reinstall Tailwind: `npm install -D tailwindcss`

## Performance Optimization

- Code splitting with React Router lazy loading
- Image optimization with WebP
- CSS minification in production
- Tree-shaking of unused dependencies

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

1. Connect to your FastAPI backend
2. Implement real API calls (replace mock data)
3. Add authentication/authorization
4. Customize branding and colors
5. Deploy to production

## Support & Documentation

- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com
- Recharts Docs: https://recharts.org
- Vite Docs: https://vitejs.dev
