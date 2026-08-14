import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, LineChart, AlertCircle, Zap, LogOut,FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/candidates', icon: Users, label: 'Candidates' },
    { path: '/analytics', icon: LineChart, label: 'Analytics' },
    { path: '/bias-audit', icon: AlertCircle, label: 'Bias Audit' },
    { path: '/interview-generator', icon: Zap, label: 'Interview' },
    {path: "/jd-generator",icon: FileText,label: "JD Generator"}
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-dark-secondary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">FairHire AI</h1>
            <p className="text-xs text-gray-400">Recruiter Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 space-y-2 px-4">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${isActive(path) ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-secondary bg-dark">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
