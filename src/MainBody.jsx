import { useState } from "react";
import ToggleBox from "./ToggleBox";
import ResultMoviesList from "./ResultMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";

export default function MainBody({ movies, watched, isLoading, error }) {
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((currId) => (currId == id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <main className="main">
      <ToggleBox>
        {isLoading && <Loader />}
        {!isLoading && !error && <ResultMoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
        {error && <Error message={error} />}
      </ToggleBox>
      <ToggleBox>
        {!selectedId ? (
          <>
            <WatchedMoviesSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        ) : (
          <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
        )}
      </ToggleBox>
    </main>
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}

function Error({ message }) {
  return <p className="error">{message}</p>;
}
