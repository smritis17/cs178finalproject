import "./App.css";
import FaceRead from "./components/face_read";
import Analysis from "./components/color_analysis";

function App() {
  return (
    <div className="App">
      <div className='app-title'>
        <h1 className="m-4 text-center">Discover Your Personal Color Palette</h1>
        <p style={{margin: '40px'}}> Discover your perfect palette based on your skin tone, hair color, eye color, and lip tone. Find the season that 
          enhances your natural features. Explore the top 5 complementary colors to elevate your style, while steering clear of the bottom 5 least flattering shades. </p>
      </div>
      <div className="flex-container">
        <div className="column section">
          <div className="routes-title text-left"><h3>Update Photo and Choose Colors</h3></div>
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
