import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Upload,
  Briefcase,
  UserCheck,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'excel-analysis', label: 'Excel Analysis', icon: Upload },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'jobs', label: 'Find Jobs', icon: Briefcase },
          { id: 'applications', label: 'My Applications', icon: FileText },
        ];
      case 'recruiter':
        return [
          ...baseItems,
          { id: 'post-job', label: 'Post Job', icon: Briefcase },
          { id: 'manage-jobs', label: 'Manage Jobs', icon: FileText },
          { id: 'candidates', label: 'Candidates', icon: Users },
        ];
      case 'admin':
        return [
          ...baseItems,
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'jobs-admin', label: 'Job Management', icon: Briefcase },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleColor = () => {
    switch (user?.role) {
      case 'student': return 'from-blue-500 to-purple-500';
      case 'recruiter': return 'from-purple-500 to-green-500';
      case 'admin': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'student': return Users;
      case 'recruiter': return UserCheck;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ZIDIOConnect
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50 lg:z-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  ZIDIOConnect
                </h1>
                
                {/* User Profile */}
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center`}>
                      <RoleIcon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setIsNotificationOpen(true)}
                      className="relative p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Bell className="w-5 h-5 text-gray-400" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4 flex-1">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </div>
  );
};

export default Layout;