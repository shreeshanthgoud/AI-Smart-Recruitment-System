import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  const isPositive = trend && trend > 0;

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
          {trend && (
            <div className={`mt-2 text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Icon className="text-indigo-600" size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
