import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Analytics from './pages/Analytics';
import BiasAudit from './pages/BiasAudit';
import InterviewGenerator from './pages/InterviewGenerator';
import JDGenerator from "./pages/JDGenerator";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="main-container ml-64">
          <Navbar />
          <main className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/bias-audit" element={<BiasAudit />} />
              <Route path="/interview-generator" element={<InterviewGenerator />} />
              <Route path="/jd-generator" element={<JDGenerator />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
