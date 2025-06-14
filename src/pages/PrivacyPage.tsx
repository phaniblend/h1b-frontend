import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, Lock, Eye, Database, AlertTriangle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: January 1, 2024</p>
        </div>

        {/* Privacy Commitment */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Privacy Commitment</h3>
              <p className="text-blue-800">
                H1BConnect is committed to protecting your privacy and personal information. This policy explains 
                how we collect, use, and safeguard your data in compliance with applicable privacy laws.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2" />
              1. Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">We collect the following personal information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Date of birth and Social Security Number (for employment purposes)</li>
              <li>Immigration status and visa information</li>
              <li>Educational background and work experience</li>
              <li>Employment history and references</li>
              <li>Financial information for payroll and tax purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Resume and professional qualifications</li>
              <li>Skills assessments and certifications</li>
              <li>Work samples and portfolio materials</li>
              <li>Performance evaluations and feedback</li>
              <li>Timesheet and project information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              2. How We Use Your Information
            </h2>
            
            <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Processing H-1B visa applications and transfers</li>
              <li>Matching you with suitable employment opportunities</li>
              <li>Managing payroll, benefits, and tax obligations</li>
              <li>Providing customer support and communication</li>
              <li>Ensuring compliance with immigration laws</li>
              <li>Improving our services and user experience</li>
              <li>Legal and regulatory compliance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">With Your Consent</h3>
            <p className="text-gray-700 mb-4">We share your information with:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Client employers for job placement purposes</li>
              <li>Immigration attorneys for legal services</li>
              <li>Government agencies as required by law</li>
              <li>Third-party service providers (payroll, benefits, etc.)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Without Your Consent</h3>
            <p className="text-gray-700 mb-4">We may share information without consent only when:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Required by law or legal process</li>
              <li>Necessary to protect our rights or safety</li>
              <li>In connection with a business transfer or merger</li>
              <li>To prevent fraud or illegal activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              4. Data Security
            </h2>
            
            <p className="text-gray-700 mb-4">We implement comprehensive security measures:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection</li>
              <li>Multi-factor authentication for sensitive accounts</li>
              <li>Data backup and disaster recovery procedures</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain your information for the following periods:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Active employment: Duration of service plus 7 years</li>
              <li>Immigration documents: As required by USCIS regulations</li>
              <li>Tax and payroll records: 7 years after termination</li>
              <li>Marketing communications: Until you unsubscribe</li>
              <li>Legal compliance: As required by applicable laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access: Request a copy of your personal information</li>
              <li>Correction: Update or correct inaccurate information</li>
              <li>Deletion: Request deletion of your information (with limitations)</li>
              <li>Portability: Receive your information in a portable format</li>
              <li>Restriction: Limit how we process your information</li>
              <li>Objection: Object to certain types of processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze website usage and performance</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookies through your browser settings, but some features may not work properly 
              if cookies are disabled.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">We work with trusted third-party providers for:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Payment processing (encrypted and PCI compliant)</li>
              <li>Cloud storage and hosting services</li>
              <li>Email and communication platforms</li>
              <li>Analytics and performance monitoring</li>
              <li>Legal and compliance services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your country of residence. 
              We ensure appropriate safeguards are in place to protect your information during international transfers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
              personal information from children under 18.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy from time to time. We will notify you of significant changes 
              via email or through our website. Your continued use of our services constitutes acceptance of 
              the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For privacy-related questions or to exercise your rights, contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>H1BConnect Privacy Officer</strong><br />
                Email: privacy@h1bconnect.com<br />
                Phone: 1-800-H1B-HELP<br />
                Address: [Company Address]<br />
                Response time: Within 30 days
              </p>
            </div>
          </div>
        </div>

        {/* Data Protection Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Data Protection Certification</h3>
              <p className="text-green-800">
                H1BConnect is committed to maintaining the highest standards of data protection and privacy. 
                We regularly audit our practices and maintain compliance with applicable privacy regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/terms" className="text-blue-600 hover:text-blue-700 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Terms of Service
            </Link>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 