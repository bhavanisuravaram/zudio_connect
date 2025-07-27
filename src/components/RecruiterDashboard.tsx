import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Plus, 
  Eye,
  Edit3,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);

  // Mock data
  const jobs = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      type: 'internship',
      location: 'San Francisco, CA',
      salary: '$2000/month',
      applications: 15,
      status: 'active',
      postedAt: new Date('2024-01-10'),
      deadline: new Date('2024-02-15')
    },
    {
      id: '2',
      title: 'Data Analyst',
      type: 'full-time',
      location: 'Remote',
      salary: '$70,000/year',
      applications: 23,
      status: 'active',
      postedAt: new Date('2024-01-05'),
      deadline: new Date('2024-02-10')
    }
  ];

  const candidates = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      jobTitle: 'Frontend Developer Intern',
      status: 'pending',
      appliedAt: new Date('2024-01-15'),
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      jobTitle: 'Data Analyst',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-12'),
      skills: ['Python', 'SQL', 'Tableau']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
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
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-800">{jobs.filter(job => job.status === 'active').length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500" />
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
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-800">
                {jobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
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
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-gray-800">
                {candidates.filter(c => c.status === 'shortlisted').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-500" />
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
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {candidates.slice(0, 3).map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{candidate.name}</h4>
                  <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Performance</h3>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.applications} applications</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{job.applications}</p>
                  <p className="text-xs text-gray-500">applicants</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      {/* Header with Add Job Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Manage Jobs</h3>
        <button
          onClick={() => setShowJobForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {job.deadline.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  <strong>{job.applications}</strong> applications
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {job.type}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCandidates = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Candidates List */}
      <div className="grid gap-4">
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{candidate.name}</h4>
                  <p className="text-gray-600">{candidate.email}</p>
                  <p className="text-sm text-gray-500">Applied for: {candidate.jobTitle}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Applied {candidate.appliedAt.toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Shortlist
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Reject
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className="text-purple-100 text-lg">Manage job postings, review applications, and find the best talent</p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-purple-600 text-white shadow-md'
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
      {activeSection === 'jobs' && renderJobs()}
      {activeSection === 'candidates' && renderCandidates()}
    </div>
  );
};

export default RecruiterDashboard;