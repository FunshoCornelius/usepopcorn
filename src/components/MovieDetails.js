import React, { act, useEffect, useState } from "react";
import { KEY } from "../constants/constant";

function MovieDetails({ selectedId, onCloseMovie }) {
  const [MovieDetails, setMovieDetails] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = MovieDetails;
  useEffect(
    function () {
      async function fetchMovieDetails() {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      }

      fetchMovieDetails();
    },
    [selectedId]
  );
  return (
    <>
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}.`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} imdbRating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <button className="btn-add">+ Add to Watched List</button>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </>
  );
}

export default MovieDetails;
