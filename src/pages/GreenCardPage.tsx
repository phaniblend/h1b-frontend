import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, User, Phone, ArrowRight, Home } from 'lucide-react';

interface EligibilityData {
  yearsInUS: string;
  currentStatus: string;
  education: string;
  experience: string;
  employer: string;
  priority: string;
}

const GreenCardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [eligibilityData, setEligibilityData] = useState<EligibilityData>({
    yearsInUS: '',
    currentStatus: '',
    education: '',
    experience: '',
    employer: '',
    priority: ''
  });
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);
  const [showConsultForm, setShowConsultForm] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'eligibility', label: 'Eligibility Check', icon: CheckCircle },
    { id: 'tracker', label: 'Case Tracker', icon: Clock },
    { id: 'consultation', label: 'Attorney Consult', icon: User }
  ];

  const handleEligibilityCheck = () => {
    // Simple eligibility logic
    const years = parseInt(eligibilityData.yearsInUS);
    const hasAdvancedDegree = eligibilityData.education === 'masters' || eligibilityData.education === 'phd';
    const hasExperience = parseInt(eligibilityData.experience) >= 3;

    if (years >= 3 && hasAdvancedDegree && hasExperience) {
      setEligibilityResult('highly-eligible');
    } else if (years >= 2 && (hasAdvancedDegree || hasExperience)) {
      setEligibilityResult('eligible');
    } else {
      setEligibilityResult('not-ready');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEligibilityData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Green Card Processing</h1>
          <p className="text-xl text-gray-600">Your path to permanent residency starts here</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Green Card Process Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">PERM Labor Certification</h3>
                  <p className="text-gray-600">Department of Labor certification that no qualified US workers are available for your position.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">I-140 Petition</h3>
                  <p className="text-gray-600">USCIS petition for immigrant worker classification based on your qualifications.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">I-485 Adjustment</h3>
                  <p className="text-gray-600">Application to adjust status to permanent resident while in the US.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose H1BConnect?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Experienced immigration attorneys</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Transparent pricing and timeline</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Regular status updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Dedicated case management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Typical Timeline</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>PERM Labor Certification</span>
                    <span className="text-gray-600">8-12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>I-140 Processing</span>
                    <span className="text-gray-600">4-8 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority Date Wait</span>
                    <span className="text-gray-600">Varies by country</span>
                  </div>
                  <div className="flex justify-between">
                    <span>I-485 Processing</span>
                    <span className="text-gray-600">8-12 months</span>
                  </div>
                  <div className="border-t pt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Total (typical)</span>
                      <span>2-3 years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility Check Tab */}
        {activeTab === 'eligibility' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Green Card Eligibility Checker</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many years have you been in the US on H-1B?
                  </label>
                  <select
                    name="yearsInUS"
                    value={eligibilityData.yearsInUS}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select years</option>
                    <option value="1">Less than 1 year</option>
                    <option value="2">1-2 years</option>
                    <option value="3">2-3 years</option>
                    <option value="4">3-4 years</option>
                    <option value="5">4+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Immigration Status
                  </label>
                  <select
                    name="currentStatus"
                    value={eligibilityData.currentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select status</option>
                    <option value="h1b">H-1B</option>
                    <option value="l1">L-1</option>
                    <option value="o1">O-1</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Education Level
                  </label>
                  <select
                    name="education"
                    value={eligibilityData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select education</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD/Doctorate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Professional Experience
                  </label>
                  <select
                    name="experience"
                    value={eligibilityData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select experience</option>
                    <option value="1">1-2 years</option>
                    <option value="3">3-5 years</option>
                    <option value="6">6-10 years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>

                <button
                  onClick={handleEligibilityCheck}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Check Eligibility
                </button>
              </div>

              {/* Results */}
              <div>
                {eligibilityResult && (
                  <div className={`p-6 rounded-lg ${
                    eligibilityResult === 'highly-eligible' ? 'bg-green-50 border border-green-200' :
                    eligibilityResult === 'eligible' ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center mb-4">
                      {eligibilityResult === 'highly-eligible' && (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                          <h3 className="text-lg font-semibold text-green-900">Highly Eligible</h3>
                        </>
                      )}
                      {eligibilityResult === 'eligible' && (
                        <>
                          <Clock className="h-6 w-6 text-yellow-600 mr-2" />
                          <h3 className="text-lg font-semibold text-yellow-900">Eligible</h3>
                        </>
                      )}
                      {eligibilityResult === 'not-ready' && (
                        <>
                          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                          <h3 className="text-lg font-semibold text-red-900">Not Ready Yet</h3>
                        </>
                      )}
                    </div>

                    {eligibilityResult === 'highly-eligible' && (
                      <div className="text-green-800">
                        <p className="mb-4">
                          Excellent! You appear to be highly eligible for green card processing. 
                          Your education, experience, and time in the US position you well for success.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li>• Strong PERM case likelihood</li>
                          <li>• Qualified for EB-2 category</li>
                          <li>• Ready to begin process</li>
                        </ul>
                        <button
                          onClick={() => setShowConsultForm(true)}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Schedule Consultation
                        </button>
                      </div>
                    )}

                    {eligibilityResult === 'eligible' && (
                      <div className="text-yellow-800">
                        <p className="mb-4">
                          Good news! You appear eligible for green card processing, though we recommend 
                          a consultation to discuss the best strategy for your case.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li>• Likely eligible for PERM</li>
                          <li>• May qualify for EB-2 or EB-3</li>
                          <li>• Consultation recommended</li>
                        </ul>
                        <button
                          onClick={() => setShowConsultForm(true)}
                          className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Schedule Consultation
                        </button>
                      </div>
                    )}

                    {eligibilityResult === 'not-ready' && (
                      <div className="text-red-800">
                        <p className="mb-4">
                          Based on your current profile, we recommend waiting before starting the green card process. 
                          Consider building more experience or completing additional education.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li>• Build more US work experience</li>
                          <li>• Consider advanced education</li>
                          <li>• Consultation available for guidance</li>
                        </ul>
                        <button
                          onClick={() => setShowConsultForm(true)}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Get Guidance
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!eligibilityResult && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Factors</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Time in the US on valid status</li>
                      <li>• Education level and credentials</li>
                      <li>• Professional experience</li>
                      <li>• Current employer sponsorship</li>
                      <li>• Country of birth (priority date)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Case Tracker Tab */}
        {activeTab === 'tracker' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Tracker</h2>
            
            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Green Card Application Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't started a green card application with us yet. 
                Complete the eligibility check or schedule a consultation to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('eligibility')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check Eligibility
                </button>
                <button
                  onClick={() => setActiveTab('consultation')}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attorney Consultation Tab */}
        {activeTab === 'consultation' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Attorney Consultation</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Consult with Our Attorneys?</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Personalized case assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Strategy recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Timeline and cost estimates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Risk assessment and mitigation</span>
                  </li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Consultation Details</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 45-minute video call</li>
                    <li>• Experienced immigration attorney</li>
                    <li>• Personalized recommendations</li>
                    <li>• Written follow-up summary</li>
                    <li>• $200 fee (credited toward services)</li>
                  </ul>
                </div>
              </div>

              <div>
                {!showConsultForm ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Schedule?</h3>
                    <p className="text-gray-600 mb-6">
                      Book a consultation with one of our experienced immigration attorneys 
                      to discuss your green card options.
                    </p>
                    <button
                      onClick={() => setShowConsultForm(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Consultation
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-900">Consultation Request Submitted</h3>
                    </div>
                    <p className="text-green-800 mb-4">
                      Thank you for your interest! Our team will contact you within 24 hours to schedule 
                      your consultation at a convenient time.
                    </p>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>• Check your email for confirmation</p>
                      <p>• Prepare your questions in advance</p>
                      <p>• Have your documents ready for review</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenCardPage; 