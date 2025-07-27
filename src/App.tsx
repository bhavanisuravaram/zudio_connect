import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import AdminPanel from './components/AdminPanel';
import JobSearch from './components/JobSearch';
import ExcelAnalysis from './components/ExcelAnalysis';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading ZIDIOConnect...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user?.role === 'student') return <StudentDashboard />;
        if (user?.role === 'recruiter') return <RecruiterDashboard />;
        if (user?.role === 'admin') return <AdminPanel />;
        return <Dashboard />;
      case 'excel-analysis':
        return <ExcelAnalysis />;
      case 'jobs':
        return <JobSearch />;
      case 'applications':
        return <StudentDashboard />;
      case 'post-job':
      case 'manage-jobs':
      case 'candidates':
        return <RecruiterDashboard />;
      case 'users':
      case 'jobs-admin':
      case 'analytics':
      case 'settings':
        return <AdminPanel />;
      default:
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Coming Soon</h2>
            <p className="text-gray-600">This feature is under development.</p>
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <p className="text-green-800">Stay tuned for updates!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;