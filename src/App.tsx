import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { Footer } from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import SavingsCalculator from './pages/SavingsCalculator';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingConfirmationPage from './pages/OnboardingConfirmationPage';
import PaymentPage from './pages/PaymentPage';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './pages/DocumentUpload';
import TimesheetPage from './pages/TimesheetPage';
import BenefitsPage from './pages/BenefitsPage';
import CompliancePage from './pages/CompliancePage';
import GreenCardPage from './pages/GreenCardPage';
import ReferralPage from './pages/ReferralPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user, initializeAuth } = useAuthStore();
  
  // Only consider user authenticated if we have both token and user data
  const isActuallyAuthenticated = isAuthenticated && user;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="min-h-screen bg-gray-50">
      <LeftSidebar />
      <div className="ml-0 md:ml-64 transition-all duration-300 min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/calculator" element={<SavingsCalculator />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              
              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={isActuallyAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
              />
              <Route 
                path="/register" 
                element={isActuallyAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} 
              />
              <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
              <Route path="/onboarding-confirmation" element={<OnboardingConfirmationPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/documents" element={
                <ProtectedRoute>
                  <DocumentUpload />
                </ProtectedRoute>
              } />
              <Route path="/timesheets" element={
                <ProtectedRoute>
                  <TimesheetPage />
                </ProtectedRoute>
              } />
              <Route path="/benefits" element={
                <ProtectedRoute>
                  <BenefitsPage />
                </ProtectedRoute>
              } />
              <Route path="/compliance" element={
                <ProtectedRoute>
                  <CompliancePage />
                </ProtectedRoute>
              } />
              <Route path="/green-card" element={
                <ProtectedRoute>
                  <GreenCardPage />
                </ProtectedRoute>
              } />
              <Route path="/referral" element={
                <ProtectedRoute>
                  <ReferralPage />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
                    </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App; 