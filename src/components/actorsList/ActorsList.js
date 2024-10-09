import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActors, selectAll } from "./actorsSlice";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import './actorsList.scss';
import arrow from '../../assets/moviesByGenre/arrow.svg';

const ActorsList = () => {
  const { movieId } = useSelector(state => state.movieDetails);
  const actors = useSelector(selectAll);
  const dispatch = useDispatch();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(fetchActors(movieId));
  }, [movieId])

  const renderActorsSlides = (actors) => {
    if (actors.length === 0) {
      return (
        <h5 className="">Фільмі поки немає</h5>
      )
    }

    return actors.map(({ id, name, character, image }) => {
      return (
        <SwiperSlide
          id={id}
          className="actors__slide slide-actors">

        </SwiperSlide>
      )
    })
  }

  return (
    <section className="actors">
      <div className="actors__container">
        <div className="actors__top">
          <div className="actors__navigation">
            <button ref={prevRef} className="custom-prev">
              <img src={arrow} alt="Arrow prev" />
            </button>
            <button ref={nextRef} className="custom-next">
              <img src={arrow} alt="Arrow next" />
            </button>
          </div>
          <h2 className="actors__title">Актори</h2>
        </div>
        <Swiper
          className="actors__slider"
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

        </Swiper>
      </div>
    </section>
  )
}

export default ActorsList;