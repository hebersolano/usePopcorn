import { useEffect, useRef } from "react";
import { useKey } from "./useCustomHooks";

export default function NavBar({ movies, query, setQuery }) {
  const inputRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement == inputRef.current) return;
    setQuery("");
    inputRef.current.focus();
  });

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}
