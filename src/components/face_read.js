import React, { useState } from 'react';

const FaceRead = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [skinColor, setSkinColor] = useState('#000000');
  const [hairColor, setHairColor] = useState('#000000');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [lipColor, setLipColor] = useState('#000000');
  const [borderStyle, setBorderStyle] = useState('2px solid black');

  const handleImageUpload = () => {
    // once user uploads new image, reset all buttons to black again
    setSkinColor('#000000');
    setHairColor('#000000');
    setEyeColor('#000000');
    setLipColor('#000000');

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

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setBorderStyle('2px solid black');
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
      default:
        break;
    }

    setSelectedColor(null);
    setBorderStyle('none');
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const getContrastColor = (color) => {
    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);

    let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // black text for light colors, and white for dark colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const handleAnalyze = () => {
    /* TOOD */
  };

  return (
    <div>
      <button onClick={handleImageUpload}>Upload Image</button>
      {imagePreview && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={imagePreview}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '300px', cursor: selectedColor ? 'crosshair' : 'auto' }}
            onClick={handleImageClick}
          />

          {/* instructions on how to choose skin, hair, eye, and lip colors */}
          <div style={{ marginTop: '10px' }}>
            <p> Click each button and click on the corresponding body part in the photo to color pick. </p>
          </div>

          {/* buttons to choose skin, hair, eye, and lip colors */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <button
                className="color-button"
                style={{
                  height: '30px',
                  width: '150px',
                  backgroundColor: skinColor,
                  border: selectedColor === 'skin' ? borderStyle : 'none',
                  fontWeight: selectedColor === 'skin' ? 'bold' : 'normal',
                  color: getContrastColor(skinColor)
                }}
                onClick={() => handleColorSelection('skin')}
              >
                Skin Color
              </button>
              <span style={{ marginLeft: '10px' }}>{skinColor}</span>
            </div>
            <div>
              <button
                className="color-button"
                style={{
                  height: '30px',
                  width: '150px',
                  backgroundColor: hairColor,
                  border: selectedColor === 'hair' ? borderStyle : 'none',
                  fontWeight: selectedColor === 'hair' ? 'bold' : 'normal',
                  color: getContrastColor(hairColor)
                }}
                onClick={() => handleColorSelection('hair')}
              >
                Hair Color
              </button>
              <span style={{ marginLeft: '10px' }}>{hairColor}</span>
            </div>
            <div>
              <button
                className="color-button"
                style={{
                  height: '30px',
                  width: '150px',
                  backgroundColor: eyeColor,
                  border: selectedColor === 'eye' ? borderStyle : 'none',
                  fontWeight: selectedColor === 'eye' ? 'bold' : 'normal',
                  color: getContrastColor(eyeColor)
                }}
                onClick={() => handleColorSelection('eye')}
              >
                Eye Color
              </button>
              <span style={{ marginLeft: '10px' }}>{eyeColor}</span>
            </div>
            <div>
              <button
                className="color-button"
                style={{
                  height: '30px',
                  width: '150px',
                  backgroundColor: lipColor,
                  border: selectedColor === 'lip' ? borderStyle : 'none',
                  fontWeight: selectedColor === 'lip' ? 'bold' : 'normal',
                  color: getContrastColor(lipColor)
                }}
                onClick={() => handleColorSelection('lip')}
              >
                Lip Color
              </button>
              <span style={{ marginLeft: '10px' }}>{lipColor}</span>
            </div>
          </div>

          <button onClick={handleAnalyze} style={{ marginTop: '30px', backgroundColor: "#000000", color: "#ffffff", height: "50px", width: "250px"}}>Analyze</button>
        </div>
      )}
    </div>
  );
};

export default FaceRead;
