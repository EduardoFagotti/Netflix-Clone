import React, { useEffect } from "react";
import categories, { getMovies } from "../api";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = React.useState({});

  const fetchRandomMovie = async () => {
    try {
      const netflixOrigiralsCategory = categories.find(
        (category) => category.name === "netflixOrigirals"
      );
      const data = await getMovies(netflixOrigiralsCategory.path);
      const movies = data?.results;
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setMovie(movies[randomIndex]);
    } catch (error) {
      console.log("Banner fetchRandomMovie error: ", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.subtr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="Banner-container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center",
      }}
    >
      <div className="banner-content">
        <div className="banner-title">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div>
        <div className="banner-button-container">
          <button className="banner-button">Asssitir</button>
          <button className="banner-button">Minha lista</button>
        </div>
        <div className="banner-description">
          <h1>{truncate(movie?.overview)}</h1>
        </div>
      </div>
    </header>
  );
}

export default Banner;
