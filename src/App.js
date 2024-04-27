import React, { useState } from 'react';
import "./App.css";
import headshotExample from "./components/headshot_instructions.png"
import FaceRead from "./components/face_read";
import Analysis from "./components/color_analysis";

function App() {
  const [imagePreview, setImagePreview] = useState(headshotExample);

  return (
    <div className="App">
      <div className='app-title'>
        <h1 className="m-4 text-center">Discover Your Personal Color Palette</h1>
        <p style={{margin: '100px', fontSize: "110%"}}> Discover your perfect palette based on your skin tone, hair color, eye color, and lip tone. Find the season that 
          enhances your natural features. Explore the top 5 complementary colors to elevate your style, while steering clear of the bottom 5 least flattering shades. </p>
      </div>

      <div className="flex-container">
        <div className="column section">
          {/* example headshot labelled with where to color pick */}
          <div className="routes-title text-left"><h3>Example Labelled Headshot: Read Labels for Instructions on Color Picking</h3></div>
          <div className="scrollable" id="imageSection">
            <img src={imagePreview} alt="Face Image" style={{ maxWidth: '80%', height: 'auto' }} />
          </div>

          {/* allow user to upload their own photos and color pick */}
          <div className="routes-title text-left"><h3>Upload Photo and Choose Colors</h3></div>
          <div className="scrollable">
            <FaceRead />
          </div>
        </div>
        <div className="column section">
          {/* <div className="routes-title text-left">Here's Your Color Analysis</div> */}
          <Analysis />
        </div>
      </div>
    </div>
  );
}

export default App;
