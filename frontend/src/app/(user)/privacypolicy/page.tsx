import { NextPage } from 'next'
import Link from 'next/link'

const Privacy: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 mb-2">
            We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="text-gray-700 mb-2">
            We may collect and process the following types of information about you:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Personal identification information (name, email address, phone number, etc.)</li>
            <li>Technical data (IP address, browser type, version, etc.)</li>
            <li>Usage data (information about how you use our website)</li>
            <li>Marketing and communications data (your preferences in receiving marketing from us)</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-2">
            We use your information in the following ways:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide you with news, special offers, and general information about other goods, services, and events which we offer</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">4. How We Share Your Information</h2>
          <p className="text-gray-700 mb-2">
            We may share your personal data with third parties in the following situations:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>With service providers to monitor and analyze the use of our service</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights or property</li>
            <li>To prevent or investigate possible wrongdoing in connection with our service</li>
            <li>To protect the personal safety of users of our service or the public</li>
            <li>With your consent</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">5. Security of Your Information</h2>
          <p className="text-gray-700 mb-2">
            We use appropriate security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the Internet, or method of electronic storage is 100% secure.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">6. Your Data Protection Rights</h2>
          <p className="text-gray-700 mb-2">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-2">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p className="text-gray-700 mb-2 ">
            If you have any questions about this Privacy Policy, please contact us at <Link className="text-gray-900 text-b"  href="mailto:info@RenovatePro.com">
        
        info@RenovatePro.com
    </Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
