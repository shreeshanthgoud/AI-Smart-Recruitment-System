import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FairHire AI</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">John Recruiter</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
