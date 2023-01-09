import { useEffect, useState } from "react";

import "./App.css";
import SearchIcon from "./search.svg";
import Movie from "./Movie";

const API_URL = "http://www.omdbapi.com?apikey=748b369c";

const App = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("superman");
  }, []);

  return (
    <div className='app'>
      <h1>Netflix</h1>

      <div className='search'>
        <input
          id='Movie Title'
          placeholder='Search for Movies'
          value={movieTitle}
          onChange={(e) => {
            setMovieTitle(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => {
            searchMovies(movieTitle);
          }}
        />
      </div>


      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => {
            return <Movie movie={movie} />;
          })}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
