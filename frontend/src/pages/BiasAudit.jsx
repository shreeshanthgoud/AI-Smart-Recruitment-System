import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const BiasAudit = () => {
  const genderDistribution = [
    { name: 'Male', value: 240, color: '#3b82f6' },
    { name: 'Female', value: 185, color: '#ec4899' },
    { name: 'Non-binary', value: 25, color: '#8b5cf6' },
  ];

  const educationDistribution = [
    { name: "Bachelor's", count: 180 },
    { name: "Master's", count: 145 },
    { name: 'PhD', count: 35 },
    { name: 'Diploma', count: 40 },
    { name: 'High School', count: 25 },
  ];

  const ageDistribution = [
    { range: '20-25', count: 45 },
    { range: '25-30', count: 120 },
    { range: '30-35', count: 95 },
    { range: '35-40', count: 75 },
    { range: '40-50', count: 65 },
    { range: '50+', count: 25 },
  ];

  const fairnessMetrics = [
    { metric: 'Gender Parity', score: 78, status: 'warning' },
    { metric: 'Education Diversity', score: 85, status: 'success' },
    { metric: 'Age Diversity', score: 72, status: 'warning' },
    { metric: 'Background Diversity', score: 80, status: 'success' },
    { metric: 'Geographic Diversity', score: 88, status: 'success' },
  ];

  const radarData = [
    { metric: 'Gender', value: 78 },
    { metric: 'Education', value: 85 },
    { metric: 'Age', value: 72 },
    { metric: 'Background', value: 80 },
    { metric: 'Geography', value: 88 },
  ];

  const genderHireData = [
    { gender: 'Male', applied: 240, hired: 12 },
    { gender: 'Female', applied: 185, hired: 5 },
    { gender: 'Non-binary', applied: 25, hired: 1 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bias Audit</h1>
        <p className="text-gray-600 mt-2">Monitor fairness metrics in your recruitment process</p>
      </div>

      {/* Fairness Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {fairnessMetrics.map((item) => (
          <div key={item.metric} className="kpi-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium">{item.metric}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{item.score}%</p>
              </div>
              {item.status === 'success' ? (
                <CheckCircle className="text-emerald-600" size={24} />
              ) : (
                <AlertCircle className="text-amber-600" size={24} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Fairness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="chart-container lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Fairness Score Matrix</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar name="Score" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Score */}
        <div className="chart-container flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-6 w-full">Overall Fairness Score</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute" width="140" height="140">
              <circle cx="70" cy="70" r="65" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle
                cx="70"
                cy="70"
                r="65"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="4"
                strokeDasharray="254"
                strokeDashoffset="64"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px' }}
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">81%</p>
              <p className="text-xs text-gray-600">Very Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gender and Education Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Education Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Education Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={educationDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Age Distribution and Gender Hiring Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#818CF8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Hiring Rate */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Gender Hiring Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderHireData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="gender" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="applied" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="hired" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="chart-container">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recommendations</h3>
        <div className="space-y-3">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-amber-900">Gender Parity Needed</p>
              <p className="text-sm text-amber-800 mt-1">
                Currently at 78%. Consider expanding recruitment channels to reach more female candidates.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
            <TrendingUp className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-blue-900">Age Diversity Program</p>
              <p className="text-sm text-blue-800 mt-1">
                Implement initiatives to attract and support candidates from underrepresented age groups.
              </p>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex gap-3">
            <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-emerald-900">Education Diversity - Excellent</p>
              <p className="text-sm text-emerald-800 mt-1">
                Your recruitment process is attracting candidates from diverse educational backgrounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasAudit;
