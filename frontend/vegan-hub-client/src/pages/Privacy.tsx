// src/pages/Privacy.tsx
export default function Privacy() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
  
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (email, username)</li>
                <li>Profile information (display name, bio)</li>
                <li>Recipe content</li>
                <li>Usage data and preferences</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about your account</li>
                <li>Send updates about new features or recipes</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p className="mb-4">We implement security measures to protect your personal information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Secure password storage</li>
                <li>Limited access to personal data</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p className="mb-4">If you have questions about our privacy policy, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: kizwiz@hotmail.co.uk</li>
                <li>Created by: Kieran Emery</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }