import React, { useState, useRef } from 'react';
import { User, Briefcase, GraduationCap, Award, Phone, Mail, MapPin, Brain, Download, Eye, Edit3, Sparkles, Wand2 } from 'lucide-react';

const AIResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef();

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profilePicture: null,
      jobTitle: '',
      website: '',
      linkedin: ''
    },
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    education: [{
      institution: '',
      degree: '',
      graduationDate: '',
      gpa: ''
    }],
    skills: [],
    projects: [{
      name: '',
      description: '',
      technologies: ''
    }],
    certificates: [{
      name: '',
      issuer: '',
      date: '',
      url: ''
    }]
  });

  const templates = {
    modern: {
      name: 'Modern Professional',
      description: 'Clean, modern design with subtle colors',
      preview: '🎨'
    },
    classic: {
      name: 'Classic Traditional',
      description: 'Traditional black and white layout',
      preview: '📄'
    },
    creative: {
      name: 'Creative Bold',
      description: 'Colorful design for creative professionals',
      preview: '🌈'
    },
    minimal: {
      name: 'Minimal Clean',
      description: 'Ultra-clean minimalist design',
      preview: '⚪'
    },
    corporate: {
      name: 'Corporate Executive',
      description: 'Professional corporate style',
      preview: '💼'
    },
    palette: {
      name: 'Palette Pro',
      description: 'Colorful sidebar with profile picture',
      preview: '🎯'
    },
    zuckerberg: {
      name: 'Executive Purple',
      description: 'Purple accents with modern layout',
      preview: '👔'
    },
    benjamin: {
      name: 'Professional Dark',
      description: 'Dark sidebar with contact highlights',
      preview: '🖤'
    }
  };

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Experience', icon: Briefcase },
    { title: 'Education', icon: GraduationCap },
    { title: 'Skills & Projects', icon: Award },
    { title: 'Certificates', icon: Award }
  ];

  // AI-powered content suggestions
  const aiSuggestions = {
    summaries: [
      "Results-driven software developer with expertise in full-stack development and a passion for creating innovative solutions.",
      "Dynamic professional with strong analytical skills and experience in project management and team leadership.",
      "Creative problem-solver with expertise in modern web technologies and a track record of delivering high-quality applications.",
      "Experienced developer specializing in AI/ML applications with a focus on user-centric design and scalable architecture."
    ],
    skills: {
      'Software Development': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
      'Data Science': ['Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics'],
      'Web Development': ['HTML5', 'CSS3', 'React', 'Vue.js', 'Bootstrap', 'Responsive Design'],
      'AI/ML': ['Natural Language Processing', 'Computer Vision', 'Deep Learning', 'Neural Networks', 'PyTorch', 'Scikit-learn']
    },
    jobDescriptions: [
      "Developed and maintained scalable web applications using modern frameworks, resulting in improved user experience and system performance.",
      "Collaborated with cross-functional teams to design and implement innovative solutions, contributing to a 25% increase in productivity.",
      "Led the development of AI-powered features that enhanced product functionality and user engagement by 40%.",
      "Implemented best practices for code quality, testing, and deployment, reducing bug reports by 30%."
    ]
  };

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (section === 'skills') {
        newData[section] = value;
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const generateAIContent = async (type, context = '') => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let content = '';
    switch (type) {
      case 'summary':
        content = aiSuggestions.summaries[Math.floor(Math.random() * aiSuggestions.summaries.length)];
        handleInputChange('personalInfo', 'summary', content);
        break;
      case 'jobDescription':
        content = aiSuggestions.jobDescriptions[Math.floor(Math.random() * aiSuggestions.jobDescriptions.length)];
        return content;
      case 'skills':
        const skillCategory = context || 'Software Development';
        content = aiSuggestions.skills[skillCategory] || aiSuggestions.skills['Software Development'];
        handleInputChange('skills', null, content);
        break;
      default:
        break;
    }
    
    setIsGenerating(false);
    return content;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('personalInfo', 'profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      </div>
      
      {/* Profile Picture Section */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Picture (Optional)</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {resumeData.personalInfo.profilePicture ? (
              <img 
                src={resumeData.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-picture"
            />
            <label
              htmlFor="profile-picture"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
            >
              Upload Photo
            </label>
            {resumeData.personalInfo.profilePicture && (
              <button
                onClick={() => handleInputChange('personalInfo', 'profilePicture', null)}
                className="ml-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            )}
            <p className="text-sm text-gray-500 mt-2">JPG, PNG, or GIF (max 5MB)</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.fullName}
          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Job Title"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.jobTitle}
          onChange={(e) => handleInputChange('personalInfo', 'jobTitle', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.email}
          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.phone}
          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.location}
          onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
        />
        <input
          type="url"
          placeholder="Website (Optional)"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={resumeData.personalInfo.website}
          onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn Profile (Optional)"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none col-span-full"
          value={resumeData.personalInfo.linkedin}
          onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-gray-700">Professional Summary</label>
          <button
            onClick={() => generateAIContent('summary')}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'AI Generate'}
          </button>
        </div>
        <textarea
          placeholder="Write a brief professional summary..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] outline-none resize-none"
          value={resumeData.personalInfo.summary}
          onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
        />
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>
      </div>
      
      {resumeData.certificates.map((cert, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Certificate Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              value={cert.name}
              onChange={(e) => handleInputChange('certificates', 'name', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Issuing Organization"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              value={cert.issuer}
              onChange={(e) => handleInputChange('certificates', 'issuer', e.target.value, index)}
            />
            <input
              type="date"
              placeholder="Issue Date"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              value={cert.date}
              onChange={(e) => handleInputChange('certificates', 'date', e.target.value, index)}
            />
            <input
              type="url"
              placeholder="Certificate URL (Optional)"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              value={cert.url}
              onChange={(e) => handleInputChange('certificates', 'url', e.target.value, index)}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('certificates', {
          name: '', issuer: '', date: '', url: ''
        })}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors duration-200"
      >
        + Add Another Certificate
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      </div>
      
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={exp.company}
              onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Position Title"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={exp.position}
              onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
            />
            <input
              type="date"
              placeholder="Start Date"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={exp.startDate}
              onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
            />
            <input
              type="date"
              placeholder="End Date"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={exp.endDate}
              onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
              disabled={exp.current}
            />
          </div>
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-600">Currently working here</span>
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Job Description</label>
              <button
                onClick={async () => {
                  const description = await generateAIContent('jobDescription');
                  handleInputChange('experience', 'description', description, index);
                }}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3" />
                AI Enhance
              </button>
            </div>
            <textarea
              placeholder="Describe your key responsibilities and achievements..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] outline-none resize-none"
              value={exp.description}
              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('experience', {
          company: '', position: '', startDate: '', endDate: '', current: false, description: ''
        })}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
      >
        + Add Another Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
      </div>
      
      {resumeData.education.map((edu, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Institution Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              value={edu.institution}
              onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Degree"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              value={edu.degree}
              onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
            />
            <input
              type="date"
              placeholder="Graduation Date"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              value={edu.graduationDate}
              onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="GPA (Optional)"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              value={edu.gpa}
              onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('education', {
          institution: '', degree: '', graduationDate: '', gpa: ''
        })}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-500 transition-colors duration-200"
      >
        + Add Another Education
      </button>
    </div>
  );

  const renderSkillsAndProjects = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Skills & Projects</h2>
      </div>
      
      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-700">Technical Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(aiSuggestions.skills).map(category => (
              <button
                key={category}
                onClick={() => generateAIContent('skills', category)}
                disabled={isGenerating}
                className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-xs rounded-full hover:from-yellow-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-lg min-h-[60px] bg-gray-50">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm cursor-pointer hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              onClick={() => {
                const newSkills = resumeData.skills.filter((_, i) => i !== index);
                handleInputChange('skills', null, newSkills);
              }}
            >
              {skill} ×
            </span>
          ))}
          <input
            type="text"
            placeholder="Type a skill and press Enter..."
            className="flex-1 min-w-[200px] p-2 bg-transparent outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const newSkills = [...resumeData.skills, e.target.value.trim()];
                handleInputChange('skills', null, newSkills);
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Projects</h3>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mb-4 outline-none"
              value={project.name}
              onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
            />
            <textarea
              placeholder="Project Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mb-4 min-h-[80px] outline-none resize-none"
              value={project.description}
              onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
            />
            <input
              type="text"
              placeholder="Technologies Used (comma-separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              value={project.technologies}
              onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
            />
          </div>
        ))}
        
        <button
          onClick={() => addArrayItem('projects', {
            name: '', description: '', technologies: ''
          })}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-200"
        >
          + Add Another Project
        </button>
      </div>
    </div>
  );

  const renderPaletteTemplate = () => (
    <div ref={printRef} className="bg-white max-w-4xl mx-auto shadow-lg print-content flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-100 via-blue-100 to-yellow-100 p-6">
        {/* Profile Picture */}
        {resumeData.personalInfo.profilePicture && (
          <div className="mb-6 text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={resumeData.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Contacts</h3>
          <div className="space-y-2 text-sm">
            {resumeData.personalInfo.email && (
              <div><strong>E-mail:</strong> {resumeData.personalInfo.email}</div>
            )}
            {resumeData.personalInfo.phone && (
              <div><strong>Phone:</strong> {resumeData.personalInfo.phone}</div>
            )}
            {resumeData.personalInfo.location && (
              <div><strong>Address:</strong> {resumeData.personalInfo.location}</div>
            )}
            {resumeData.personalInfo.website && (
              <div><strong>Homepage:</strong> {resumeData.personalInfo.website}</div>
            )}
          </div>
        </div>

        {/* Personal Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Personal Summary</h3>
            <p className="text-sm leading-relaxed text-gray-700">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Skills</h3>
            <div className="text-sm text-gray-700">
              {resumeData.skills.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.fullName}</h1>
          {resumeData.personalInfo.jobTitle && (
            <p className="text-xl text-blue-600 font-semibold uppercase tracking-wide">
              {resumeData.personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Work Experience */}
        {resumeData.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-2">Work Experience</h2>
            {resumeData.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{exp.company}</h3>
                      <p className="text-gray-600 font-semibold">{exp.position}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {exp.startDate && new Date(exp.startDate).getFullYear()}
                      {exp.startDate && '-'}
                      {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-2">Education</h2>
            {resumeData.education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {edu.graduationDate && new Date(edu.graduationDate).getFullYear()}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some(project => project.name) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-2">Projects</h2>
            {resumeData.projects.map((project, index) => (
              project.name && (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-xs text-gray-600">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Certificates */}
        {resumeData.certificates.some(cert => cert.name) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-2">Certificates</h2>
            {resumeData.certificates.map((cert, index) => (
              cert.name && (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  {cert.date && <p className="text-xs text-gray-600">{new Date(cert.date).getFullYear()}</p>}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderZuckerbergTemplate = () => (
    <div ref={printRef} className="bg-white p-8 max-w-4xl mx-auto shadow-lg print-content">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">{resumeData.personalInfo.fullName}</h1>
          {resumeData.personalInfo.jobTitle && (
            <p className="text-xl text-purple-500 font-medium mb-4">{resumeData.personalInfo.jobTitle}</p>
          )}
          <div className="flex gap-6 text-gray-600 text-sm">
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        {resumeData.personalInfo.profilePicture && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 ml-6">
            <img 
              src={resumeData.personalInfo.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">SUMMARY</h2>
              <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.some(exp => exp.company || exp.position) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">EXPERIENCE</h2>
              {resumeData.experience.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-500">
                        <span className="bg-purple-100 px-2 py-1 rounded text-sm">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          {exp.startDate && ' - '}
                          {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education.some(edu => edu.institution || edu.degree) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">EDUCATION</h2>
              {resumeData.education.map((edu, index) => (
                (edu.institution || edu.degree) && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-purple-600 font-semibold">{edu.institution}</p>
                      </div>
                      <div className="text-right text-gray-500">
                        <span className="bg-purple-100 px-2 py-1 rounded text-sm">
                          {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.some(project => project.name) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">PROJECTS</h2>
              {resumeData.projects.map((project, index) => (
                project.name && (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                    {project.description && <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>}
                    {project.technologies && (
                      <p className="text-sm text-purple-600">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">SKILLS</h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {resumeData.certificates.some(cert => cert.name) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">CERTIFICATES</h2>
              {resumeData.certificates.map((cert, index) => (
                cert.name && (
                  <div key={index} className="mb-3 p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-gray-800">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    {cert.date && <p className="text-xs text-gray-500">{new Date(cert.date).getFullYear()}</p>}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBenjaminTemplate = () => (
    <div ref={printRef} className="bg-white max-w-4xl mx-auto shadow-lg print-content flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6">
        {/* Profile Picture */}
        {resumeData.personalInfo.profilePicture && (
          <div className="mb-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-white">
              <img 
                src={resumeData.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact Me */}
        <div className="mb-6">
          <h3 className="bg-gray-700 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide">Contact Me</h3>
          <div className="bg-gray-600 p-4 space-y-3 text-sm">
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="break-all">{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span className="break-all">{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {resumeData.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h3 className="bg-gray-700 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide">Education</h3>
            <div className="bg-gray-600 p-4 space-y-4">
              {resumeData.education.map((edu, index) => (
                (edu.institution || edu.degree) && (
                  <div key={index} className="text-sm">
                    <div className="font-bold">{edu.graduationDate && new Date(edu.graduationDate).getFullYear()}</div>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-gray-300">{edu.institution}</div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Pro Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="bg-gray-700 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide">Pro Skills</h3>
            <div className="bg-gray-600 p-4">
              <div className="space-y-2 text-sm">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{skill}</span>
                    <div className="w-20 h-2 bg-gray-400 rounded">
                      <div className="w-4/5 h-full bg-white rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certificates */}
        {resumeData.certificates.some(cert => cert.name) && (
          <div className="mb-6">
            <h3 className="bg-gray-700 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide">Certificates</h3>
            <div className="bg-gray-600 p-4 space-y-3">
              {resumeData.certificates.map((cert, index) => (
                cert.name && (
                  <div key={index} className="text-sm">
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-gray-300">{cert.issuer}</div>
                    {cert.date && <div className="text-xs text-gray-400">{new Date(cert.date).getFullYear()}</div>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.fullName}</h1>
          {resumeData.personalInfo.jobTitle && (
            <p className="text-xl text-gray-600 uppercase tracking-wide border-b-2 border-gray-800 pb-2">
              {resumeData.personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* About Me */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="bg-gray-800 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h2 className="bg-gray-800 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide mb-4">Work Experience</h2>
            {resumeData.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="mb-6 border-l-4 border-gray-800 pl-4">
                  <div className="mb-2">
                    <h3 className="font-bold text-gray-800 uppercase">{exp.position}</h3>
                    <p className="text-gray-600 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {exp.startDate && ' - '}
                      {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some(project => project.name) && (
          <div className="mb-8">
            <h2 className="bg-gray-800 text-white py-2 px-4 font-bold text-sm uppercase tracking-wide mb-4">Projects</h2>
            {resumeData.projects.map((project, index) => (
              project.name && (
                <div key={index} className="mb-4 border-l-4 border-gray-800 pl-4">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-xs text-gray-600">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderResume = () => {
    switch (selectedTemplate) {
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'corporate':
        return renderCorporateTemplate();
      case 'palette':
        return renderPaletteTemplate();
      case 'zuckerberg':
        return renderZuckerbergTemplate();
      case 'benjamin':
        return renderBenjaminTemplate();
      default:
        return renderModernTemplate();
    }
  };

  const renderModernTemplate = () => (
    <div ref={printRef} className="bg-white p-8 max-w-4xl mx-auto shadow-lg print-content">
      <div className="border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
        {resumeData.personalInfo.summary && (
          <p className="mt-4 text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">{resumeData.personalInfo.summary}</p>
        )}
      </div>
      {renderResumeContent()}
    </div>
  );

  const renderClassicTemplate = () => (
    <div ref={printRef} className="bg-white p-8 max-w-4xl mx-auto shadow-lg print-content">
      <div className="text-center border-b-2 border-black pb-6 mb-6">
        <h1 className="text-4xl font-bold text-black mb-4 uppercase tracking-wide">{resumeData.personalInfo.fullName}</h1>
        <div className="flex justify-center gap-6 text-black text-sm">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        {resumeData.personalInfo.summary && (
          <p className="mt-6 text-black leading-relaxed max-w-3xl mx-auto">{resumeData.personalInfo.summary}</p>
        )}
      </div>
      {renderResumeContent('classic')}
    </div>
  );

  const renderCreativeTemplate = () => (
    <div ref={printRef} className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 max-w-4xl mx-auto shadow-lg print-content">
      <div className="bg-white rounded-2xl p-8 shadow-inner">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {resumeData.personalInfo.fullName}
          </h1>
          <div className="flex justify-center gap-4 text-gray-600 mb-4">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1 bg-purple-100 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1 bg-pink-100 px-3 py-1 rounded-full">
                <Phone className="w-4 h-4 text-pink-600" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
          {resumeData.personalInfo.summary && (
            <p className="text-gray-700 leading-relaxed bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
        {renderResumeContent('creative')}
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div ref={printRef} className="bg-white p-12 max-w-4xl mx-auto shadow-lg print-content">
      <div className="mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-6">{resumeData.personalInfo.fullName}</h1>
        <div className="flex gap-8 text-gray-500 text-sm mb-8">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        {resumeData.personalInfo.summary && (
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">{resumeData.personalInfo.summary}</p>
        )}
      </div>
      {renderResumeContent('minimal')}
    </div>
  );

  const renderCorporateTemplate = () => (
    <div ref={printRef} className="bg-white p-8 max-w-4xl mx-auto shadow-lg print-content">
      <div className="bg-slate-800 text-white p-8 mb-8 -mx-8 -mt-8">
        <h1 className="text-4xl font-bold mb-4">{resumeData.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-200">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>
      {resumeData.personalInfo.summary && (
        <div className="mb-8 bg-slate-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Executive Summary</h2>
          <p className="text-slate-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}
      {renderResumeContent('corporate')}
    </div>
  );

  const renderResumeContent = (templateType = 'modern') => {
    const sectionHeaderClass = {
      modern: "text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2",
      classic: "text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2 uppercase tracking-wide",
      creative: "text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 pb-2",
      minimal: "text-2xl font-light text-gray-900 mb-8 uppercase tracking-widest",
      corporate: "text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-300 pb-2"
    };

    const skillTagClass = {
      modern: "px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm",
      classic: "px-3 py-1 bg-black text-white text-sm mr-2 mb-2 inline-block",
      creative: "px-3 py-1 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 rounded-full text-sm",
      minimal: "px-2 py-1 text-gray-600 text-sm border-b border-gray-300 mr-4",
      corporate: "px-3 py-1 bg-slate-200 text-slate-700 rounded text-sm"
    };

    return (
      <>
        {resumeData.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h2 className={sectionHeaderClass[templateType]}>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-lg text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-gray-500">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {exp.startDate && ' - '}
                      {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {resumeData.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h2 className={sectionHeaderClass[templateType]}>Education</h2>
            {resumeData.education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right text-gray-500">
                      {edu.graduationDate && <p>{new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>}
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className={sectionHeaderClass[templateType]}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className={skillTagClass[templateType]}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {resumeData.projects.some(project => project.name) && (
          <div className="mb-8">
            <h2 className={sectionHeaderClass[templateType]}>Projects</h2>
            {resumeData.projects.map((project, index) => (
              project.name && (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                  {project.description && <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-sm text-gray-600">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {resumeData.certificates.some(cert => cert.name) && (
          <div className="mb-8">
            <h2 className={sectionHeaderClass[templateType]}>Certificates</h2>
            {resumeData.certificates.map((cert, index) => (
              cert.name && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                    </div>
                    {cert.date && (
                      <span className="text-gray-500 text-sm">
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </>
    );
  };

  const renderTemplateSelector = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Resume Template
          </h2>
          <button
            onClick={() => setShowTemplateSelector(false)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(templates).map(([key, template]) => (
            <div
              key={key}
              onClick={() => {
                setSelectedTemplate(key);
                setShowTemplateSelector(false);
              }}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === key
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{template.preview}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                {selectedTemplate === key && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-full text-sm">
                    ✓ Selected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowTemplateSelector(false)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Continue with {templates[selectedTemplate].name}
          </button>
        </div>
      </div>
    </div>
  );

  const stepComponents = [
    renderPersonalInfo,
    renderExperience,
    renderEducation,
    renderSkillsAndProjects,
    renderCertificates
  ];

  const handleDownload = () => {
    window.print();
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-100">
        {showTemplateSelector && renderTemplateSelector()}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Resume Builder
              </h1>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {templates[selectedTemplate].name}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
              >
                🎨 Choose Template
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
                Edit Resume
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
        <div className="p-8">
          {renderResume()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {showTemplateSelector && renderTemplateSelector()}
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Resume Builder
                </h1>
                <p className="text-gray-600">Created by Gotam Dulhani</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
              >
                🎨 Templates
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                Preview Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index <= currentStep
                          ? 'bg-white text-purple-600 shadow-lg'
                          : 'bg-purple-500 bg-opacity-50 text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="mt-2 text-white text-center">
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="text-xs opacity-80">Step {index + 1}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {stepComponents[currentStep]()}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-6 flex items-center justify-between border-t">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  setShowPreview(true);
                } else {
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Eye className="w-4 h-4" />
                  Preview Resume
                </>
              ) : (
                <>
                  Next →
                </>
              )}
            </button>
          </div>
        </div>

        {/* Template Preview Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Multiple Professional Templates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professionally designed resume templates to match your style and industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(templates).map(([key, template]) => (
              <div
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  selectedTemplate === key
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{template.preview}</div>
                <h4 className="font-semibold text-sm text-gray-800 mb-1">{template.name}</h4>
                <p className="text-xs text-gray-600">{template.description}</p>
                {selectedTemplate === key && (
                  <div className="mt-2 text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                    ✓ Active
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowTemplateSelector(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
            >
              View All Templates
            </button>
          </div>
        </div>

        {/* AI Features Showcase */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Powered by Generative AI
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI assistant helps you create compelling resume content with intelligent suggestions and automated generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Content Generation</h3>
              <p className="text-gray-600">
                AI-powered professional summaries and job descriptions tailored to your experience.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Intelligent Skill Suggestions</h3>
              <p className="text-gray-600">
                Contextual skill recommendations based on your field and experience level.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-yellow-50 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multiple Templates</h3>
              <p className="text-gray-600">
                Choose from 8 professional templates designed for different industries and styles.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">💡 Template Selection Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">🎨 Creative Template</h4>
              <p className="text-sm opacity-90">Perfect for designers, artists, and creative professionals who want to showcase their personality.</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">💼 Corporate Template</h4>
              <p className="text-sm opacity-90">Ideal for executives, managers, and business professionals in traditional industries.</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">⚪ Minimal Template</h4>
              <p className="text-sm opacity-90">Great for professionals who prefer clean, uncluttered designs that focus on content.</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">📄 Classic Template</h4>
              <p className="text-sm opacity-90">Traditional format that works well for academic, legal, and formal business positions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AIResumeBuilder;
