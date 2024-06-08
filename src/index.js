import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
// import "./index.css";
// import App from "./App";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating onSetRating={setMovieRating} color="blue" maxRating={10} />
      <p>This movie was rated {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating color="red" size={24} />
    <StarRating messages={["Poor", "Fair", "Average", "Good", "Excellent"]} />
    <Test />
    {/* <App /> */}
  </React.StrictMode>
);
