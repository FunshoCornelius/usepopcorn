import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import Summary from "./components/Summary";
import Loading from "./components/Loading";
import Error from "./components/Error";
import MovieDetails from "./components/MovieDetails";

import { KEY } from "./constants/constant";

/* Logo, Search, NumResult */

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const query = "sbvdhwbskfk";
  const [query, setQuery] = useState("batman");
  const [selectedId, setSelectedID] = useState(null);

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res) {
            throw new Error("Error fetching movies");
          }

          const data = await res.json();
          setMovies(data.Search);
          console.log(data);

          if (data.Response === "False") {
            setError(data.Error);
          }
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },

    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        {/* <NumResult movies={movies} /> */}
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {error ? (
            <Error error={error} />
          ) : (
            <MovieList movies={movies} onSelectID={handleSelectMovie} />
          )}
        </Box>
        {/* <Box>{isLoading ? <Loading /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
