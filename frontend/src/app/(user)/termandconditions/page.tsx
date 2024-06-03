import { NextPage } from 'next'

const Terms: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 mb-2">
            Welcome to our website! By accessing and using this site, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property Rights</h2>
          <p className="text-gray-700 mb-2">
            Other than the content you own, under these Terms, we own all the intellectual property rights and materials contained in this Website.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">3. Restrictions</h2>
          <p className="text-gray-700 mb-2">
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any Website material</li>
            <li>Publicly performing and/or showing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to this Website</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">4. Your Content</h2>
          <p className="text-gray-700 mb-2">
            In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display on this Website.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">5. No warranties</h2>
          <p className="text-gray-700 mb-2">
            This Website is provided "as is," with all faults, and we express no representations or warranties, of any kind related to this Website or the materials contained on this Website.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">6. Limitation of liability</h2>
          <p className="text-gray-700 mb-2">
            In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">7. Indemnification</h2>
          <p className="text-gray-700 mb-2">
            You hereby indemnify to the fullest extent us from and against any and all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">8. Severability</h2>
          <p className="text-gray-700 mb-2">
            If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">9. Variation of Terms</h2>
          <p className="text-gray-700 mb-2">
            We are permitted to revise these Terms at any time as we see fit, and by using this Website, you are expected to review these Terms on a regular basis.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">10. Assignment</h2>
          <p className="text-gray-700 mb-2">
            We are allowed to assign, transfer, and subcontract our rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
          </p>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">11. Entire Agreement</h2>
          <p className="text-gray-700 mb-2">
            These Terms constitute the entire agreement between us and you in relation to your use of this Website and supersede all prior agreements and understandings.
          </p>
        </section>
        
      </div>
    </div>
  )
}

export default Terms
