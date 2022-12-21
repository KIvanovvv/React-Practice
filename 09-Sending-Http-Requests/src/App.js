import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  async function getMoviesHandler() {
    const response = await fetch(`https://swapi.dev/api/films`);
    const data = await response.json();
    console.log(data);
    const transformedMovies = data.results.map((data) => {
      return {
        id: data.episode_id,
        title: data.title,
        releaseDate: data.release_data,
        openingText: data.opening_crawl,
      };
    });
    setMovies(transformedMovies);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
