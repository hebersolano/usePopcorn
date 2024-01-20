import { useEffect, useState } from "react";
import StarRating from "./StarRating.jsx";
import { Error, Loader } from "./HelperComponents";

const KEY = import.meta.env.VITE_OMD_KEY;

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isWatched = watched.find((movie) => movie.imdbID == selectedId);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
          if (!res.ok) throw new Error("No connection");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);

          console.log(data);
          setMovie(data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();


    },
    [selectedId]
  );

  useEffect(
    function () {
      document.title = movie ? movie.Title : "usePopcorn";
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie]
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <Details movie={movie} onCloseMovie={onCloseMovie} onAddWatched={onAddWatched} isWatched={isWatched} />
      )}
      {error && <Error message={error} />}
    </>
  );
}

function Details({ movie, onCloseMovie, onAddWatched, isWatched }) {
  const [rating, setRating] = useState(0);
  console.log("Is watched:", isWatched);

  function handleAdd() {
    const watchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: Number(movie.Runtime.split(" ")[0]),
      imdbRating: Number(movie.imdbRating),
      userRating: rating,
    };

    onAddWatched(watchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐</span>
            {movie.imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            onSetRating={setRating}
            defaultRating={isWatched ? isWatched.userRating : 0}
            disable={Boolean(isWatched)}
          />
          {rating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to the list
            </button>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>
          Staring <strong> {movie.Actors}</strong>
        </p>
        <p>
          Directed by <strong>{movie.Director}</strong>
        </p>
      </section>
    </div>
  );
}
