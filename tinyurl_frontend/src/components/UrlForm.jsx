import React, { useState } from 'react';
import axios from 'axios';
import UrlResult from './UrlResult';

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiration, setExpiration] = useState('');
  const [result, setResult] = useState(null);
  const [codeMessage, setCodeMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Convert to UTC ISO string if expiration is provided
    let expireAt = null;
    if (expiration) {
      const localDate = new Date(expiration);
      expireAt = localDate.toISOString(); // Convert to UTC format
    }

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', {
        longUrl,
        customCode,
        expireAt, // 👈 use this instead of raw expiration
      });
      setResult(res.data);
    } catch (err) {
      alert("Error shortening URL. Try again.");
      console.error(err);
    }
  };

  const handleCustomCodeChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      setCodeMessage('Custom code must be at most 10 characters.');
    } else {
      setCodeMessage('');
    }
    setCustomCode(value);
  };

  return (
    <div className="form-container">
      <h1>Create Your TinyURL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom short code (optional)"
          value={customCode}
          maxLength={20} // allows typing more, so we can show warning
          onChange={handleCustomCodeChange}
        />
        {codeMessage && <p style={{ color: 'red', fontSize: '14px' }}>{codeMessage}</p>}

        <input
          type="datetime-local"
          placeholder="Expiration date (optional)"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {result && <UrlResult result={result} />}
    </div>
  );
};

export default UrlForm;
