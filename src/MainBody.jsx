import ToggleBox from "./ToggleBox";
import ResultMoviesList from "./ResultMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";

export default function MainBody({ movies, watched }) {
  return (
    <main className="main">
      <ToggleBox>
        <ResultMoviesList movies={movies} />
      </ToggleBox>
      <ToggleBox>
        <WatchedMoviesSummary watched={watched} />
        <WatchedMoviesList watched={watched} />
      </ToggleBox>
    </main>
  );
}
