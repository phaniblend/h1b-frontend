import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, DollarSign, CheckCircle, AlertCircle, Mail, Share2, Home, ArrowRight } from 'lucide-react';

interface ReferralData {
  friendName: string;
  friendEmail: string;
  friendPhone: string;
  relationship: string;
  message: string;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'registered' | 'completed';
  date: string;
  reward: number;
}

const ReferralPage = () => {
  const [referralData, setReferralData] = useState<ReferralData>({
    friendName: '',
    friendEmail: '',
    friendPhone: '',
    relationship: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ReferralData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock referral history
  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      status: 'completed',
      date: '2024-01-15',
      reward: 1000
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'registered',
      date: '2024-02-01',
      reward: 500
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      status: 'pending',
      date: '2024-02-10',
      reward: 0
    }
  ]);

  const totalEarned = referrals.reduce((sum, ref) => sum + ref.reward, 0);
  const pendingRewards = referrals.filter(ref => ref.status === 'registered').reduce((sum, ref) => sum + ref.reward, 0);

  const validateForm = (): boolean => {
    const newErrors: Partial<ReferralData> = {};

    if (!referralData.friendName.trim()) {
      newErrors.friendName = 'Friend\'s name is required';
    }

    if (!referralData.friendEmail.trim()) {
      newErrors.friendEmail = 'Friend\'s email is required';
    } else if (!/\S+@\S+\.\S+/.test(referralData.friendEmail)) {
      newErrors.friendEmail = 'Invalid email address';
    }

    if (!referralData.friendPhone.trim()) {
      newErrors.friendPhone = 'Friend\'s phone number is required';
    }

    if (!referralData.relationship) {
      newErrors.relationship = 'Please specify your relationship';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReferralData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ReferralData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setReferralData({
        friendName: '',
        friendEmail: '',
        friendPhone: '',
        relationship: '',
        message: ''
      });
    } catch (error) {
      alert('Failed to send referral. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'registered': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Service Completed';
      case 'registered': return 'Registered';
      case 'pending': return 'Invitation Sent';
      default: return 'Unknown';
    }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Referral Program</h1>
          <p className="text-xl text-gray-600">Earn rewards by helping friends take control of their H-1B careers</p>
        </div>

        {/* Program Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$1,000</h3>
              <p className="text-blue-100">Reward when your friend completes our service</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$500</h3>
              <p className="text-blue-100">Bonus when your friend registers</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Limit</h3>
              <p className="text-blue-100">Refer as many friends as you want</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Referral Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Share2 className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Refer a Friend</h2>
              </div>

              {showSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-900">Referral Sent Successfully!</h3>
                  </div>
                  <p className="text-green-800 mb-4">
                    Your friend will receive an invitation email with information about H1BConnect. 
                    You'll earn rewards when they register and complete our service.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• $500 when they register</p>
                    <p>• $1,000 when they complete our service</p>
                    <p>• Track progress in your referral dashboard</p>
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Refer Another Friend
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="friendName" className="block text-sm font-medium text-gray-700 mb-2">
                        Friend's Name *
                      </label>
                      <input
                        type="text"
                        id="friendName"
                        name="friendName"
                        value={referralData.friendName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.friendName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Smith"
                      />
                      {errors.friendName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.friendName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Friend's Email *
                      </label>
                      <input
                        type="email"
                        id="friendEmail"
                        name="friendEmail"
                        value={referralData.friendEmail}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.friendEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.friendEmail && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.friendEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="friendPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Friend's Phone *
                      </label>
                      <input
                        type="tel"
                        id="friendPhone"
                        name="friendPhone"
                        value={referralData.friendPhone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.friendPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.friendPhone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.friendPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship *
                      </label>
                      <select
                        id="relationship"
                        name="relationship"
                        value={referralData.relationship}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.relationship ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select relationship</option>
                        <option value="colleague">Colleague</option>
                        <option value="friend">Friend</option>
                        <option value="family">Family Member</option>
                        <option value="classmate">Classmate</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.relationship && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.relationship}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={referralData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a personal note to your friend about why you recommend H1BConnect..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Referral...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Send Referral
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Referral Stats & History */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Earnings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="text-2xl font-bold text-green-600">${totalEarned}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Rewards</span>
                  <span className="text-lg font-semibold text-yellow-600">${pendingRewards}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Referrals</span>
                  <span className="text-lg font-semibold text-blue-600">{referrals.length}</span>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Refer a Friend</p>
                    <p className="text-sm text-gray-600">Send them an invitation through our platform</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">They Register</p>
                    <p className="text-sm text-gray-600">Earn $500 when they create an account</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Service Completed</p>
                    <p className="text-sm text-gray-600">Earn $1,000 when they complete our service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Referral History</h2>
          
          {referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{referral.name}</td>
                      <td className="py-3 px-4 text-gray-600">{referral.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                          {getStatusText(referral.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{referral.date}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">
                        {referral.reward > 0 ? `$${referral.reward}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Referrals Yet</h3>
              <p className="text-gray-600 mb-4">Start referring friends to earn rewards!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralPage; 