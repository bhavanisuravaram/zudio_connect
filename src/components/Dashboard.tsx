import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Upload,
  Briefcase,
  BarChart3,
  Calendar,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Applications Sent', value: '12', icon: FileText, color: 'from-blue-500 to-purple-500' },
          { label: 'Interview Invites', value: '3', icon: Calendar, color: 'from-purple-500 to-pink-500' },
          { label: 'Excel Files Analyzed', value: '8', icon: Upload, color: 'from-green-500 to-teal-500' },
          { label: 'Skill Score', value: '85%', icon: Award, color: 'from-orange-500 to-red-500' },
        ];
      case 'recruiter':
        return [
          { label: 'Active Job Posts', value: '5', icon: Briefcase, color: 'from-blue-500 to-purple-500' },
          { label: 'Total Applications', value: '47', icon: FileText, color: 'from-purple-500 to-pink-500' },
          { label: 'Candidates Shortlisted', value: '12', icon: Users, color: 'from-green-500 to-teal-500' },
          { label: 'Data Reports Generated', value: '23', icon: BarChart3, color: 'from-orange-500 to-red-500' },
        ];
      case 'admin':
        return [
          { label: 'Total Users', value: '1,247', icon: Users, color: 'from-blue-500 to-purple-500' },
          { label: 'Active Jobs', value: '156', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
          { label: 'Files Processed', value: '892', icon: Upload, color: 'from-green-500 to-teal-500' },
          { label: 'System Health', value: '98%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const recentActivity = [
    { id: 1, action: 'Uploaded Excel file "Sales_Data_2024.xlsx"', time: '2 hours ago', type: 'upload' },
    { id: 2, action: 'Applied to Software Engineer position at TechCorp', time: '5 hours ago', type: 'application' },
    { id: 3, action: 'Generated 3D visualization for marketing data', time: '1 day ago', type: 'chart' },
    { id: 4, action: 'Interview scheduled with DataSoft Inc.', time: '2 days ago', type: 'interview' },
  ];

  const quickActions = user?.role === 'student' ? [
    { label: 'Upload Excel File', icon: Upload, color: 'from-blue-500 to-purple-500' },
    { label: 'Browse Jobs', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'View Applications', icon: FileText, color: 'from-green-500 to-teal-500' },
  ] : user?.role === 'recruiter' ? [
    { label: 'Post New Job', icon: Briefcase, color: 'from-blue-500 to-purple-500' },
    { label: 'Analyze Data', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
    { label: 'Review Candidates', icon: Users, color: 'from-green-500 to-teal-500' },
  ] : [
    { label: 'User Management', icon: Users, color: 'from-blue-500 to-purple-500' },
    { label: 'System Analytics', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
    { label: 'Platform Settings', icon: FileText, color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Welcome to your {user?.role} dashboard. Here's your activity overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-4 p-4 bg-gradient-to-r ${action.color} rounded-lg text-white hover:shadow-lg transition-all`}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  {activity.type === 'upload' && <Upload className="w-5 h-5 text-white" />}
                  {activity.type === 'application' && <FileText className="w-5 h-5 text-white" />}
                  {activity.type === 'chart' && <BarChart3 className="w-5 h-5 text-white" />}
                  {activity.type === 'interview' && <Calendar className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;