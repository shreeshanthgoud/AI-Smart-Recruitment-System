# FairHire AI - Deployment Guide

## Production Build

### Prerequisites
- Node.js 18+
- npm or yarn
- Web hosting (Vercel, Netlify, AWS, etc.)

### Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```
   This generates optimized files in the `dist/` directory

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

The frontend is deployed on Vercel; the FastAPI backend must be hosted separately
(for example, as a Render Web Service).

1. Deploy the backend using the instructions below and copy its public URL.
2. In Vercel, import the GitHub repository and set **Root Directory** to `frontend`.
3. Use the Vite defaults: build command `npm run build`, output directory `dist`.
4. Add the environment variable `VITE_API_URL` with the backend URL (no trailing slash).
5. Deploy. Add the resulting Vercel URL to the backend's `CORS_ORIGINS`.

#### Deploy the backend on Render

1. Create a **Web Service** from the same GitHub repository.
2. Set **Root Directory** to `backend`.
3. Set the build command to `pip install -r requirements.txt`.
4. Set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Add `OPENROUTER_API_KEY`, `MONGODB_URI`, and `CORS_ORIGINS` as Render environment
   variables. `CORS_ORIGINS` should contain your Vercel site URL.
6. Set Vercel's `VITE_API_URL` to the Render service URL and redeploy the frontend.

Use fresh credentials for production. The API key and database connection string
previously embedded in backend source must be rotated; removing them from the current
files does not remove copies from Git history.

### Option 2: Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Option 3: AWS S3 + CloudFront

1. Build the app: `npm run build`
2. Upload `dist/` folder to S3 bucket
3. Set up CloudFront distribution
4. Configure custom domain and HTTPS

### Option 4: Docker

1. Create Dockerfile:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create nginx.conf:
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

3. Build and run:
```bash
docker build -t fairhire-ai:latest .
docker run -p 80:80 fairhire-ai:latest
```

## Environment Configuration

### Production Environment Variables

```env
# API Configuration
VITE_API_URL=https://api.yourbackend.com

# App Environment
VITE_APP_ENV=production

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_BIAS_AUDIT=true
VITE_ENABLE_INTERVIEW_GENERATOR=true
```

## Performance Optimization

### Code Splitting
- Vite automatically code-splits route components
- Lazy loading with React Router

### Assets
- Images optimized with Vite
- CSS minified and purged by Tailwind
- JavaScript minified and tree-shaken

### Caching
- Use cache headers on CloudFront/CDN
- Set long cache expiry for hashed assets

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set up CORS properly on backend
- [ ] Remove console.log statements
- [ ] Validate all user inputs
- [ ] Use secure API endpoints
- [ ] Set CSP headers
- [ ] Enable HTTPS-only cookies
- [ ] Implement rate limiting
- [ ] Add error tracking (Sentry, etc.)

## Monitoring & Analytics

### Add Sentry for Error Tracking
```bash
npm install @sentry/react @sentry/tracing
```

### Google Analytics
Update App.jsx with your tracking ID

### Performance Monitoring
- Monitor Core Web Vitals
- Track API response times
- Monitor user interactions

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Procedure

1. Revert to previous commit
2. Rebuild: `npm run build`
3. Redeploy to hosting platform
4. Verify in production

## Troubleshooting Production Issues

### White Blank Page
- Check browser console for errors
- Verify API endpoint is accessible
- Check network tab for failed requests

### Slow Load Times
- Enable gzip compression on server
- Optimize images and assets
- Use CDN for static files
- Enable browser caching

### API Not Responding
- Verify backend is running
- Check CORS configuration
- Verify environment variables
- Check network connectivity

## Support

- Frontend Issues: Check build logs in deployment platform
- Backend Issues: Check API server logs
- Network Issues: Check browser DevTools Network tab
- Performance Issues: Use browser DevTools Lighthouse

## Next Steps

1. Set up automated backups
2. Implement monitoring and alerting
3. Create incident response procedures
4. Document runbooks for common issues
5. Schedule regular security audits
