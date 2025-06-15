# Frontend/Backend Integration Testing Guide

## Current Status ✅

### CORS Issue - RESOLVED
- ✅ Preflight OPTIONS requests now return 204 status
- ✅ CORS headers properly configured
- ✅ Frontend origin `https://h1b-frontend.vercel.app` is allowed

### Registration Issue - RESOLVED
- ✅ Backend validation error fixed (phone field removed from request)
- ✅ Registration endpoint working: `POST /api/auth/register`
- ✅ Returns 201 Created with user data

## Environment Configuration

### Production Environment Variables

**Vercel (Frontend):**
```bash
VITE_API_URL=https://h1b-backend-production.up.railway.app/api
VITE_APP_NAME=H1BConnect
VITE_APP_VERSION=1.0.0
```

**Railway (Backend):**
```bash
FRONTEND_URL=https://h1b-frontend.vercel.app
NODE_ENV=production
PORT=5000
```

## API Endpoints Testing Checklist

### Authentication Endpoints

#### ✅ POST /api/auth/register
- **Status**: Working
- **Test Command**: 
```bash
curl -X POST "https://h1b-backend-production.up.railway.app/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Test123!"}'
```
- **Expected Response**: 201 Created
- **Frontend Integration**: ✅ Working (phone field removed)

#### 🔄 POST /api/auth/login
- **Status**: Needs Testing
- **Test Command**:
```bash
curl -X POST "https://h1b-backend-production.up.railway.app/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```
- **Frontend Integration**: ⏳ Pending verification

#### 🔄 GET /api/auth/verify-email/:token
- **Status**: Needs Testing
- **Frontend Integration**: ⏳ Pending verification

### Protected Endpoints (Require Authentication)

#### 🔄 GET /api/user/profile
- **Status**: Needs Testing
- **Frontend Integration**: ⏳ Pending verification

#### 🔄 PUT /api/user/profile
- **Status**: Needs Testing
- **Frontend Integration**: ⏳ Pending verification

## Frontend Pages Integration Status

### Public Pages
- ✅ HomePage - No backend integration needed
- ✅ AboutPage - No backend integration needed
- ✅ HowItWorksPage - No backend integration needed
- ✅ PricingPage - No backend integration needed
- ✅ ContactPage - May need contact form API
- ✅ SavingsCalculator - Client-side only

### Authentication Pages
- ✅ RegisterPage - Backend integration working
- 🔄 LoginPage - Needs testing
- 🔄 EmailVerificationPage - Needs testing

### Protected Pages (Require Authentication)
- 🔄 Dashboard - Needs API integration testing
- 🔄 DocumentUpload - Needs file upload API
- 🔄 TimesheetPage - Needs timesheet API
- 🔄 BenefitsPage - Needs benefits API
- 🔄 CompliancePage - Needs compliance API
- 🔄 GreenCardPage - Needs green card API
- 🔄 ReferralPage - Needs referral API
- 🔄 PaymentPage - Needs payment API
- 🔄 ProfilePage - Needs profile API

## Testing Strategy

### 1. Manual Testing Steps

#### Registration Flow
1. Go to https://h1b-frontend.vercel.app/register
2. Fill out the form (note: phone field is collected but not sent to backend)
3. Submit registration
4. Verify success response and redirect

#### Login Flow
1. Go to https://h1b-frontend.vercel.app/login
2. Use credentials from registration
3. Verify successful login and redirect to dashboard

#### Protected Routes
1. Try accessing protected routes without authentication
2. Verify redirect to login page
3. Login and verify access to protected routes

### 2. Automated Testing

#### API Testing Script
```bash
#!/bin/bash
API_BASE="https://h1b-backend-production.up.railway.app/api"

# Test registration
echo "Testing registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"TestUser","lastName":"Integration","email":"test-integration@example.com","password":"Test123!"}')
echo "Register Response: $REGISTER_RESPONSE"

# Test login
echo "Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test-integration@example.com","password":"Test123!"}')
echo "Login Response: $LOGIN_RESPONSE"

# Extract token for authenticated requests
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // empty')
if [ ! -z "$TOKEN" ]; then
  echo "Token received: ${TOKEN:0:20}..."
  
  # Test protected endpoint
  echo "Testing protected endpoint..."
  PROFILE_RESPONSE=$(curl -s -X GET "$API_BASE/user/profile" \
    -H "Authorization: Bearer $TOKEN")
  echo "Profile Response: $PROFILE_RESPONSE"
fi
```

### 3. Error Handling Verification

#### Common Error Scenarios
- ✅ CORS errors - Resolved
- ✅ Validation errors - Resolved (phone field)
- 🔄 Authentication errors - Needs testing
- 🔄 Network errors - Needs testing
- 🔄 Server errors (5xx) - Needs testing

## Deployment Verification

### Frontend (Vercel)
1. ✅ Build successful
2. ✅ Environment variables configured
3. ✅ CORS working with backend

### Backend (Railway)
1. ✅ Deployment successful
2. ✅ Environment variables configured
3. ✅ CORS configured for frontend origin
4. ✅ API endpoints responding

## Next Steps

1. **Test Login Flow** - Verify login endpoint and token handling
2. **Test Email Verification** - Verify email verification flow
3. **Test Protected Routes** - Verify authentication middleware
4. **Add Phone Field Support** - If needed, add phone field to backend schema
5. **Implement Error Boundaries** - Add proper error handling in frontend
6. **Add Loading States** - Improve UX with loading indicators
7. **Add Form Validation** - Client-side validation improvements

## Monitoring and Debugging

### Frontend Debugging
- Check browser console for errors
- Verify network requests in DevTools
- Check localStorage for auth tokens

### Backend Debugging
- Check Railway logs for errors
- Monitor API response times
- Verify database connections

### CORS Debugging
```bash
# Test CORS preflight
curl -X OPTIONS "https://h1b-backend-production.up.railway.app/api/auth/register" \
  -H "Origin: https://h1b-frontend.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

## Contact Information
- Frontend: https://h1b-frontend.vercel.app
- Backend: https://h1b-backend-production.up.railway.app
- Frontend Repo: https://github.com/phaniblend/h1b-frontend.git
- Backend Repo: https://github.com/phaniblend/h1b-backend.git 