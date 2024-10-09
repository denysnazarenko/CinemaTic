import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByGenre, selectMoviesByGenre } from './moviesByGenreSlice';
import { selectAll as selectAllGenres } from '../main/genresSlice';
import { setMovieId } from '../MovieInfoPanel/MovieDetailsSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import './moviesByGenre.scss';
import arrow from '../../assets/moviesByGenre/arrow.svg';

const MoviesByGenre = ({ genre }) => {
  const dispatch = useDispatch();
  const allGenres = useSelector(selectAllGenres);
  const movies = useSelector(selectMoviesByGenre(genre));

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMoviesByGenre(genre));
  }, [genre])

  const renderMoviesSlides = (movies, genres) => {
    if (movies.length === 0) {
      return (
        <h5 className="">Фільмі поки немає</h5>
      )
    }

    return movies.map(({ title, genre_ids, image, overview, rating, id }) => {
      const movieGenres = genre_ids.map(id => genres.find(genre => genre.id === id)?.name || '');

      const renderMovieGenres = (movieGenres) => {
        return movieGenres.map((genre, index) => {
          return (
            <li key={index} className="slide-genre-movies__genre-item">{genre}</li>
          )
        })
      };

      const genresList = renderMovieGenres(movieGenres);

      return (
        <SwiperSlide
          key={id}
          className="genre-movies__slide slide-genre-movies"
          onClick={() => dispatch(setMovieId(id))}
        >
          <div className="slide-genre-movies__content">
            <div className="slide-genre-movies__image">
              <img src={`https://image.tmdb.org/t/p/original${image}`} alt={title} />
              <div className="slide-genre-movies__hover">
                <div className="slide-genre-movies__overview">
                  <h3>Зміст фільма</h3>
                  <p>{overview}</p>
                </div>
                <div className="slide-genre-movies__genre">
                  <h3>Жанр</h3>
                  <ul>
                    {genresList}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-genre-movies__rating">{rating}</div>
          <h3 className="slide-genre-movies__title">{title}</h3>
        </SwiperSlide>
      )
    });
  }

  const genreByText = (allGenres.find(g => g.id === genre)?.name || '');

  const moviesSlides = renderMoviesSlides(movies, allGenres);

  return (
    <section className="movies__genre genre-movies">
      <div className="genre-movies__container">
        <div className="genre-movies__top">
          <div className="genre-movies__navigation">
            <button ref={prevRef} className="custom-prev">
              <img src={arrow} alt="Arrow prev" />
            </button>
            <button ref={nextRef} className="custom-next">
              <img src={arrow} alt="Arrow next" />
            </button>
          </div>
          <h2 className="genre-movies__title">{genreByText}</h2>
        </div>
        <Swiper
          className="genre-movies__slider"
          modules={[Navigation]}
          loop={true}
          speed={600}
          spaceBetween={32}
          slidesPerView={5}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}>
          {moviesSlides}
        </Swiper>
      </div>
    </section>
  )
}

export default MoviesByGenre;