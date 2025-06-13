import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MessageSquare, CheckCircle, Star, ArrowRight, ArrowLeft, Users } from 'lucide-react';

interface Advisor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  experience: string;
  image: string;
  bio: string;
  languages: string[];
  timezone: string;
}

interface ConsultationType {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const AdvisorBookingPage = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    currentStatus: '',
    goals: '',
    urgency: 'flexible'
  });

  const advisors: Advisor[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior H1B Immigration Specialist',
      specialties: ['H1B Transfers', 'Premium Processing', 'Complex Cases'],
      rating: 4.9,
      reviewCount: 127,
      experience: '8+ years',
      image: '/api/placeholder/100/100',
      bio: 'Former USCIS officer with deep expertise in H1B regulations and transfer processes. Helped 500+ professionals navigate visa transitions.',
      languages: ['English', 'Mandarin', 'Cantonese'],
      timezone: 'EST'
    },
    {
      id: '2',
      name: 'Raj Patel',
      title: 'H1B Strategy & Compliance Expert',
      specialties: ['Employment Law', 'Visa Strategy', 'Corporate Compliance'],
      rating: 4.8,
      reviewCount: 89,
      experience: '10+ years',
      image: '/api/placeholder/100/100',
      bio: 'Immigration attorney specializing in employment-based visas. Expert in complex H1B transfer scenarios and employer compliance.',
      languages: ['English', 'Hindi', 'Gujarati'],
      timezone: 'PST'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      title: 'Client Success & Strategy Advisor',
      specialties: ['Client Onboarding', 'Process Optimization', 'Timeline Planning'],
      rating: 4.9,
      reviewCount: 156,
      experience: '6+ years',
      image: '/api/placeholder/100/100',
      bio: 'Dedicated to ensuring smooth H1B transitions. Specializes in project management and client communication throughout the transfer process.',
      languages: ['English', 'Spanish'],
      timezone: 'CST'
    }
  ];

  const consultationTypes: ConsultationType[] = [
    {
      id: 'discovery',
      name: 'Discovery Call',
      duration: 30,
      price: 0,
      description: 'Free consultation to understand your situation and explain our services',
      icon: <MessageSquare className="w-5 h-5" />,
      recommended: true
    },
    {
      id: 'strategy',
      name: 'Strategy Session',
      duration: 60,
      price: 150,
      description: 'Detailed planning session for your H1B transfer with personalized roadmap',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'urgent',
      name: 'Urgent Consultation',
      duration: 45,
      price: 200,
      description: 'Priority consultation for time-sensitive situations (24hr response)',
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time,
          available: Math.random() > 0.3 // Simulate availability
        });
      }
    }
    return slots;
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingDetails(prev => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step, index) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step <= selectedStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            {step < selectedStep ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
          {index < 3 && (
            <div className={`w-16 h-1 ${
              step < selectedStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderAdvisorSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your H1B Expert</h2>
        <p className="text-gray-600">Select the advisor who best matches your needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <div
            key={advisor.id}
            onClick={() => setSelectedAdvisor(advisor)}
            className={`cursor-pointer bg-white rounded-lg shadow-md p-6 border-2 transition-all hover:shadow-lg ${
              selectedAdvisor?.id === advisor.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
              <p className="text-sm text-gray-600">{advisor.title}</p>
              <p className="text-sm text-blue-600">{advisor.experience}</p>
            </div>

            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{advisor.rating}</span>
                <span className="text-xs text-gray-500">({advisor.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-gray-700">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {advisor.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700">Languages:</p>
                <p className="text-gray-600">{advisor.languages.join(', ')}</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3 line-clamp-3">{advisor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConsultationType = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Consultation Type</h2>
        <p className="text-gray-600">Choose the session that best fits your current needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultationTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedConsultationType(type)}
            className={`cursor-pointer bg-white rounded-lg shadow-md p-6 border-2 transition-all hover:shadow-lg relative ${
              selectedConsultationType?.id === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            {type.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600">
                {type.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {type.price === 0 ? 'FREE' : `$${type.price}`}
              </p>
              <p className="text-sm text-gray-500">{type.duration} minutes</p>
            </div>

            <p className="text-sm text-gray-600 text-center">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTime = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pick Date & Time</h2>
        <p className="text-gray-600">Select your preferred appointment slot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dates</h3>
          <div className="grid grid-cols-2 gap-3">
            {generateDates().map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedDate === date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">{formatDate(date)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Times {selectedDate && `- ${formatDate(selectedDate)}`}
          </h3>
          {selectedDate ? (
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {generateTimeSlots(selectedDate).map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    selectedTime === slot.time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : slot.available
                      ? 'border-gray-200 hover:border-blue-300'
                      : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Please select a date first</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Booking</h2>
        <p className="text-gray-600">Please provide your details to confirm the appointment</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Booking Summary */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-4">Appointment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Advisor:</span>
              <span className="font-medium">{selectedAdvisor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Consultation:</span>
              <span className="font-medium">{selectedConsultationType?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Date & Time:</span>
              <span className="font-medium">
                {selectedDate && selectedTime && `${formatDate(selectedDate)} at ${selectedTime}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Duration:</span>
              <span className="font-medium">{selectedConsultationType?.duration} minutes</span>
            </div>
            <div className="flex justify-between border-t border-blue-200 pt-2">
              <span className="text-blue-700 font-medium">Price:</span>
              <span className="font-bold">
                {selectedConsultationType?.price === 0 ? 'FREE' : `$${selectedConsultationType?.price}`}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              required
              value={bookingDetails.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              required
              value={bookingDetails.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={bookingDetails.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={bookingDetails.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
            <input
              type="text"
              value={bookingDetails.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current H1B Status</label>
            <select
              value={bookingDetails.currentStatus}
              onChange={(e) => handleInputChange('currentStatus', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your current status</option>
              <option value="h1b-current">Currently on H1B</option>
              <option value="h1b-expiring">H1B expiring soon</option>
              <option value="h4">Currently on H4</option>
              <option value="student">Student visa (F1/OPT)</option>
              <option value="other">Other visa status</option>
              <option value="planning">Planning for future</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Goals & Questions</label>
            <textarea
              value={bookingDetails.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              rows={4}
              placeholder="What would you like to discuss? What are your main concerns or goals?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
            <select
              value={bookingDetails.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="flexible">Flexible timeline</option>
              <option value="3-months">Need to start within 3 months</option>
              <option value="1-month">Need to start within 1 month</option>
              <option value="urgent">Urgent - ASAP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const canProceedToNext = () => {
    switch (selectedStep) {
      case 1: return selectedAdvisor !== null;
      case 2: return selectedConsultationType !== null;
      case 3: return selectedDate && selectedTime;
      case 4: return bookingDetails.firstName && bookingDetails.lastName && bookingDetails.email;
      default: return false;
    }
  };

  const handleBooking = () => {
    // Simulate booking API call
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    // Reset form or redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your H1B Consultation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert guidance from our immigration specialists. Start with a free discovery call to understand your options.
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {selectedStep === 1 && renderAdvisorSelection()}
          {selectedStep === 2 && renderConsultationType()}
          {selectedStep === 3 && renderDateTime()}
          {selectedStep === 4 && renderBookingDetails()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
            disabled={selectedStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {selectedStep < 4 ? (
            <button
              onClick={() => setSelectedStep(selectedStep + 1)}
              disabled={!canProceedToNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                canProceedToNext()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleBooking}
              disabled={!canProceedToNext()}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                canProceedToNext()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Booking
            </button>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            🔒 Your information is secure and confidential • 📞 Free consultation available • ⚡ 24hr response guarantee
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              500+ Successful Transfers
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Expert Immigration Team
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Transparent Pricing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorBookingPage; 