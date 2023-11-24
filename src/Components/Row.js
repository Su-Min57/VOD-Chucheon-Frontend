import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import axios from 'axios';

const Row = ({ genre, loggedInUser }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://your-api-endpoint.com/favorite-genre-movies/${loggedInUser}?genre=${genre}`);
        const randomMovies = getRandomMovies(response.data, 7);
        setMovies(randomMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [genre, loggedInUser]);

  const getRandomMovies = (array, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div>
      <h2>{genre} Movies for User {loggedInUser}</h2>
      <Swiper spaceBetween={20} slidesPerView={3} navigation pagination={{ clickable: true }}>
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div>
              <img src={movie.imageUrl} alt={`Movie ${index + 1}`} />
              <p>{movie.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Row;