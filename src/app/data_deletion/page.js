import React from 'react';

const DataDeletion = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', lineHeight: '1.8', color: '#333', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Data Deletion Instructions</h1>

      <p style={{ marginBottom: '20px' }}>
        At Kichin, we respect your privacy and are committed to giving you full control over your personal data. If you wish to delete your account or remove your data from our system, please follow the instructions below.
      </p>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>How to Delete Your Data</h2>

      <ol style={{ marginBottom: '20px', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>Send a request:</strong> You can request data deletion by sending us an email at <a href="mailto:support@kichin.com">support@kichin.com</a> with the subject line “Data Deletion Request”.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Include your details:</strong> In the email, please provide the following details: your account email address and any other relevant information to help us identify your account.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Wait for confirmation:</strong> We will process your request and confirm via email once your data has been deleted from our system.
        </li>
      </ol>

      <p style={{ marginBottom: '20px' }}>
        If you have any further questions about data deletion or our privacy policy, please feel free to contact us at <a href="mailto:support@kichin.com">support@kichin.com</a>.
      </p>
    </div>
  );
};

export default DataDeletion;
