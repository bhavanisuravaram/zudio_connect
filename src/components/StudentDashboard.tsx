import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Upload, 
  Briefcase, 
  FileText, 
  Bell,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock data - in production, this would come from your API
  const applications = [
    {
      id: '1',
      jobTitle: 'Frontend Developer Intern',
      company: 'TechCorp',
      status: 'pending',
      appliedAt: new Date('2024-01-15'),
      type: 'internship'
    },
    {
      id: '2',
      jobTitle: 'Data Analyst',
      company: 'DataSoft Inc.',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-10'),
      type: 'full-time'
    },
    {
      id: '3',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Studio',
      status: 'rejected',
      appliedAt: new Date('2024-01-05'),
      type: 'internship'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shortlisted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'accepted': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-800">{applications.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-gray-800">
                {applications.filter(app => app.status === 'shortlisted').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-2xl font-bold text-gray-800">47</p>
            </div>
            <Eye className="w-8 h-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bookmarks</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <Briefcase className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
        <div className="space-y-4">
          {applications.slice(0, 3).map((application) => (
            <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{application.jobTitle}</h4>
                  <p className="text-sm text-gray-600">{application.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
                {getStatusIcon(application.status)}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Profile Management</h3>
        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditingProfile ? 'Save' : 'Edit'}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{user?.name}</h4>
              <p className="text-gray-600">Computer Science Student</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">San Francisco, CA</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h5 className="font-medium text-gray-800 mb-3">Skills</h5>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="space-y-6">
          <div>
            <h5 className="font-medium text-gray-800 mb-3">Resume</h5>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Upload your resume</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h5 className="font-medium text-gray-800 mb-3">Bio</h5>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Tell us about yourself..."
              defaultValue="Passionate computer science student with experience in web development and data analysis. Looking for internship opportunities to apply my skills in real-world projects."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderApplications = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">My Applications</h3>
      
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-800">{application.jobTitle}</h4>
                <p className="text-gray-600">{application.company}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
                {getStatusIcon(application.status)}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Applied on {application.appliedAt.toLocaleDateString()}</span>
              <span className="capitalize">{application.type}</span>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Application</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const sections = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'applications', label: 'Applications', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-blue-100 text-lg">Manage your profile, applications, and career journey</p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <section.icon className="w-5 h-5" />
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'profile' && renderProfile()}
      {activeSection === 'applications' && renderApplications()}
    </div>
  );
};

export default StudentDashboard;