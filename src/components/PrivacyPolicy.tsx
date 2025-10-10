import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-white">
    <h1 className="text-3xl font-bold mb-6 text-cyan-400">Privacy Policy</h1>
    <p className="text-gray-400 mb-2">Effective Date: 20 September 2025</p>
    <ol className="list-decimal list-inside space-y-6 text-gray-200">
      <li>
        <strong>Information We Collect</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li><strong>Personal Information:</strong> Name, email address, phone number, and company information when you fill out forms or register for services.</li>
          <li><strong>Non-Personal Information:</strong> Browsing data such as IP addresses, browser types, device information, and usage patterns to improve our website functionality.</li>
        </ul>
      </li>
      <li>
        <strong>How We Use Your Information</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li>To provide and maintain our services (e.g., 3D modeling, rendering, architectural visualization).</li>
          <li>To communicate with you regarding project updates, queries, and feedback.</li>
          <li>To send promotional emails, newsletters, or offers related to our services (you can opt-out at any time).</li>
          <li>To improve the user experience on our website through data analysis and performance monitoring.</li>
        </ul>
      </li>
      <li>
        <strong>Sharing Your Information</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li><strong>Service Providers:</strong> We may share your data with trusted third-party vendors and service providers who assist in running our website and services.</li>
          <li><strong>Legal Requirements:</strong> If required by law or to comply with legal processes, we may disclose your information to government authorities or law enforcement agencies.</li>
        </ul>
      </li>
      <li>
        <strong>Data Retention</strong>
        <p className="text-gray-400">We will retain your personal information only for as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. After this period, we will securely delete your information.</p>
      </li>
      <li>
        <strong>Data Security</strong>
        <p className="text-gray-400">We take data security seriously and implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, please note that no method of transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>
      </li>
      <li>
        <strong>Cookies and Tracking Technologies</strong>
        <p className="text-gray-400">We use cookies and similar tracking technologies (e.g., web beacons) to enhance the user experience on our website. Cookies help us analyze website traffic and improve our services. You can choose to accept or refuse cookies through your browser settings. However, some parts of the website may not function properly if cookies are disabled.</p>
      </li>
      <li>
        <strong>Your Rights</strong>
        <ul className="list-disc list-inside ml-6 text-gray-400">
          <li><strong>Access:</strong> Request access to the personal information we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of any incorrect or incomplete personal information.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information (subject to certain conditions).</li>
          <li><strong>Opt-out:</strong> You can unsubscribe from our marketing communications at any time by clicking the 'unsubscribe' link in emails or contacting us directly.</li>
        </ul>
        <p className="text-gray-400">To exercise these rights, please contact us at bd@ipagevision.com.</p>
      </li>
      <li>
        <strong>Third-Party Links</strong>
        <p className="text-gray-400">Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these sites. We encourage you to review their privacy policies before providing any personal information.</p>
      </li>
      <li>
        <strong>Children's Privacy</strong>
        <p className="text-gray-400">Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete such information.</p>
      </li>
      <li>
        <strong>Changes to This Privacy Policy</strong>
        <p className="text-gray-400">We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. Any changes will be posted on this page with the updated 'Effective Date'. We encourage you to review this policy periodically.</p>
      </li>
      <li>
        <strong>Contact Information</strong>
        <div className="text-gray-400">
          <p>IPage Vision</p>
          <p>Email: bd@ipagevision.com</p>
          <p>Phone: +65 8216 1261</p>
          <p>Address: IPage Vision Head Studio, Blk 641A, Punggol Drive, Singapore 821641</p>
        </div>
      </li>
    </ol>
  </div>
);

export default PrivacyPolicy;
