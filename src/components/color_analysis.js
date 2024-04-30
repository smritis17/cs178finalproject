import React, { useState, useEffect } from 'react';

// Displays color palette (concept)
const ColorAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const analysis_line = analysisResults[0];
  const analysis = analysis_line ? JSON.parse(analysis_line) : [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedResults = localStorage.getItem('analysisResults');
      if (storedResults) {
        setAnalysisResults(JSON.parse(storedResults));
      }
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ marginLeft: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Analysis Results</h3>
      {analysisResults.length === 0 ? (
        <p>No analysis results found.</p>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Your seasonal color is: {analysis[0]}</h3>
            <div style={{ backgroundColor: '#eaeaea', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
              <p style={{ margin: 0 }}>{analysis[1]}Keep in mind that these results are based on the photo and skin tone locations you've chosen to use. Changes in lighting, highlights, and shadows and location of the skin tones in the image can affect these results.</p>
              <p style={{ margin: '10px 0 0' }}>To learn more about your seasonal analysis, check out <a href="https://indigotones.com/pages/12-seasonal-tones" target='_blank'>here</a></p>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>These Are Some Colors We Think You'll Look Good In</h3>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {analysis[2].map((color, index) => (
                <div
                  key={index}
                  style={{
                    marginRight: '10px',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: color,
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {analysis[4][index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <br />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>These Are Some Colors We Think You Should Avoid</h3>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {analysis[3].map((color, index) => (
                <div
                  key={index}
                  style={{
                    marginRight: '10px',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: color,
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {analysis[5][index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorAnalysis;
