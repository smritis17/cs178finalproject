import "./App.css";
import FaceRead from "./components/face_read";
import Analysis from "./components/color_analysis";

function App() {
  return (
    <div className="App">
      <div className='app-title'>
        <h1 className="m-4 text-center">Color Analysis</h1>
      </div>
      <div className="flex-container">
        <div className="column section">
          <div className="routes-title text-left">Update Photo and Choose Colors</div>
          <div className="scrollable">
            <FaceRead />
          </div>
        </div>
        <div className="column section">
          <div className="routes-title text-left">Here's Your Color Analysis</div>
          <Analysis />
        </div>
      </div>
    </div>
  );
}

export default App;
