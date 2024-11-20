// src/MyComponent.jsx
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <div role="alert">Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return <div role="contentinfo">{data.message}</div>;
};

export default MyComponent;
