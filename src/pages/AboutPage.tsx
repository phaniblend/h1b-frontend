import React from 'react';
import { Users, Shield, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About H1BConnect</h1>
          <p className="text-xl text-blue-100">
            Empowering skilled immigrants to take control of their careers and paychecks
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At H1BConnect, we believe every skilled immigrant deserves to control their own career—and their own paycheck. 
                For too long, "bodyshops" and middlemen have taken unfair cuts while providing little protection or support. 
                We're here to change that. Our platform gives you a safe, transparent, and fully compliant way to transfer your H-1B, 
                with no surprises and no fine print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">
              Our team combines decades of experience in immigration law, payroll, and tech staffing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="text-blue-600 font-medium mb-3">Founder</p>
              <p className="text-gray-600">
                15+ years in tech immigration and employment law. Passionate about fair treatment for skilled workers.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Anjali Patel</h3>
              <p className="text-green-600 font-medium mb-3">Compliance Director</p>
              <p className="text-gray-600">
                Former big-4 payroll lead with expertise in employment compliance and risk management.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ajay Sinha</h3>
              <p className="text-purple-600 font-medium mb-3">Engineering Lead</p>
              <p className="text-gray-600">
                H-1B alum and tech entrepreneur. Built the platform from personal experience with visa challenges.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">
              Every team member is passionate about your success and committed to transparent, fair service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Promise</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No Hidden Percentage Cuts</h3>
                <p className="text-gray-600">
                  We never take a percentage of your earnings. You keep what you earn.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">All Government Fees Paid by Us</h3>
                <p className="text-gray-600">
                  We cover all legal and filing fees. No surprise costs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Direct, Honest Communication</h3>
                <p className="text-gray-600">
                  Clear updates, transparent processes, and responsive support.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Career, Your Control</h3>
                <p className="text-gray-600">
                  Make decisions about your career without middleman interference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of professionals who've made the switch to transparent, fair employment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to="/book-advisor"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 