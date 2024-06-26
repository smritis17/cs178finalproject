import React, { useState } from 'react';
import useOpenAI from '../hooks/useOpenAI';

// Initialize local storage JSON to empty
localStorage.setItem('analysisResults', '');

const FaceRead = () => {
  // State variables
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [skinColor, setSkinColor] = useState('#000000');
  const [hairColor, setHairColor] = useState('#000000');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [lipColor, setLipColor] = useState('#000000');
  const [borderStyle, setBorderStyle] = useState('2px solid black');
  const [loading, setLoading] = useState(false);
  const [tipText, setTipText] = useState('');

  const askQuestion = useOpenAI();

  // Concept: uploaded image
  const handleImageUpload = () => {
    // Reset color buttons
    setSkinColor('#000000');
    setHairColor('#000000');
    setEyeColor('#000000');
    setLipColor('#000000');

    // Create file input
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
        setImagePreview(event.target.result);
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  };

  // Concept: color picker
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setBorderStyle('2px solid black');

    // Set tip text based on selected color
    switch (color) {
      case 'skin':
        setTipText('Tip: Picking a color from your approximately the middle of your forehead will provide the best results');
        break;
      case 'hair':
        setTipText('Tip: Picking a color of your natural hair color and avoiding the bright light will provide the best results');
        break;
      case 'eye':
        setTipText('Tip: Make sure not to choose your pupil color when finding this color');
        break;
      case 'lip':
        setTipText('Tip: Picking a color from your bottom lip will provide the best results');
        break;
      default:
        setTipText('');
        break;
    }
  };

  const handleImageClick = (event) => {
    if (!selectedColor) return;

    const canvas = document.createElement('canvas');
    canvas.width = event.target.width;
    canvas.height = event.target.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

    const pixelData = ctx.getImageData(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 1, 1).data;
    const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    switch (selectedColor) {
      case 'skin':
        setSkinColor(hexColor);
        break;
      case 'hair':
        setHairColor(hexColor);
        break;
      case 'eye':
        setEyeColor(hexColor);
        break;
      case 'lip':
        setLipColor(hexColor);
        break;
      default:
        break;
    }

    setSelectedColor(null);
    setBorderStyle('none');
  };

  // Store OpenAI API call responses in a JSON file
  const handleAnalyze = async () => {
    try {
      setLoading(true); // Set loading to true when analyzing
      const responses = await askQuestion(skinColor, hairColor, eyeColor, lipColor);
      localStorage.setItem('analysisResults', JSON.stringify(responses));
    } catch (error) {
      console.error('Error analyzing colors:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Helper functions
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const getContrastColor = (color) => {
    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);

    let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Black text for light colors, and white for dark colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // JSX rendering
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <button onClick={handleImageUpload} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Upload Image</button>
      {imagePreview && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={imagePreview}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '500px', cursor: selectedColor ? 'crosshair' : 'auto', marginBottom: '20px' }}
            onClick={handleImageClick}
          />

          {/* Instructions */}
          <p style={{ marginBottom: '10px' }}>Click each button and click on the corresponding body part in the photo to pick colors.</p>

          {/* Color selection buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {['skin', 'hair', 'eye', 'lip'].map((part) => (
              <div key={part} style={{ marginRight: '10px' }}>
                <button
                  className="color-button"
                  style={{
                    height: '40px',
                    width: '120px',
                    backgroundColor: eval(`${part}Color`),
                    border: selectedColor === part ? borderStyle : 'none',
                    fontWeight: selectedColor === part ? 'bold' : 'normal',
                    color: getContrastColor(eval(`${part}Color`)),
                    borderRadius: '5px',
                    fontSize: '105%',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleColorSelection(part)}
                >
                  {part.charAt(0).toUpperCase() + part.slice(1)} Color
                </button>
              </div>
            ))}
          </div>

          {/* Tip */}
          {tipText && (
            <p style={{ marginBottom: '10px' }}>{tipText}</p>
          )}

          {/* Display loading GIF if loading is true */}
          {loading && (
            <div style={{ marginBottom: '20px' }}>
              <img src="https://i.redd.it/kgrl0g2yg3y51.gif" style={{ width: '50%', height: '50%' }} alt="Loading..." />
              <p style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>Loading...</p>
            </div>
          )}
          {!loading && (
            <button onClick={handleAnalyze} style={{ fontSize: '105%', backgroundColor: "#000000", color: "#ffffff", height: "40px", width: "200px", border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Analyze</button>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceRead;
