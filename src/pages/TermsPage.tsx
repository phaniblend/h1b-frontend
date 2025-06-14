import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Shield, AlertTriangle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-xl text-gray-600">Last updated: January 1, 2024</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Legal Notice</h3>
              <p className="text-yellow-800">
                Please read these terms carefully before using H1BConnect services. By registering or using our services, 
                you agree to be bound by these terms and conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using H1BConnect services, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              H1BConnect provides H-1B visa transfer and employment services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>H-1B petition preparation and filing</li>
              <li>Legal document review and compliance</li>
              <li>Client-employer coordination</li>
              <li>Payroll and benefits administration</li>
              <li>Immigration status maintenance</li>
              <li>Green card processing assistance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility and Registration</h2>
            <p className="text-gray-700 mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Have legal authorization to work in the United States</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Fees and Payment</h2>
            <p className="text-gray-700 mb-4">
              Our fee structure is as follows:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Setup Fee: $3,500 (one-time, includes all legal and filing fees)</li>
              <li>Monthly Service Fee: 5% of gross monthly earnings</li>
              <li>No hidden fees or surprise charges</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Payment terms: Setup fee is due upon service agreement execution. Monthly fees are automatically 
              deducted from your earnings. All fees are non-refundable once services have commenced.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Limitations</h2>
            <p className="text-gray-700 mb-4">
              While we strive to provide excellent service, we cannot guarantee:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Approval of H-1B petitions by USCIS</li>
              <li>Specific timeline for petition processing</li>
              <li>Availability of client positions</li>
              <li>Specific salary or hourly rates</li>
              <li>Green card approval or processing times</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Client Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As a client, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide accurate and timely information</li>
              <li>Submit required documents promptly</li>
              <li>Maintain professional conduct with client employers</li>
              <li>Report any changes in employment status immediately</li>
              <li>Comply with all immigration laws and regulations</li>
              <li>Submit timesheets and work reports as required</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality</h2>
            <p className="text-gray-700 mb-6">
              We maintain strict confidentiality of all client information and will not disclose personal or 
              professional information to third parties without consent, except as required by law or for 
              service delivery purposes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate this agreement with 30 days written notice. Termination conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>All outstanding fees must be paid</li>
              <li>Pending H-1B petitions will be completed</li>
              <li>Client data will be retained per legal requirements</li>
              <li>No refund of setup fees after services commence</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              H1BConnect's liability is limited to the amount of fees paid by the client. We are not liable for 
              indirect, incidental, special, or consequential damages, including but not limited to loss of income, 
              employment opportunities, or immigration status changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
            <p className="text-gray-700 mb-6">
              Any disputes arising from this agreement will be resolved through binding arbitration in accordance 
              with the rules of the American Arbitration Association. The arbitration will be conducted in 
              [State/City], and the decision will be final and binding.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              This agreement is governed by the laws of [State] without regard to conflict of law principles. 
              Any legal action must be brought in the courts of [State/County].
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
              posting on our website. Continued use of our services constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these terms, contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>H1BConnect Legal Department</strong><br />
                Email: legal@h1bconnect.com<br />
                Phone: 1-800-H1B-HELP<br />
                Address: [Company Address]
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Contact Legal Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 