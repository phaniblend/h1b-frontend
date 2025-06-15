import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Phone, FileText, Calendar, CreditCard, ArrowLeft } from 'lucide-react';

const OnboardingConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Navigation */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to H1BConnect!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your account has been created successfully. Please check your email to verify your account before proceeding.
          </p>
          
          {/* Email Verification Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="text-left">
                <h3 className="text-sm font-medium text-yellow-800">Email Verification Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  We've sent a verification link to your email. Please click the link to activate your account and access all features.
          </p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Email</h3>
                <p className="text-gray-600">
                  We've sent a verification email to activate your account. Please click the verification link 
                  in your email to proceed. Check your inbox and spam folder.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Review (24-48 hours)</h3>
                <p className="text-gray-600">
                  Our compliance team will review your information and verify your eligibility. 
                  We'll contact you if we need any additional details.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Consultation Call</h3>
                <p className="text-gray-600">
                  Once approved, we'll schedule a free consultation call to discuss your case, 
                  timeline, and answer any questions you have.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Upload & Payment</h3>
                <p className="text-gray-600">
                  After the consultation, you'll upload your documents and complete the setup fee payment 
                  to begin the H-1B transfer process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/calculator"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Calculate Savings</h3>
            <p className="text-sm text-gray-600">See how much you'll save annually</p>
          </Link>

          <Link
            to="/how-it-works"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learn the Process</h3>
            <p className="text-sm text-gray-600">Understand each step in detail</p>
          </Link>

          <Link
            to="/contact"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600">Get help from our team</p>
          </Link>

          <Link
            to="/pricing"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Review Pricing</h3>
            <p className="text-sm text-gray-600">Transparent fee structure</p>
          </Link>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Important Information</h2>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p>Your registration is secure and confidential</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p>No charges will be made until you approve the service agreement</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p>You can cancel at any time before document processing begins</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p>All legal and filing fees are included in our setup fee</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Need Immediate Help?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">1-800-H1B-HELP</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-600">support@h1bconnect.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-gray-600">
            Access your account dashboard to track your application status
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingConfirmationPage; 