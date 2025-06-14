import React from 'react';
import { Check, Calculator, DollarSign, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const services = [
    {
      name: "Setup Fee (One-Time)",
      amount: "$3,500",
      description: "Covers all legal, filing, and onboarding costs",
      features: [
        "H-1B transfer paperwork",
        "Legal document review",
        "Client introduction & coordination",
        "Employment agreement setup",
        "USCIS filing fees included"
      ]
    },
    {
      name: "Employer-of-Record Fee",
      amount: "$500/month",
      description: "Payroll, compliance, and unlimited support",
      features: [
        "Full payroll processing",
        "Tax withholding & reporting",
        "Compliance monitoring",
        "24/7 customer support",
        "Benefits administration"
      ]
    },
    {
      name: "Premium Onboarding",
      amount: "$999 (optional)",
      description: "Expedited processing and priority case handling",
      features: [
        "Priority case review",
        "Expedited processing",
        "Dedicated case manager",
        "Weekly status updates",
        "Direct attorney access"
      ]
    }
  ];

  const addOns = [
    {
      name: "Legal Subscription",
      price: "$50–100/month",
      description: "Direct attorney access for ongoing legal needs"
    },
    {
      name: "401(k) Admin",
      price: "0.5% of assets",
      description: "Retirement plan management"
    },
    {
      name: "Tax Prep Partner",
      price: "$150–200/user",
      description: "CPA filing services"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl text-blue-100 mb-8">
            No percentage cuts. No hidden fees. No surprises—ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Try the Savings Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-xl text-gray-600">
              Everything you need to take control of your H-1B career
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{service.amount}</div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Optional Add-ons</h2>
            <p className="text-xl text-gray-600">
              Additional services to enhance your experience
            </p>
          </div>

          <div className="space-y-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{addon.name}</h3>
                  <p className="text-gray-600">{addon.description}</p>
                </div>
                <div className="text-xl font-bold text-blue-600">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Comparison */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Annual Savings Comparison</h2>
            <p className="text-xl text-gray-600">
              See how much you save compared to traditional consulting firms
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Criteria
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Traditional Firm
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                      H1BConnect
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hourly Client Bill Rate</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">$85/hour</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50">$85/hour</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Billable Hours</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">2,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50">2,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Gross Billed Amount</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">$170,000</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50">$170,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Employer Cut</td>
                    <td className="px-6 py-4 text-sm text-red-600 text-center font-semibold">$42,500 (25%)</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold bg-blue-50">$0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">One-Time Registration Fee</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">$0</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50">-$3,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Monthly Admin Fee</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">$0</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50">-$6,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">Net Payout to Employee</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">$127,500</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600 text-center bg-blue-100">$160,500</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">Annual Savings</td>
                    <td className="px-6 py-4 text-sm text-center">—</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600 text-center text-2xl">$33,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Our Pricing Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Percentage Cuts</h3>
              <p className="text-gray-600">
                Unlike traditional firms, we never take a percentage of your earnings. You keep what you earn.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">All-Inclusive</h3>
              <p className="text-gray-600">
                Our fees cover everything: legal costs, filing fees, compliance, and ongoing support.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Predictable</h3>
              <p className="text-gray-600">
                Know exactly what you'll pay each month. No surprises, no hidden fees, no fine print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Save Thousands?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Calculate your exact savings and start your journey to financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Your Savings
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 