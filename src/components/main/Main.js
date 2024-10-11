import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewReleases, selectAll as selectAllNewReleases } from './newReleasesSlice';
import { fetchGenres, selectAll as selectAllGenres } from './genresSlice';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Header from '../header/Header';

import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './main.scss';

const Main = () => {
  const movies = useSelector(selectAllNewReleases);
  const genres = useSelector(selectAllGenres);
  const { newReleasesLoadingStatus } = useSelector(state => state.newReleases);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNewReleases());
    dispatch(fetchGenres());
    // eslint-disable-next-line
  }, []);

  const handleSlideClick = (id) => {
    navigate(`/movie/${id}`);
  };


  const renderMoviesSlides = (movies, genres) => {
    if (movies.length === 0) {
      return (
        <h5 className="">Фільмів поки немає</h5>
      )
    }

    return movies.map(({ title, genre_ids, image, overview, rating, release_date, id }) => {
      const movieGenres = genre_ids.map(id => genres.find(genre => genre.id === id)?.name || '');

      const renderMovieGenres = (movieGenres) => {
        return movieGenres.map((genre, index) => {
          return (
            <li key={index} className="slide-main__genre-item">{genre}</li>
          )
        })
      };

      const genresList = renderMovieGenres(movieGenres);

      return (
        <SwiperSlide
          key={id}
          onClick={() => handleSlideClick(id)}
          className='main__slide slide-main'
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${image})` }}>
          <div className="slide-main__content">
            <h2 className="slide-main__title">{title}</h2>
            <div className="slide-main__overview">
              <h3>Зміст фільма</h3>
              <p>{overview}</p>
            </div>
            <h3 className="slide-main__genre-title">Жанр</h3>
            <ul className="slide-main__genre-list">
              {genresList}
            </ul>
            <div className="slide-main__rating"><span>{rating}</span>/10</div>
            <div className="slide-main__release">Рік {release_date}</div>
            <a href="" className="slide-main__button">Замовити білет</a>
          </div>
        </SwiperSlide>
      )
    });
  }

  const moviesSlides = renderMoviesSlides(movies, genres);

  return (
    <section className="main">
      <Header bg='rgba(0, 0, 0, 0.5)' position='absolute' />
      <div className="main__container main__container-big">
        {newReleasesLoadingStatus === 'loading' ? (
          <div className="actors__slider-loading">
            <Spinner />
          </div>
        ) : newReleasesLoadingStatus === 'error' ? (
          <div className="actors__slider-error">
            <ErrorMessage />
          </div>
        ) : (
          <Swiper className='main__slider'
            modules={[Navigation, Autoplay]}
            loop={true}
            speed={600}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
          >
            {moviesSlides}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Main;