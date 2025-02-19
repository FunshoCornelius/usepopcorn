export default function MovieList({ movies, onSelectID }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectID={onSelectID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectID }) {
  return (
    <li onClick={() => onSelectID(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
