import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovieDetails } from './MovieDetailsSlice';

import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './movieInfoPanel.scss';

import ratingIcon from '../../assets/main/rating.svg';

const MovieInfoPanel = () => {
  const { movieId, movieData, movieDetailsLoadingStatus } = useSelector(state => state.movieDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [movieId])

  if (movieDetailsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (movieDetailsLoadingStatus === "error") {
    return <ErrorMessage />;
  }

  const { id, title, backgroundImage, poster, rating, release, country, genre, runtime, director, overview } = movieData;

  function convertMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  return (
    <section class="movie__info info-movie"
      key={id}>
      <div class="info-movie__container"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundImage})` }}>
        <div className="info-movie__content">
          <div class="info-movie__image">
            <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="Poster" />
          </div>
          <div class="info-movie__info">
            <h2 class="info-movie__title">{title}</h2>
            <div class="info-movie__rating"><img src={ratingIcon} alt="Rating icon" /><span>{rating}</span>/10</div>
            <div className="info-movie__columns">
              <div className="info-movie__column">
                <div className="info-movie__element">Рік:</div>
                <div className="info-movie__element">Країна:</div>
                <div className="info-movie__element">Жанр:</div>
                <div className="info-movie__element">Тривалість:</div>
                <div className="info-movie__element">Режисер:</div>
                <div className="info-movie__element">Опис:</div>
              </div>
              <div className="info-movie__column">
                <div className="info-movie__element">{release}</div>
                <div className="info-movie__element">{country}</div>
                <div className="info-movie__element">{genre}</div>
                <div className="info-movie__element">{convertMinutes(runtime)}</div>
                <div className="info-movie__element">{director}</div>
                <div className="info-movie__element">{overview}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default MovieInfoPanel;