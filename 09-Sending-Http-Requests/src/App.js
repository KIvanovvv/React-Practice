import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://swapi.dev/api/films`);
      if (!response.ok) {
        throw new Error(`Something went wrong! Error: ${response.status}`);
      }
      const data = await response.json();

      const transformedMovies = data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          releaseDate: data.release_data,
          openingText: data.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  let content = <p>Found no movies</p>;

  if (isLoading) {
    content = <p>Loading ...</p>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
