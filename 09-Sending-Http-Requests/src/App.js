import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getMoviesHandler() {
    setIsLoading(true);
    const response = await fetch(`https://swapi.dev/api/films`);
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
    setIsLoading(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No found movies</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
