export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">H1BConnect</h3>
            <p className="text-gray-300">
              Transparent H1B transfer and compliance platform. No percentage cuts, just flat fees.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>H1B Transfer</li>
              <li>Compliance Management</li>
              <li>Payroll Services</li>
              <li>Legal Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Documentation</li>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Legal Help</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>support@h1bconnect.com</li>
              <li>1-800-H1B-HELP</li>
              <li>Schedule Consultation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 H1BConnect. All rights reserved. Built with ❤️ for the H1B community.</p>
        </div>
      </div>
    </footer>
  );
}; 