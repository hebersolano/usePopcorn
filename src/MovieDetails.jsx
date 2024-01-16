import { useEffect } from "react";

const KEY = import.meta.env.VITE_OMD_KEY;

export default function MovieDetails({ selectedId, onCloseMovie }) {
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
          if (!res.ok) throw new Error("No connection");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);

          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}
