import React from 'react';

const TermsOfService = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Terms of Service</h1>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>1. Acceptance of Terms</h2>
      <p style={{ marginBottom: '15px' }}>
        By using the Kichin grocery tracker app, you agree to comply with and be bound by these Terms of Service. 
        Please read these terms carefully before using the App. If you do not agree to these terms, you may not use the App.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>2. Changes to the Terms</h2>
      <p style={{ marginBottom: '15px' }}>
        We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page, and the "Last updated" 
        date will be revised. Your continued use of the App after any changes signifies your acceptance of the updated terms.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>3. Description of the Service</h2>
      <p style={{ marginBottom: '15px' }}>
        The App is designed to help users track pantry items, including adding, updating, and removing inventory. 
        The App provides an easy-to-use interface for managing household pantry items but does not guarantee the accuracy 
        of information or reminders.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>4. User Responsibilities</h2>
      <p style={{ marginBottom: '15px' }}>
        You are responsible for keeping your pantry inventory data accurate and up to date. You are also responsible 
        for the security of your account login information and agree not to share your account credentials with others.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>5. Data Collection and Privacy</h2>
      <p style={{ marginBottom: '15px' }}>
        We collect and store information that you provide, such as your pantry items, inventory history, and usage data. 
        We may use this data to improve the service. For more details, refer to our <a href="#" style={{ color: '#007bff' }}>Privacy Policy</a>.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>6. Prohibited Activities</h2>
      <p style={{ marginBottom: '10px' }}>When using the App, you agree not to:</p>
      <ul style={{ marginBottom: '15px', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '5px' }}>Use the App for illegal purposes.</li>
        <li style={{ marginBottom: '5px' }}>Access or attempt to access other users' accounts without authorization.</li>
        <li style={{ marginBottom: '5px' }}>Disrupt the functioning of the App or server.</li>
      </ul>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>7. Intellectual Property</h2>
      <p style={{ marginBottom: '15px' }}>
        All content, including but not limited to text, graphics, logos, and software, is the property of [Your App Name] and 
        is protected by intellectual property laws. You may not duplicate, copy, or reuse any part of the App without express 
        written permission from [Your App Name].
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>8. Limitations of Liability</h2>
      <p style={{ marginBottom: '15px' }}>
        The App is provided "as is" without warranties of any kind. We are not responsible for any data loss, inaccuracies, 
        or errors that may occur. Your use of the App is at your own risk.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>9. Termination of Service</h2>
      <p style={{ marginBottom: '15px' }}>
        We reserve the right to suspend or terminate your access to the App at our discretion, with or without cause, and without notice.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>10. Governing Law</h2>
      <p style={{ marginBottom: '15px' }}>
        These Terms of Service shall be governed by and construed in accordance with the laws of [Your Country or Region], 
        without regard to its conflict of law principles.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>11. Contact Information</h2>
      <p style={{ marginBottom: '15px' }}>
        If you have any questions regarding these Terms of Service, please contact us at [Your Contact Email].
      </p>
    </div>
  );
};

export default TermsOfService;
