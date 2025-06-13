import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Curved Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-20 transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600 rounded-full opacity-15 transform -translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 rounded-full opacity-10 transform translate-x-32"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                H1B Transfer
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Without
                </span>
                <br />
                <span className="text-white">the Cut</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We pay for your H-1B legal and filing fees. You just pay $3,500 setup + $500/month for full compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/calculator"
                  className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-400 hover:text-blue-900 transition-all text-lg"
                >
                  Calculate Savings
                </Link>
              </div>
            </div>

            {/* Right Content - Professional Illustration Area */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Data Cards Floating */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="text-cyan-400 text-sm font-medium">Annual Savings</div>
                  <div className="text-white text-2xl font-bold">$33,000</div>
                </div>
                
                <div className="absolute bottom-16 left-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="text-blue-300 text-sm font-medium">Processing Time</div>
                  <div className="text-white text-xl font-bold">2-3 weeks</div>
                </div>

                {/* Central Professional Element */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl">🏢</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Professional H1B Services</h3>
                    <p className="text-blue-200 text-sm">Legal compliance without the traditional cuts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Choose H1BConnect?
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Transparent, compliant, and cost-effective H1B management with professional support
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Save $33,000+ Annually</h3>
              <p className="text-slate-600 leading-relaxed">No percentage cuts. Keep your full hourly rate and maximize your earnings.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Full Compliance</h3>
              <p className="text-slate-600 leading-relaxed">Legal, transparent, and fully compliant employer-of-record services.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-slate-100 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Fast Processing</h3>
              <p className="text-slate-600 leading-relaxed">Streamlined H1B transfer process with premium support and quick turnaround.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Compare & Save
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              See the transparent breakdown of how much you save with our professional model
            </p>
          </div>
          
          {/* Mobile-friendly cards */}
          <div className="lg:hidden space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-center mb-8 text-red-700">Traditional Consulting (25% Cut)</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Annual Billable Hours</span>
                  <span className="font-bold text-slate-900">2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Gross Billed Amount</span>
                  <span className="font-bold text-slate-900">$170,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Employer Cut</span>
                  <span className="text-red-600 font-bold text-xl">$42,500 (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Setup + Monthly Fees</span>
                  <span className="font-bold text-slate-900">$0</span>
                </div>
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Net Payout to You</span>
                    <span className="font-bold text-2xl text-slate-900">$127,500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-center mb-8 text-blue-700">H1BConnect Professional Model</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Annual Billable Hours</span>
                  <span className="font-bold text-slate-900">2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Gross Billed Amount</span>
                  <span className="font-bold text-slate-900">$170,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Employer Cut</span>
                  <span className="text-emerald-600 font-bold text-xl">$0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Setup + Monthly Fees</span>
                  <span className="font-bold text-slate-900">$9,500</span>
                </div>
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-900">Net Payout to You</span>
                    <span className="font-bold text-2xl text-emerald-600">$160,500</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-center">
                    <span className="font-bold text-white text-xl">Annual Savings: +$33,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-8 py-6 text-left font-bold text-slate-900 text-lg">Criteria</th>
                    <th className="px-8 py-6 text-center font-bold text-slate-900 text-lg">Traditional Consulting</th>
                    <th className="px-8 py-6 text-center font-bold text-blue-700 text-lg bg-blue-50">H1BConnect Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="px-8 py-6 font-semibold text-slate-700">Annual Billable Hours</td>
                    <td className="px-8 py-6 text-center text-slate-900">2,000</td>
                    <td className="px-8 py-6 text-center bg-blue-50 text-slate-900">2,000</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-8 py-6 font-semibold text-slate-700">Gross Billed Amount</td>
                    <td className="px-8 py-6 text-center text-slate-900">$170,000</td>
                    <td className="px-8 py-6 text-center bg-blue-50 text-slate-900">$170,000</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-8 py-6 font-semibold text-slate-700">Employer Cut</td>
                    <td className="px-8 py-6 text-center text-red-600 font-bold text-xl">$42,500 (25%)</td>
                    <td className="px-8 py-6 text-center bg-blue-50 text-emerald-600 font-bold text-xl">$0</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-8 py-6 font-semibold text-slate-700">Setup + Monthly Fees</td>
                    <td className="px-8 py-6 text-center text-slate-900">$0</td>
                    <td className="px-8 py-6 text-center bg-blue-50 text-slate-900">$9,500</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-emerald-50">
                    <td className="px-8 py-6 font-bold text-slate-900 text-lg">Net Payout to You</td>
                    <td className="px-8 py-6 text-center font-bold text-2xl text-slate-900">$127,500</td>
                    <td className="px-8 py-6 text-center font-bold text-2xl text-emerald-600 bg-emerald-100">$160,500</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-emerald-100">
                    <td className="px-8 py-6 font-bold text-emerald-800 text-lg">Annual Savings</td>
                    <td className="px-8 py-6 text-center text-slate-400">-</td>
                    <td className="px-8 py-6 text-center font-bold text-emerald-800 text-3xl">+$33,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500 rounded-full opacity-10 transform translate-x-40 translate-y-40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Take Control of Your H1B?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of professionals who are saving money while staying fully compliant with our transparent model
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 text-xl shadow-2xl"
          >
            Start Your Application Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 