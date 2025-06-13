import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Phone, MapPin, Building, Calendar, Shield, Bell, Eye, EyeOff, Save, Edit3, Camera } from 'lucide-react';

interface ProfileData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Professional Information
  currentEmployer: string;
  jobTitle: string;
  currentSalary: string;
  yearsOfExperience: string;
  education: string;
  
  // H1B Information
  h1bNumber: string;
  h1bStartDate: string;
  h1bEndDate: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    nationality: 'India',
    address: '123 Tech Street, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    currentEmployer: 'TechCorp Inc.',
    jobTitle: 'Senior Software Engineer',
    currentSalary: '120000',
    yearsOfExperience: '5',
    education: 'Master of Computer Science',
    h1bNumber: 'MSC2134567890',
    h1bStartDate: '2022-10-01',
    h1bEndDate: '2025-09-30',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1 (555) 987-6543',
    emergencyContactRelation: 'Spouse'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    documentReminders: true,
    paymentReminders: true,
    statusUpdates: true
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Send data to backend API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Update local auth store
      updateUser({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email
      });
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Building },
    { id: 'h1b', label: 'H1B Details', icon: Calendar },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </span>
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-900">
            {profileData.firstName} {profileData.lastName}
          </h4>
          <p className="text-gray-600">{profileData.jobTitle}</p>
          <p className="text-sm text-gray-500">{profileData.currentEmployer}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            value={profileData.nationality}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg ${
              isEditing 
                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                : 'border-gray-200 bg-gray-50'
            }`}
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Address Information
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={profileData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={profileData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              value={profileData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={profileData.emergencyContactName}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.emergencyContactPhone}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <select
              value={profileData.emergencyContactRelation}
              onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="border-t pt-6">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Professional Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Employer</label>
          <input
            type="text"
            value={profileData.currentEmployer}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            value={profileData.jobTitle}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary</label>
          <input
            type="text"
            value={`$${parseInt(profileData.currentSalary).toLocaleString()}`}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="text"
            value={`${profileData.yearsOfExperience} years`}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
          <input
            type="text"
            value={profileData.education}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  const renderH1BInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">H1B Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">H1B Receipt Number</label>
          <input
            type="text"
            value={profileData.h1bNumber}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
            <span className="text-sm text-gray-600">Valid until {new Date(profileData.h1bEndDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="text"
            value={new Date(profileData.h1bStartDate).toLocaleDateString()}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="text"
            value={new Date(profileData.h1bEndDate).toLocaleDateString()}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Transfer Status</h4>
        <p className="text-blue-800">Your H1B transfer application is currently being processed. Expected completion: 2-3 weeks.</p>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Update Password
        </button>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">SMS Authentication</p>
            <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Enable
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
      
      <div className="space-y-4">
        {[
          { key: 'emailUpdates', label: 'Email Updates', description: 'Receive general updates via email' },
          { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive urgent alerts via SMS' },
          { key: 'documentReminders', label: 'Document Reminders', description: 'Get notified about pending documents' },
          { key: 'paymentReminders', label: 'Payment Reminders', description: 'Receive payment due date reminders' },
          { key: 'statusUpdates', label: 'Status Updates', description: 'Get notified about application status changes' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.key as keyof typeof notifications]}
                onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile & Settings</h1>
          <p className="text-lg text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'professional' && renderProfessionalInfo()}
            {activeTab === 'h1b' && renderH1BInfo()}
            {activeTab === 'security' && renderSecurity()}
            {activeTab === 'notifications' && renderNotifications()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 