import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavingsCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(85);
  const [annualHours, setAnnualHours] = useState<number>(2000);
  const [employerCut, setEmployerCut] = useState<number>(25);
  const [otherFees, setOtherFees] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const calculateSavings = () => {
    const grossBilled = hourlyRate * annualHours;
    const currentEmployerCut = grossBilled * (employerCut / 100);
    const currentNetPayout = grossBilled - currentEmployerCut - otherFees;
    
    const h1bConnectSetupFee = 3500;
    const h1bConnectMonthlyFee = 500 * 12; // $500/month
    const h1bConnectNetPayout = grossBilled - h1bConnectSetupFee - h1bConnectMonthlyFee;
    
    const annualSavings = h1bConnectNetPayout - currentNetPayout;
    const paycheckIncrease = annualSavings / 26; // bi-weekly

    return {
      grossBilled,
      currentNetPayout,
      h1bConnectNetPayout,
      annualSavings,
      paycheckIncrease
    };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const results = showResults ? calculateSavings() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            See How Much More You Can Take Home
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your potential savings with H1BConnect vs traditional consulting firms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Current Situation</h2>
            
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Client Bill Rate ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="85"
                    min="1"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">e.g., 85</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Billable Hours
                </label>
                <input
                  type="number"
                  value={annualHours}
                  onChange={(e) => setAnnualHours(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                  min="1"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">e.g., 2000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Employer Cut (%)
                </label>
                <input
                  type="number"
                  value={employerCut}
                  onChange={(e) => setEmployerCut(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25"
                  min="0"
                  max="100"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">e.g., 25</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Annual Admin Fees ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">optional</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Savings
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!showResults ? (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  Your Savings Will Appear Here
                </h3>
                <p className="text-gray-400">
                  Fill out the form and click calculate to see your potential savings
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Savings Breakdown</h2>
                
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-green-600 mb-1">Annual Savings with H1BConnect</p>
                      <p className="text-4xl font-bold text-green-700">
                        ${results!.annualSavings.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-blue-600 mb-1">That's more every paycheck!</p>
                      <p className="text-2xl font-bold text-blue-700">
                        +${results!.paycheckIncrease.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Comparison Breakdown:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gross Billed Amount:</span>
                        <span className="font-medium">${results!.grossBilled.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Current Setup (Net):</span>
                        <span className="font-medium">${results!.currentNetPayout.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>H1BConnect (Net):</span>
                        <span className="font-medium">${results!.h1bConnectNetPayout.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/register"
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      Ready to make the switch? Start Registration
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose H1BConnect?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">No Percentage Cuts</h3>
              <p className="text-gray-600 text-sm">Keep nearly every dollar you bill</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">One-time setup + flat monthly fee</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Full Compliance</h3>
              <p className="text-gray-600 text-sm">Legal protection & payroll included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator; 