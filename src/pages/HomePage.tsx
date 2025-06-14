import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, DollarSign, FileText, Users, CheckCircle, Calculator } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Keep What You Earn.<br />
              <span className="text-blue-300">Take Control of Your H-1B.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              H1BConnect gives you full legal protection and payroll compliance for a flat fee. 
              No hidden cuts. No middlemen. No nonsense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/calculator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Hidden Fees</h3>
              <p className="text-gray-600">
                We pay all legal and government filing fees. You pay a one-time setup and a flat monthly fee—nothing more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Total Control</h3>
              <p className="text-gray-600">
                You know exactly what your client pays. You keep nearly every dollar you bill. No more "consulting firm" surprises.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Legal Compliance</h3>
              <p className="text-gray-600">
                We're a registered U.S. employer of record, so you're 100% protected—W-2, payroll, and benefits included.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Transfers</h3>
              <p className="text-gray-600">
                We handle your H-1B transfer paperwork and coordinate with your client or vendor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to take control of your career</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book a Free Advisor Call",
                description: "Talk to our immigration and payroll experts to understand your options."
              },
              {
                step: "2",
                title: "Register Online",
                description: "Create your account and pay your one-time setup fee of $3,500."
              },
              {
                step: "3",
                title: "Upload Your Documents",
                description: "Secure portal for your H-1B, client letter, ID, and more."
              },
              {
                step: "4",
                title: "Legal Review & Client Introduction",
                description: "We review everything, then introduce ourselves to your client or vendor."
              },
              {
                step: "5",
                title: "E-Sign Your Contracts",
                description: "All paperwork is digital, fast, and legally binding."
              },
              {
                step: "6",
                title: "Submit Timesheets & Get Paid",
                description: "Log hours on our platform and receive direct deposit, every pay cycle."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-blue-50 rounded-lg p-6 inline-block">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Enjoy Peace of Mind</h3>
              <p className="text-blue-700">
                We take care of all compliance, reporting, payroll taxes, and benefits. You focus on your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Teaser */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">See Your Potential Savings</h2>
          <div className="bg-white/10 backdrop-blur rounded-lg p-8 mb-8">
            <p className="text-xl mb-4">
              If your client pays <span className="font-bold text-yellow-300">$85/hour</span>, you could save
            </p>
            <div className="text-5xl font-bold text-yellow-300 mb-4">$33,000/year</div>
            <p className="text-lg">with H1BConnect compared to a traditional consulting firm.</p>
          </div>
          <Link
            to="/calculator"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Try the Full Calculator
          </Link>
        </div>
      </section>

      {/* Trust Signals / Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Join hundreds of professionals who've taken control of their careers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I was losing $30K annually to my consulting firm. H1BConnect saved me that money while providing better support and transparency. Best decision I ever made."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rajesh P.</p>
                  <p className="text-gray-600 text-sm">Senior Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The transparency is incredible. I know exactly what my client pays and what I receive. No more guessing games or surprise deductions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya S.</p>
                  <p className="text-gray-600 text-sm">Data Scientist</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Professional service, quick H-1B transfer, and I keep 95% of what I bill instead of 70%. The legal support gives me peace of mind."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Amit K.</p>
                  <p className="text-gray-600 text-sm">DevOps Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8">Trusted by professionals at leading companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-gray-200 px-6 py-3 rounded-lg">Microsoft</div>
              <div className="bg-gray-200 px-6 py-3 rounded-lg">Amazon</div>
              <div className="bg-gray-200 px-6 py-3 rounded-lg">Google</div>
              <div className="bg-gray-200 px-6 py-3 rounded-lg">Meta</div>
              <div className="bg-gray-200 px-6 py-3 rounded-lg">Apple</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to stop losing money to middlemen?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Book a Free Advisor Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 