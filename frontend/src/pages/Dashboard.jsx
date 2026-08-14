import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Briefcase, TrendingUp, Target } from 'lucide-react';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [recentCandidates, setRecentCandidates] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setRecentCandidates([
      { id: 1, name: 'Alice Johnson', position: 'Senior Developer', score: 92, status: 'Interview' },
      { id: 2, name: 'Bob Smith', position: 'Product Manager', score: 85, status: 'Screening' },
      { id: 3, name: 'Carol Davis', position: 'UX Designer', score: 78, status: 'Applied' },
      { id: 4, name: 'David Wilson', position: 'Data Scientist', score: 88, status: 'Interview' },
    ]);
  }, []);

  const funnelData = [
    { name: 'Applied', value: 450 },
    { name: 'Screening', value: 280 },
    { name: 'Interview', value: 120 },
    { name: 'Offer', value: 35 },
    { name: 'Hired', value: 18 },
  ];

  const trendData = [
    { month: 'Jan', applications: 240, interviews: 120, offers: 24 },
    { month: 'Feb', applications: 290, interviews: 140, offers: 30 },
    { month: 'Mar', applications: 340, interviews: 180, offers: 38 },
    { month: 'Apr', applications: 380, interviews: 210, offers: 45 },
    { month: 'May', applications: 420, interviews: 250, offers: 52 },
    { month: 'Jun', applications: 450, interviews: 280, offers: 58 },
  ];

  const colors = ['#4F46E5', '#818CF8', '#C7D2FE', '#E0E7FF', '#F3F4F6'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to FairHire AI - Your premium recruiter dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value="450"
          subtitle="This month"
          icon={Users}
          trend={12}
        />
        <StatsCard
          title="Active Interviews"
          value="120"
          subtitle="In progress"
          icon={Briefcase}
          trend={8}
        />
        <StatsCard
          title="Offers Extended"
          value="35"
          subtitle="This month"
          icon={TrendingUp}
          trend={15}
        />
        <StatsCard
          title="Conversion Rate"
          value="4%"
          subtitle="Applied to Hired"
          icon={Target}
          trend={2}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring Funnel */}
        <div className="chart-container">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Hiring Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={funnelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div className="chart-container lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recruitment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
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
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="interviews" stroke="#818CF8" strokeWidth={2} />
              <Line type="monotone" dataKey="offers" stroke="#C7D2FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Candidates</h3>
          <button className="btn-primary">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900 font-medium">{candidate.name}</td>
                  <td className="py-4 px-4 text-gray-600">{candidate.position}</td>
                  <td className="py-4 px-4">
                    <span className={`badge ${candidate.score >= 80 ? 'badge-success' : candidate.score >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                      {candidate.score}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge badge-info">{candidate.status}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="btn-primary text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;