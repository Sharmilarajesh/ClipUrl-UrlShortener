import React from 'react';

const UrlResult = ({ result }) => {
  return (
    <div className="result-box">
      <p>✅ Short URL generated:</p>
      <a href={result.shortUrl} target="_blank" rel="noreferrer">
        {result.shortUrl}
      </a>
    </div>
  );
};

export default UrlResult;
