import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_OMD_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function getSearchResults() {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchData() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal });
          if (!res.ok) throw new Error("No connection");

          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);

          console.log(data.Search);
          setMovies(data.Search);
          setError("");
        } catch (error) {
          console.error(error);
          if (error.name !== "AbortError") setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      fetchData();

      return function effectCleaner() {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}

export function useMovieDetails(selectedId) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return { movie, isLoading, error };
}

export function useLocalStorageState(initState, key) {
  const [value, setValue] = useState(function () {
    return JSON.parse(localStorage.getItem(key)) || initState;
  });

  useEffect(
    function watchedStorage() {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export function useKey(keyCode, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) action();
      }
      document.addEventListener("keydown", callback);

      return function effectCleaner() {
        document.removeEventListener("keydown", callback);
      };
    },
    [keyCode, action]
  );
}
