import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import StarRating from "./StarRating.jsx";

function Test() {
  const [ratingMovie, setRatingMovie] = useState(0);
  return (
    <>
      <StarRating maxRating={10} color="blue" onSetRating={setRatingMovie} />
      <p>This is the rating {ratingMovie}</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StarRating maxRating={5} defaultRating={3} />
    <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <Test />
  </React.StrictMode>
);
