import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Users, Clock, CheckCircle, ArrowRight, Info, BarChart3, PieChart } from 'lucide-react';

interface CalculationBreakdown {
  grossAnnual: number;
  traditionalCut: number;
  traditionalNetPay: number;
  h1bConnectFees: number;
  h1bConnectNetPay: number;
  annualSavings: number;
  monthlySavings: number;
  savingsPercentage: number;
}

const SavingsCalculatorPage = () => {
  const [hourlyRate, setHourlyRate] = useState(85);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [currentCut, setCurrentCut] = useState(25);
  const [yearsToCalculate, setYearsToCalculate] = useState(3);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateBreakdown = (): CalculationBreakdown => {
    const annualHours = hoursPerWeek * 52;
    const grossAnnual = hourlyRate * annualHours;
    const traditionalCut = (grossAnnual * currentCut) / 100;
    const traditionalNetPay = grossAnnual - traditionalCut;
    
    const h1bConnectFees = 3500 + (500 * 12); // Setup + 12 months
    const h1bConnectNetPay = grossAnnual - h1bConnectFees;
    const annualSavings = h1bConnectNetPay - traditionalNetPay;
    const monthlySavings = annualSavings / 12;
    const savingsPercentage = grossAnnual > 0 ? (annualSavings / grossAnnual) * 100 : 0;

    return {
      grossAnnual,
      traditionalCut,
      traditionalNetPay,
      h1bConnectFees,
      h1bConnectNetPay,
      annualSavings,
      monthlySavings,
      savingsPercentage
    };
  };

  const breakdown = calculateBreakdown();
  const multiYearSavings = breakdown.annualSavings * yearsToCalculate;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  };

  const getSavingsColor = (amount: number) => {
    if (amount > 30000) return 'text-emerald-600';
    if (amount > 15000) return 'text-green-600';
    if (amount > 0) return 'text-blue-600';
    return 'text-red-600';
  };

  const commonSalaryRanges = [
    { label: '$120K/year', hourly: 58, hours: 40 },
    { label: '$150K/year', hourly: 72, hours: 40 },
    { label: '$180K/year', hourly: 87, hours: 40 },
    { label: '$200K/year', hourly: 96, hours: 40 },
    { label: '$250K/year', hourly: 120, hours: 40 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">H1B Savings Calculator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how much you can save annually with H1BConnect's transparent pricing model vs traditional employer-of-record services
          </p>
        </div>

        {/* Quick Preset Buttons */}
        <div className="mb-8">
          <p className="text-center text-sm text-gray-600 mb-4">Quick Start - Common Salary Ranges:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {commonSalaryRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => {
                  setHourlyRate(range.hourly);
                  setHoursPerWeek(range.hours);
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Your Current Situation
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your billable hourly rate to clients</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours per Week
                  </label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-1">Average billable hours per week</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Employer Cut (%)
                  </label>
                  <input
                    type="number"
                    value={currentCut}
                    onChange={(e) => setCurrentCut(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage your current sponsor takes (usually 20-30%)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projection Years
                  </label>
                  <select
                    value={yearsToCalculate}
                    onChange={(e) => setYearsToCalculate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  >
                    <option value={1}>1 Year</option>
                    <option value={2}>2 Years</option>
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Calculate total savings over time</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Annual Hours:</span>
                  <span className="font-semibold">{(hoursPerWeek * 52).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Gross Annual:</span>
                  <span className="font-semibold">{formatCurrency(breakdown.grossAnnual)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Savings Highlight Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <p className="text-emerald-100 text-sm">Annual Savings</p>
                  <p className="text-3xl font-bold">{formatCurrency(breakdown.annualSavings)}</p>
                  <p className="text-emerald-100 text-sm">{formatPercentage(breakdown.savingsPercentage)} of gross income</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="w-8 h-8" />
                  </div>
                  <p className="text-emerald-100 text-sm">Monthly Savings</p>
                  <p className="text-3xl font-bold">{formatCurrency(breakdown.monthlySavings)}</p>
                  <p className="text-emerald-100 text-sm">Extra in your pocket</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <p className="text-emerald-100 text-sm">{yearsToCalculate}-Year Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(multiYearSavings)}</p>
                  <p className="text-emerald-100 text-sm">Compound savings</p>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traditional Model */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Traditional Model</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Current</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Annual Billing:</span>
                    <span className="font-semibold">{formatCurrency(breakdown.grossAnnual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employer Cut ({currentCut}%):</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(breakdown.traditionalCut)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Your Net Pay:</span>
                      <span className="font-bold text-lg text-gray-900">{formatCurrency(breakdown.traditionalNetPay)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full" 
                      style={{ width: `${currentCut}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{currentCut}% goes to employer</p>
                </div>
              </div>

              {/* H1BConnect Model */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-900">H1BConnect Model</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Recommended</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Gross Annual Billing:</span>
                    <span className="font-semibold">{formatCurrency(breakdown.grossAnnual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Setup Fee (One-time):</span>
                    <span className="font-semibold">$3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Monthly Service (×12):</span>
                    <span className="font-semibold">$6,000</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">Your Net Pay:</span>
                      <span className="font-bold text-lg text-emerald-600">{formatCurrency(breakdown.h1bConnectNetPay)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full" 
                      style={{ width: `${(breakdown.h1bConnectFees / breakdown.grossAnnual) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {((breakdown.h1bConnectFees / breakdown.grossAnnual) * 100).toFixed(1)}% flat fee
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown Toggle */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">Detailed Financial Breakdown</h3>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${showBreakdown ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {showBreakdown && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Annual Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Billable Hours:</span>
                          <span>{(hoursPerWeek * 52).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hourly Rate:</span>
                          <span>{formatCurrency(hourlyRate)}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Gross Revenue:</span>
                          <span>{formatCurrency(breakdown.grossAnnual)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Savings Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Traditional Loss:</span>
                          <span className="text-red-600">-{formatCurrency(breakdown.traditionalCut)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>H1BConnect Cost:</span>
                          <span className="text-blue-600">-{formatCurrency(breakdown.h1bConnectFees)}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Net Savings:</span>
                          <span className={getSavingsColor(breakdown.annualSavings)}>
                            {formatCurrency(breakdown.annualSavings)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Why Choose H1BConnect */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose H1BConnect?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Transparent Pricing</p>
                    <p className="text-sm text-gray-600">Fixed fees, no percentage cuts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Keep Your Clients</p>
                    <p className="text-sm text-gray-600">Direct relationships maintained</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Legal Compliance</p>
                    <p className="text-sm text-gray-600">Full H1B transfer support</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Professional Support</p>
                    <p className="text-sm text-gray-600">Dedicated account management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Save {formatCurrency(breakdown.annualSavings)} This Year?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of H1B professionals who've made the switch to transparent, fair pricing
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Start Your H1B Transfer
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
                Schedule Consultation
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              * Calculations are estimates based on provided information. Actual savings may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculatorPage; 