import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building,
  Calendar,
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'full-time' | 'part-time';
  salary?: string;
  description: string;
  requirements: string[];
  postedAt: Date;
  deadline: Date;
  applications: number;
  remote: boolean;
  tags: string[];
  isBookmarked?: boolean;
}

const JobSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());

  // Mock job data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'internship',
      salary: '$2,000/month',
      description: 'Join our dynamic team as a Frontend Developer Intern and work on cutting-edge web applications using React, TypeScript, and modern development tools.',
      requirements: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
      postedAt: new Date('2024-01-15'),
      deadline: new Date('2024-02-15'),
      applications: 15,
      remote: false,
      tags: ['Frontend', 'React', 'Internship']
    },
    {
      id: '2',
      title: 'Data Analyst',
      company: 'DataSoft Inc.',
      location: 'Remote',
      type: 'full-time',
      salary: '$70,000/year',
      description: 'Analyze complex datasets and provide actionable insights to drive business decisions. Work with Python, SQL, and various data visualization tools.',
      requirements: ['Python', 'SQL', 'Tableau', 'Statistics'],
      postedAt: new Date('2024-01-12'),
      deadline: new Date('2024-02-12'),
      applications: 23,
      remote: true,
      tags: ['Data', 'Analytics', 'Python']
    },
    {
      id: '3',
      title: 'UI/UX Designer Intern',
      company: 'Creative Studio',
      location: 'New York, NY',
      type: 'internship',
      salary: '$1,800/month',
      description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Work closely with our design team to deliver exceptional user experiences.',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      postedAt: new Date('2024-01-10'),
      deadline: new Date('2024-02-10'),
      applications: 31,
      remote: false,
      tags: ['Design', 'UI/UX', 'Creative']
    },
    {
      id: '4',
      title: 'Backend Developer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      type: 'full-time',
      salary: '$85,000/year',
      description: 'Build scalable backend systems and APIs using Node.js, Python, and cloud technologies. Join a team focused on creating robust infrastructure.',
      requirements: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'],
      postedAt: new Date('2024-01-08'),
      deadline: new Date('2024-02-08'),
      applications: 18,
      remote: true,
      tags: ['Backend', 'Cloud', 'API']
    }
  ];

  const toggleBookmark = (jobId: string) => {
    const newBookmarks = new Set(bookmarkedJobs);
    if (newBookmarks.has(jobId)) {
      newBookmarks.delete(jobId);
    } else {
      newBookmarks.add(jobId);
    }
    setBookmarkedJobs(newBookmarks);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || 
                           job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                           (selectedLocation === 'remote' && job.remote);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-800';
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-blue-100 text-lg">Discover internships and career opportunities that match your skills</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="remote">Remote</option>
            <option value="san francisco">San Francisco</option>
            <option value="new york">New York</option>
            <option value="austin">Austin</option>
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.slice(0, 4).map((req, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      +{job.requirements.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {job.postedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {job.deadline.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applications} applicants</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <button
                  onClick={() => toggleBookmark(job.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarkedJobs.has(job.id)
                      ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {bookmarkedJobs.has(job.id) ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-12 shadow-lg text-center"
        >
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default JobSearch;