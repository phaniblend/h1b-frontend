import React from 'react';
import { CheckCircle, ArrowRight, Phone, Upload, FileCheck, Users, CreditCard, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "1",
      title: "Book a Free Advisor Call",
      description: "Have questions? Our compliance experts will explain the process and help you make the right decision.",
      icon: Phone,
      color: "blue"
    },
    {
      number: "2", 
      title: "Register & Pay Setup Fee",
      description: "Sign up online and pay your one-time $3,500 setup fee securely.",
      icon: CreditCard,
      color: "green"
    },
    {
      number: "3",
      title: "Upload Documents", 
      description: "Easily upload your H-1B approval, ID, resume, and current client details through your dashboard.",
      icon: Upload,
      color: "purple"
    },
    {
      number: "4",
      title: "Legal & Client Review",
      description: "Our attorneys verify your documents and we introduce ourselves to your client or vendor to facilitate the transfer.",
      icon: FileCheck,
      color: "orange"
    },
    {
      number: "5",
      title: "Sign Contracts",
      description: "Review and sign your employment agreement and all necessary legal documents with just a few clicks.",
      icon: Users,
      color: "red"
    },
    {
      number: "6",
      title: "Start Work, Submit Timesheets, Get Paid",
      description: "Clock in and out using our web or mobile app. Receive your pay on time, every time.",
      icon: Clock,
      color: "indigo"
    },
    {
      number: "7",
      title: "Ongoing Support & Compliance",
      description: "We keep you 100% compliant, handle all payroll taxes, and offer add-ons like health insurance, 401(k), and green card processing.",
      icon: Shield,
      color: "teal"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
      red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" },
      teal: { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-200" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-blue-100">
            Your step-by-step guide to taking control of your H-1B career
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Step-by-Step Guide</h2>
            <p className="text-xl text-gray-600">
              From initial consultation to getting paid - we handle everything
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = getColorClasses(step.color);
              
              return (
                <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-16 h-16 ${colors.bg} ${colors.border} border-2 rounded-full flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block flex-shrink-0">
                      <ArrowRight className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Process?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">100% Transparent</h3>
                <p className="text-gray-600">
                  Every step is clearly explained. No hidden processes or surprise requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Immigration attorneys and compliance experts guide you through every step.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
                <p className="text-gray-600">
                  Most applications processed within 2-3 weeks. Premium service available for faster processing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
                <p className="text-gray-600">
                  24/7 support, compliance monitoring, and career guidance throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about our process
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How long does the H-1B transfer process take?</h3>
              <p className="text-gray-700 mb-4">
                The typical H-1B transfer process takes 2-4 months from start to finish. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Initial consultation and document review: 1-2 weeks</li>
                <li>USCIS petition preparation and filing: 2-3 weeks</li>
                <li>USCIS processing time: 1-3 months (premium processing available for 15 days)</li>
                <li>Work authorization begins immediately upon filing (if currently on H-1B)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What are the risks involved?</h3>
              <p className="text-gray-700 mb-4">
                H-1B transfers are generally low-risk when handled properly. Key risk mitigation strategies include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Thorough legal review before filing to ensure petition strength</li>
                <li>Maintaining current employment until approval (if desired)</li>
                <li>Premium processing option for faster decisions</li>
                <li>Experienced legal team handling all documentation</li>
                <li>Backup plans in case of RFE (Request for Evidence)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What happens if I want to change jobs during the process?</h3>
              <p className="text-gray-700">
                If you want to change jobs during the transfer process, we can help you navigate this situation. 
                Options include withdrawing the current petition and filing a new one with the new employer, 
                or completing the current transfer and then filing another transfer later. We'll advise you 
                on the best approach based on your specific circumstances and timing.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Can I start working immediately after filing?</h3>
              <p className="text-gray-700">
                If you're currently on H-1B status with another employer, you can begin working for the new 
                employer immediately upon filing the transfer petition, thanks to the "portability" provision. 
                However, if you're not currently on H-1B status, you must wait for approval before starting work.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What if my petition is denied?</h3>
              <p className="text-gray-700 mb-4">
                While denials are rare with proper preparation, we have contingency plans:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Immediate legal review to understand denial reasons</li>
                <li>Options for motion to reopen or reconsider</li>
                <li>Alternative visa strategies if applicable</li>
                <li>Guidance on maintaining legal status</li>
                <li>Full support throughout the appeals process</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How much money will I actually save?</h3>
              <p className="text-gray-700 mb-4">
                Savings vary by individual situation, but our clients typically save $25,000-$40,000 annually. 
                For example, if you currently earn $120,000 but your consulting firm charges the client $160,000, 
                you could potentially earn $152,000 (95% of client rate) with H1BConnect, saving $32,000 per year.
              </p>
              <Link
                to="/calculator"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Calculate your specific savings
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Talk to an Expert
              </Link>
              <Link
                to="/help"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of professionals who've taken control of their H-1B careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Start Registration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/calculator"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Calculate Savings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage; 