import React, { useState, useEffect } from 'react';

const ColorAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedResults = localStorage.getItem('analysisResults');
      if (storedResults) {
        setAnalysisResults(JSON.parse(storedResults));
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ marginLeft: '20px'}}>
      <h3>Analysis Results:</h3>
      {analysisResults.length === 0 ? (
        <p>No analysis results found.</p>
      ) : (
        analysisResults.map((result, index) => (
          <p key={index}>{result}</p>
        ))
      )}
    </div>
  );
};

export default ColorAnalysis;
