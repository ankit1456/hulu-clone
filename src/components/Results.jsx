/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/results.css";
import VideoCard from "./VideoCard";
import axios from "../axios";
import FlipMove from "react-flip-move";

const Results = ({ selectedCategory }) => {
  const [movies, setMovies] = useState([]);

  const [alternatemovie, setalternateMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(selectedCategory);
      setMovies(response.data.results);
      setalternateMovie(response.data.results[0] || response.data.results[1]);

      return response;
    }
    fetchMovies();
  }, [selectedCategory]);

  return (
    <div className="results">
      <FlipMove>
        {movies?.map((movie) => (
          <VideoCard
            key={movie.id}
            movie={movie}
            alternatemovie={alternatemovie}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Results;
