// Candidate status options
export const CANDIDATE_STATUS = {
  APPLIED: 'Applied',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
};

// Score ranges and colors
export const SCORE_RANGES = {
  EXCELLENT: { min: 80, max: 100, label: 'Excellent', color: '#10b981', bgColor: '#ecfdf5' },
  GOOD: { min: 60, max: 79, label: 'Good', color: '#f59e0b', bgColor: '#fffbf0' },
  FAIR: { min: 40, max: 59, label: 'Fair', color: '#ef4444', bgColor: '#fef2f2' },
  POOR: { min: 0, max: 39, label: 'Poor', color: '#6b7280', bgColor: '#f9fafb' },
};

// Get score color based on value
export const getScoreColor = (score) => {
  if (score >= SCORE_RANGES.EXCELLENT.min) return SCORE_RANGES.EXCELLENT;
  if (score >= SCORE_RANGES.GOOD.min) return SCORE_RANGES.GOOD;
  if (score >= SCORE_RANGES.FAIR.min) return SCORE_RANGES.FAIR;
  return SCORE_RANGES.POOR;
};

// Interview roles
export const INTERVIEW_ROLES = [
  { value: 'developer', label: 'Software Developer' },
  { value: 'designer', label: 'UX/UI Designer' },
  { value: 'pm', label: 'Product Manager' },
  { value: 'data', label: 'Data Scientist' },
  { value: 'marketing', label: 'Marketing Manager' },
  { value: 'sales', label: 'Sales Manager' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'qa', label: 'QA Engineer' },
];

// Fairness metrics
export const FAIRNESS_METRICS = [
  { id: 'gender', label: 'Gender Parity', target: 85 },
  { id: 'education', label: 'Education Diversity', target: 90 },
  { id: 'age', label: 'Age Diversity', target: 80 },
  { id: 'background', label: 'Background Diversity', target: 85 },
  { id: 'geographic', label: 'Geographic Diversity', target: 85 },
];

// Skills list for filtering
export const COMMON_SKILLS = [
  'React',
  'Python',
  'AWS',
  'SQL',
  'Node.js',
  'Machine Learning',
  'TypeScript',
  'DevOps',
  'Leadership',
  'Communication',
  'Project Management',
  'Data Analysis',
];

// Time to hire thresholds
export const TIME_TO_HIRE_THRESHOLDS = {
  EXCELLENT: 14,
  GOOD: 21,
  FAIR: 30,
  NEEDS_IMPROVEMENT: 30,
};

// Analytics constants
export const CHART_COLORS = {
  PRIMARY: '#4F46E5',
  SECONDARY: '#818CF8',
  TERTIARY: '#C7D2FE',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  LIGHT: '#F3F4F6',
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'fairhire_user_prefs',
  DASHBOARD_FILTERS: 'fairhire_dashboard_filters',
  CANDIDATES_FILTERS: 'fairhire_candidates_filters',
  THEME: 'fairhire_theme',
};

// Date formatting
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Candidate score calculation
export const calculateCandidateScore = (factors) => {
  // Simple average of all factors
  const scores = Object.values(factors);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

// Export default object
export default {
  CANDIDATE_STATUS,
  SCORE_RANGES,
  INTERVIEW_ROLES,
  FAIRNESS_METRICS,
  COMMON_SKILLS,
  TIME_TO_HIRE_THRESHOLDS,
  CHART_COLORS,
  STORAGE_KEYS,
  getScoreColor,
  formatDate,
  calculateCandidateScore,
};
