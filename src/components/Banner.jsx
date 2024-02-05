/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "../axios";
import "../styles/banner.css";
import { Link, useParams } from "react-router-dom";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import SearchIcon from "@mui/icons-material/Search";
import Results from "./Results";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../context/stateProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { API_KEY } from "../request";

const baseURL = "https://image.tmdb.org/t/p/original/";
const opts = {
  height: "550",
  width: "100%",
  playVars: {
    autoPlay: true,
  },
};

const Banner = ({ selectedCategory }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [{ user }] = useStateValue();
  const [movie, setMovie] = useState([]);

  const params = useParams();

  const playTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParams:", urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    async function fetchMovieDetail() {
      const { data } = await axios(`movie/${params.id}?api_key=${API_KEY}`);
      setMovie(data);
    }
    fetchMovieDetail();
  }, [params.id]);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          objectFit: "contain",
          backgroundPosition: "top",
          backgroundImage: `linear-gradient(to right bottom,transparent,
          rgba(37, 37, 37, 0.6),
          #111),url(${baseURL}${movie?.backdrop_path})`,
        }}
      >
        {!trailerUrl && (
          <div className="banner__header ">
            <div className="banner__headerleft flex-spaceBetween">
              <SearchIcon className="banner__HeaderLink" />
              <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                <p className="banner__HeaderLink">Home</p>
              </Link>
              <p className="banner__HeaderLink">My Stuff</p>
              <p className="banner__HeaderLink">TV Shows</p>
              <p className="banner__HeaderLink">Movies</p>
            </div>
            <div className=" flex-spaceBetween">
              <Avatar src={user?.photoURL} />
              <Link to="/">
                <img
                  className="banner__logo"
                  src="https://press.hulu.com/wp-content/uploads/2020/02/hulu-white.png"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
        )}
        {!trailerUrl ? (
          <div className="banner__contents">
            <h4>START WATCHING</h4>
            <h1 className="banner__title">
              {" "}
              {movie?.title || movie?.name || movie?.original_name}{" "}
            </h1>
            <p className="banner__description">{movie?.overview}</p>
            <p className="movie__stats">
              TVMA {<FiberManualRecordSharpIcon style={{ fontSize: 8 }} />}{" "}
              Drama {<FiberManualRecordSharpIcon style={{ fontSize: 8 }} />}{" "}
              2020
            </p>
            <div className="banner__buttons">
              <button
                onClick={() => playTrailer(movie)}
                className="banner__btn banner__btnWhite"
              >
                {" "}
                <PlayArrowIcon
                  style={{ marginBottom: -5.5, marginRight: 3, fontSize: 25 }}
                />
                Play Trailer
              </button>
              <button className="banner__btn ">My List</button>
            </div>
          </div>
        ) : (
          <>
            <div className="video__trailer">
              {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            </div>
            <button onClick={() => setTrailerUrl("")} className="btn-trailer">
              Close Trailer
            </button>
          </>
        )}
      </div>
      <div className="banner__lower">
        <Results selectedCategory={selectedCategory} />
      </div>
    </>
  );
};

export default Banner;
