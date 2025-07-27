import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  Upload,
  Calendar,
  MessageSquare,
  Eye,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'application' | 'job' | 'upload' | 'system' | 'interview';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Frontend Developer Intern at TechCorp has been shortlisted!',
      read: false,
      createdAt: new Date('2024-01-20T10:30:00'),
      priority: 'high'
    },
    {
      id: '2',
      type: 'job',
      title: 'New Job Match',
      message: 'A new Data Analyst position at DataSoft Inc. matches your profile.',
      read: false,
      createdAt: new Date('2024-01-20T09:15:00'),
      priority: 'medium'
    },
    {
      id: '3',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for tomorrow at 2:00 PM with Creative Studio.',
      read: true,
      createdAt: new Date('2024-01-19T16:45:00'),
      priority: 'high'
    },
    {
      id: '4',
      type: 'upload',
      title: 'File Analysis Complete',
      message: 'Your Excel file "Sales_Data_2024.xlsx" has been processed successfully.',
      read: true,
      createdAt: new Date('2024-01-19T14:20:00'),
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Update',
      message: 'Your profile has been updated successfully. Make sure to keep it current!',
      read: true,
      createdAt: new Date('2024-01-18T11:30:00'),
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application': return CheckCircle;
      case 'job': return Briefcase;
      case 'upload': return Upload;
      case 'interview': return Calendar;
      case 'system': return AlertCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (priority === 'medium') return 'border-l-yellow-500 bg-yellow-50';
    
    switch (type) {
      case 'application': return 'border-l-green-500 bg-green-50';
      case 'job': return 'border-l-blue-500 bg-blue-50';
      case 'upload': return 'border-l-purple-500 bg-purple-50';
      case 'interview': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-600';
    if (priority === 'medium') return 'text-yellow-600';
    
    switch (type) {
      case 'application': return 'text-green-600';
      case 'job': return 'text-blue-600';
      case 'upload': return 'text-purple-600';
      case 'interview': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="w-12 h-12 mb-4 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
                          !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                        } hover:bg-opacity-75 transition-all cursor-pointer`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type, notification.priority)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <Trash2 className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            </div>
                            <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;