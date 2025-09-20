import React from 'react';

const TermsAndConditions: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-white">
    <h1 className="text-3xl font-bold mb-6 text-cyan-400">Terms and Conditions</h1>
    <p className="text-gray-400 mb-2">Effective Date: [Insert Date]</p>
    <ol className="list-decimal list-inside space-y-6 text-gray-200">
      <li>
        <strong>Introduction</strong>
        <p className="text-gray-400">Welcome to IPage Vision. By accessing or using our website, services, and products, you agree to comply with the following Terms and Conditions. These terms govern your use of IPageVision.com and any related services provided by us. If you do not agree to these terms, please do not use our services.</p>
      </li>
      <li>
        <strong>Use of Services</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>Provide accurate and complete information for project execution.</li>
          <li>Adhere to project timelines, payment terms, and submission requirements.</li>
          <li>Follow the instructions for using our interactive tools (e.g., design submission forms, VR walkthroughs, etc.).</li>
        </ul>
      </li>
      <li>
        <strong>Account Registration</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the confidentiality of your account and password.</li>
          <li>Notify us immediately if you suspect unauthorized access or misuse of your account.</li>
        </ul>
      </li>
      <li>
        <strong>Intellectual Property</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>All content on IPageVision.com, including but not limited to images, designs, text, logos, and software, is the property of IPage Vision or its licensors and is protected by copyright and intellectual property laws.</li>
          <li>You may not copy, modify, distribute, or use any content from the website for commercial purposes without prior written consent from IPage Vision.</li>
        </ul>
      </li>
      <li>
        <strong>Service Pricing & Payment Terms</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>All service pricing is clearly stated on our website. Prices may vary based on the scope of the project.</li>
          <li>IPage Vision may require a 50% deposit before project initiation, with the remaining balance due upon delivery of the final product.</li>
          <li>Payments are accepted via credit/debit card, bank transfer, or other payment methods specified on our website.</li>
          <li>All payments are non-refundable unless otherwise specified.</li>
        </ul>
      </li>
      <li>
        <strong>Client Responsibilities</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>Providing all necessary design materials, including but not limited to floor plans, images, and other project details.</li>
          <li>Ensuring that the materials you provide do not infringe upon any third-party intellectual property rights.</li>
          <li>Approving initial drafts and providing feedback within the agreed-upon timelines to ensure project continuity.</li>
        </ul>
      </li>
      <li>
        <strong>Deliverables</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>All services and deliverables provided by IPage Vision are subject to the specific terms outlined in your project agreement.</li>
          <li>Final deliverables will be provided in the formats agreed upon (e.g., high-resolution images, 3D models, VR walkthroughs).</li>
          <li>IPage Vision reserves the right to withhold deliverables if payment terms are not met.</li>
        </ul>
      </li>
      <li>
        <strong>Modifications and Cancellations</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li><strong>Modifications:</strong> Any changes to the scope of work after the project has commenced may result in additional charges.</li>
          <li><strong>Cancellations:</strong> If you choose to cancel the project before completion, a cancellation fee may apply, depending on the progress made at the time of cancellation.</li>
        </ul>
      </li>
      <li>
        <strong>Privacy Policy</strong>
        <p className="text-gray-400">Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information when using our website and services.</p>
      </li>
      <li>
        <strong>Limitation of Liability</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>IPage Vision will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or services.</li>
          <li>Our total liability for any claim related to these Terms and Conditions is limited to the amount paid by you for the specific service in question.</li>
        </ul>
      </li>
      <li>
        <strong>Indemnification</strong>
        <p className="text-gray-400">You agree to indemnify, defend, and hold harmless IPage Vision, its employees, affiliates, and agents, from any claims, damages, losses, or expenses arising out of your use of the website or services, including any breach of these Terms and Conditions.</p>
      </li>
      <li>
        <strong>Governing Law</strong>
        <p className="text-gray-400">These Terms and Conditions are governed by and construed in accordance with the laws of Singapore. Any disputes arising from these terms shall be resolved in the competent courts of Singapore.</p>
      </li>
      <li>
        <strong>Changes to Terms and Conditions</strong>
        <p className="text-gray-400">IPage Vision reserves the right to modify or update these Terms and Conditions at any time. We will notify you of any significant changes by updating the ‘Effective Date’ at the top of this document. By continuing to use our services after such changes, you agree to be bound by the revised Terms and Conditions.</p>
      </li>
      <li>
        <strong>Contact Information</strong>
        <div className="text-gray-400">
          <p>IPage Vision</p>
          <p>Address: IPage Vision Head Studio, Blk 641A, Punggol Drive, Singapore 821641</p>
          <p>Phone: +65 9090 3217</p>
          <p>Email: bd@ipagevision.com</p>
        </div>
      </li>
      <li>
        <strong>Use of Information and Deliverables</strong>
        <ol className="list-decimal list-inside ml-6 text-gray-400 space-y-2">
          <li>
            <strong>Client Data:</strong> By submitting your design materials, floorplans, and other information to IPage Vision, you grant us permission to use this information for the purpose of providing our services. IPage Vision may retain and use the data you provide for project execution, marketing, training, and promotional activities, unless otherwise requested in writing.
          </li>
          <li>
            <strong>Deliverables:</strong> The final deliverables (e.g., renders, 3D models, VR walkthroughs) produced by IPage Vision may be used by us for marketing purposes, including but not limited to showcasing in portfolios, social media, website galleries, and promotional materials. If you prefer that the deliverables not be used for these purposes, please notify us in writing at the time of contract agreement or before project completion.
          </li>
        </ol>
      </li>
    </ol>
  </div>
);

export default TermsAndConditions;
