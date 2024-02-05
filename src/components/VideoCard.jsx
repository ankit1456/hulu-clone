/* eslint-disable react/prop-types */
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "../styles/videoCard.css";

const base_url = "https://image.tmdb.org/t/p/original/";

const VideoCard = forwardRef(function VideoCard(
  { movie, alternatemovie },
  ref
) {
  return (
    <Link to={`/movie/${movie.id}`} ref={ref} className="videoCard">
      <img
        src={`${base_url}${
          movie.backdrop_path ||
          movie.poster_path ||
          alternatemovie.backdrop_path
        }`}
        alt="movie poster"
      />
      <p className="VideoCard__overview">{movie.overview}</p>
      <h2>{movie.title || movie.original_title}</h2>
      <p className="VideoCard__stats">
        {movie.media_type && `${movie.media_type}`}
        {movie.media_type && (
          <FiberManualRecordSharpIcon
            style={{ fontSize: 10, marginBottom: -1.5 }}
            color="#fff"
          />
        )}
        {movie.release_date || `${movie.first_air_date} `}
        <FiberManualRecordSharpIcon
          style={{ fontSize: 10, marginBottom: -1.5 }}
          color="#fff"
        />
        {"  "}{" "}
        <ThumbUpSharpIcon style={{ marginBottom: -1.5, marginLeft: -1 }} />
        {"  "} {movie.vote_count}
      </p>
    </Link>
  );
});

export default VideoCard;
