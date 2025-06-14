import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Phone, Mail, Clock, FileText, ChevronRight, Home, HelpCircle, Book, Users } from 'lucide-react';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  views: number;
}

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: Users },
    { id: 'h1b-transfer', name: 'H-1B Transfer', icon: FileText },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'payments', name: 'Payments', icon: FileText },
    { id: 'green-card', name: 'Green Card', icon: FileText },
    { id: 'compliance', name: 'Compliance', icon: FileText }
  ];

  const popularArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'How long does the H-1B transfer process take?',
      category: 'h1b-transfer',
      summary: 'Complete timeline breakdown from application to approval',
      views: 1250
    },
    {
      id: '2',
      title: 'What documents do I need for H-1B transfer?',
      category: 'documents',
      summary: 'Comprehensive checklist of required documents',
      views: 980
    },
    {
      id: '3',
      title: 'Can I start working immediately after filing?',
      category: 'h1b-transfer',
      summary: 'Understanding work authorization during transfer',
      views: 875
    },
    {
      id: '4',
      title: 'What happens if my transfer is denied?',
      category: 'h1b-transfer',
      summary: 'Options and next steps for denied applications',
      views: 720
    },
    {
      id: '5',
      title: 'How to track my application status?',
      category: 'getting-started',
      summary: 'Using the dashboard and USCIS tracking tools',
      views: 650
    },
    {
      id: '6',
      title: 'Payment methods and refund policy',
      category: 'payments',
      summary: 'Understanding fees, payment options, and refunds',
      views: 580
    }
  ];

  const allArticles: HelpArticle[] = [
    ...popularArticles,
    {
      id: '7',
      title: 'Green Card eligibility requirements',
      category: 'green-card',
      summary: 'Understanding PERM and EB categories',
      views: 450
    },
    {
      id: '8',
      title: 'Maintaining H-1B compliance',
      category: 'compliance',
      summary: 'Key compliance requirements and best practices',
      views: 380
    },
    {
      id: '9',
      title: 'Changing employers during transfer',
      category: 'h1b-transfer',
      summary: 'What to do if you want to change jobs',
      views: 320
    },
    {
      id: '10',
      title: 'Document upload troubleshooting',
      category: 'documents',
      summary: 'Common issues and solutions for document uploads',
      views: 280
    }
  ];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-xl text-gray-600">Get the help you need, when you need it</p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Chat
            </button>
            <p className="text-sm text-gray-500 mt-2">Average response: 2 minutes</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak directly with our experts</p>
            <a
              href="tel:1-800-H1B-HELP"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              1-800-H1B-HELP
            </a>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9 AM - 6 PM EST</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Detailed help via email</p>
            <a
              href="mailto:support@h1bconnect.com"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block"
            >
              Send Email
            </a>
            <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
          </div>
        </div>

        {/* Legal Hotline */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Legal Emergency Hotline</h3>
              <p className="text-red-700">For urgent legal matters and compliance issues</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1-800-LEGAL-911"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-center font-semibold"
            >
              1-800-LEGAL-911
            </a>
            <div className="text-sm text-red-700">
              <p>• Available 24/7 for emergencies</p>
              <p>• USCIS notices and RFEs</p>
              <p>• Compliance violations</p>
            </div>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Help Articles</h2>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Search Results */}
          <div className="space-y-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-2">{article.summary}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="capitalize">{article.category.replace('-', ' ')}</span>
                        <span className="mx-2">•</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse by category</p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.slice(0, 6).map((article) => (
              <div
                key={article.id}
                className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{article.views} views</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/dashboard"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
            <p className="text-sm text-gray-600">Check your application status</p>
          </Link>

          <Link
            to="/documents"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Documents</h3>
            <p className="text-sm text-gray-600">Submit required paperwork</p>
          </Link>

          <Link
            to="/timesheets"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Timesheets</h3>
            <p className="text-sm text-gray-600">Submit your work hours</p>
          </Link>

          <Link
            to="/contact"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
            <p className="text-sm text-gray-600">Get personalized help</p>
          </Link>
        </div>

        {/* Full Knowledgebase Link */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-blue-100 mb-6">
            Browse our complete knowledgebase with detailed guides, FAQs, and step-by-step tutorials
          </p>
          <Link
            to="/knowledgebase"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <Book className="h-5 w-5 mr-2" />
            See All Help Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 