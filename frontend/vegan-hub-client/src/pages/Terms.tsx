// src/pages/Terms.tsx
export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Terms and Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using VeganHub, you agree to be bound by these Terms and Conditions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Content</h2>
            <p>Users are responsible for ensuring all submitted recipes are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>100% vegan (containing no animal products)</li>
              <li>Original or properly credited</li>
              <li>Accurately described and labeled</li>
              <li>Safe and suitable for consumption</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Content Moderation</h2>
            <p>VeganHub reserves the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review all submitted recipes</li>
              <li>Reject content that doesn't meet our guidelines</li>
              <li>Remove content that violates our terms</li>
              <li>Suspend accounts that repeatedly violate our terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>Users retain rights to their submitted recipes but grant VeganHub license to display and promote the content.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
            <p>Users must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post non-vegan recipes</li>
              <li>Harass other users</li>
              <li>Spam or post misleading content</li>
              <li>Attempt to damage or disrupt the service</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}