import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle, AlertCircle, Shield } from 'lucide-react';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentData> = {};

    if (!paymentData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!paymentData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    }

    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!paymentData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!paymentData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof PaymentData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !agreedToTerms) {
      if (!agreedToTerms) {
        alert('Please agree to the terms and conditions');
      }
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/payment-confirmation');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/documents" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-xl text-gray-600">Secure your H1BConnect service with our one-time setup fee</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        maxLength={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        maxLength={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.cardholderName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.cardholderName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                  
                  <div>
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={paymentData.billingAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.billingAddress && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.billingAddress}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={paymentData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={paymentData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={paymentData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={paymentData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                    I agree to the payment terms and authorize H1BConnect to charge my card for the setup fee of $3,500. 
                    I understand this payment is non-refundable once document processing begins.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing || !agreedToTerms}
                  className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Pay $3,500 Securely
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">H1BConnect Setup Fee</span>
                  <span className="font-semibold">$3,500.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Includes:</span>
                  <span></span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• H-1B transfer paperwork</li>
                  <li>• Legal document review</li>
                  <li>• USCIS filing fees</li>
                  <li>• Client coordination</li>
                  <li>• Employment agreement</li>
                </ul>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>$3,500.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-900">Secure Payment</span>
                </div>
                <p className="text-sm text-green-800">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Immediate payment confirmation</li>
                  <li>• Document processing begins</li>
                  <li>• H-1B transfer initiation</li>
                  <li>• Regular status updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 