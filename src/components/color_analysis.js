import React, { useState, useEffect } from 'react';
import { CirclePicker, SketchPicker } from 'react-color';

const ColorAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const analysis_line = analysisResults[0];
  //const analysis = analysis_line.slice(1, -1).split(", ");
  //console.log(analysis);
  const analysis = analysis_line ? JSON.parse(analysis_line) : [];
  console.log(analysis);
  console.log(typeof analysis);
  console.log(analysis.length)
  

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
    <div style={{ marginLeft: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Analysis Results</h3>
  {analysisResults.length === 0 ? (
    <p>No analysis results found.</p>
  ) : (
    <div>
      <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Your seasonal color is: {analysisResults[0]}</h3>
      <p> To learn more about this, check out [insert link]</p>
      <br />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Colors You'll Look Good In</h3>
        <br />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {analysisResults[1].split(', ').map((color, index) => (
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
                  {color}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <br /> 
        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Colors You Should Avoid</h3>
        <br/>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {analysisResults[2].split(', ').map((color, index) => (
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
                  {color}
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
