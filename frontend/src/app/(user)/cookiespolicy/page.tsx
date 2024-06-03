import { NextPage } from 'next'
import Link from 'next/link'

const Cookies: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 mb-2">
            Our website uses cookies to improve user experience. This Cookies Policy explains what cookies are, how we use them, and how you can manage them.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">2. What are Cookies?</h2>
          <p className="text-gray-700 mb-2">
            Cookies are small text files stored on your device by your web browser. They are used to remember your preferences, login information, and other data related to your interactions with our site.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Cookies</h2>
          <p className="text-gray-700 mb-2">
            We use cookies to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Understand and save user preferences for future visits</li>
            <li>Compile aggregate data about site traffic and site interactions to improve user experience</li>
            <li>Provide targeted advertising and marketing communications</li>
            <li>Enhance site security</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">4. Types of Cookies We Use</h2>
          <p className="text-gray-700 mb-2">
            Our website uses the following types of cookies:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be turned off.</li>
            <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use our website, such as which pages are visited most often.</li>
            <li><strong>Functionality Cookies:</strong> These cookies remember choices you make to improve your experience.</li>
            <li><strong>Targeting Cookies:</strong> These cookies are used to deliver ads more relevant to you and your interests.</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">5. Managing Cookies</h2>
          <p className="text-gray-700 mb-2">
            You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.
          </p>
          <p className="text-gray-700 mb-2">
            Here are links to manage cookies in popular browsers:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-500 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-blue-500 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-500 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-500 hover:underline">Internet Explorer</a></li>
            <li><a href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy" className="text-blue-500 hover:underline">Microsoft Edge</a></li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">6. Third-Party Cookies</h2>
          <p className="text-gray-700 mb-2">
            We also use third-party cookies to track and measure usage of our site and to provide targeted advertising. These cookies are provided by trusted third-party services.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">7. Changes to This Cookies Policy</h2>
          <p className="text-gray-700 mb-2">
            We may update this Cookies Policy from time to time. We encourage you to review this policy periodically to stay informed about how we use cookies.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about our use of cookies, please contact us at  <Link href="mailto:info@renoswift.com">
        
        info@renoswift.com
    </Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Cookies
