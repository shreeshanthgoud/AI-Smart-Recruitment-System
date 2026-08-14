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
  ScatterChart,
  Scatter,
} from 'recharts';

const Analytics = () => {
  const hiringFunnel = [
    { stage: 'Applied', count: 450, percentage: 100 },
    { stage: 'Screening', count: 280, percentage: 62 },
    { stage: 'Interview', count: 120, percentage: 27 },
    { stage: 'Offer', count: 35, percentage: 8 },
    { stage: 'Hired', count: 18, percentage: 4 },
  ];

  const skillsData = [
    { skill: 'React', count: 85 },
    { skill: 'Python', count: 72 },
    { skill: 'AWS', count: 68 },
    { skill: 'SQL', count: 65 },
    { skill: 'Node.js', count: 58 },
    { skill: 'Machine Learning', count: 42 },
    { skill: 'TypeScript', count: 38 },
    { skill: 'DevOps', count: 35 },
  ];

  const scoreDistribution = [
    { range: '80-100', count: 45, color: '#10b981' },
    { range: '60-79', count: 82, color: '#f59e0b' },
    { range: '40-59', count: 54, color: '#ef4444' },
    { range: '0-39', count: 12, color: '#9ca3af' },
  ];

  const timeToHireData = [
    { month: 'January', days: 32 },
    { month: 'February', days: 28 },
    { month: 'March', days: 25 },
    { month: 'April', days: 30 },
    { month: 'May', days: 27 },
    { month: 'June', days: 24 },
  ];

  const positionData = [
    { position: 'Developer', applications: 180, screened: 120, hired: 8 },
    { position: 'Designer', applications: 95, screened: 60, hired: 4 },
    { position: 'PM', applications: 75, screened: 45, hired: 3 },
    { position: 'Data', applications: 100, screened: 70, hired: 5 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Detailed recruitment analytics and insights</p>
      </div>

      {/* Hiring Funnel */}
      <div className="chart-container">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Hiring Funnel Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hiringFunnel}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="stage" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            <Bar dataKey="percentage" fill="#818CF8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Distribution and Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Skills Needed</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={skillsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="skill" type="category" stroke="#6b7280" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#4F46E5" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Candidate Score Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={scoreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, count }) => `${range}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time to Hire Trend */}
      <div className="chart-container">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Average Time to Hire (Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeToHireData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="days"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ fill: '#4F46E5', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Position Comparison */}
      <div className="chart-container">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recruitment by Position</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={positionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="position" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="applications" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            <Bar dataKey="screened" fill="#818CF8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="hired" fill="#C7D2FE" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="kpi-card">
          <p className="text-gray-600 text-sm font-medium">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">450</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">↑ 12% from last month</p>
        </div>
        <div className="kpi-card">
          <p className="text-gray-600 text-sm font-medium">Avg Time to Hire</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">24 days</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">↓ 3 days improvement</p>
        </div>
        <div className="kpi-card">
          <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">↑ 0.5% improvement</p>
        </div>
        <div className="kpi-card">
          <p className="text-gray-600 text-sm font-medium">Avg Score</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">72%</p>
          <p className="text-xs text-gray-600 font-semibold mt-2">Quality baseline</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;