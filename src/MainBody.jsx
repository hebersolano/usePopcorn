import { useEffect, useState } from "react";
import ToggleBox from "./ToggleBox";
import ResultMoviesList from "./ResultMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";
import { Error, Loader } from "./HelperComponents";

export default function MainBody({ movies, watched, isLoading, error, onAddWatched, onDeleteWatched }) {
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
            <WatchedMoviesList watched={watched} onDeleteWatched={onDeleteWatched} />
          </>
        ) : (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={onAddWatched}
            watched={watched}
          />
        )}
      </ToggleBox>
    </main>
  );
}
