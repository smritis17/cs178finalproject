import React from "react";

// const ColorAnalysis = () => {
//   return (
//     <div style={{ backgroundColor: "green", height: "200px" }}>
//       {/* This will display a green block */}
//     </div>
//   );
// };

const ColorAnalysis = ({ skinColor, hairColor, eyeColor }) => {
  return (
    <div>
      <h2>Color Analysis Results</h2>
      <div>
        <h3>Skin Color:</h3>
        <p>{skinColor}</p>
      </div>
      <div>
        <h3>Hair Color:</h3>
        <p>{hairColor}</p>
      </div>
      <div>
        <h3>Eye Color:</h3>
        <p>{eyeColor}</p>
      </div>
    </div>
  );
};

export default ColorAnalysis;

