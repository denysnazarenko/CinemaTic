import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { openModal } from '../Modal/modalSlice';
import { fetchMovieAutocomplete, clearAutocompleteData } from './movieAutocompleteSlice';

import Menu from '../menu/Menu';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';

const Header = ({ bg, position }) => {
  const [movieName, setMovieName] = useState('');
  const [movieId, setMovieId] = useState('');
  const { movieAutocomplete, movieAutocompleteLoadingStatus } = useSelector(state => state.movieAutocomplete);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openRegisterModal = () => {
    dispatch(openModal('register'));
  };

  const openLoginModal = () => {
    dispatch(openModal('login'));
  };

  const headerStyle = {
    backgroundColor: `${bg}`,
    position: position
  }

  const inputChanged = (e) => {
    const movieName = e.target.value;
    if (/^[^@#$%&*]+$/.test(movieName)) {
      setMovieName(movieName);
      dispatch(fetchMovieAutocomplete(movieName));
    } else if (movieName === '') {
      setMovieName(movieName);
      dispatch(clearAutocompleteData());
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (movieName !== '' && movieId !== '') {
      navigate(`/movie/${movieId}`);

      setMovieName('');
      setMovieId('');
    }
  }

  const autocomplete = () => {
    if (movieAutocompleteLoadingStatus === "loading") {
      return <Spinner />
    } else if (movieAutocompleteLoadingStatus === "error") {
      return <ErrorMessage />
    } else if (movieAutocomplete.length !== 0) {
      return (
        movieAutocomplete.map(({ id, title }) => (
          <li key={id} className="autocomplete-item" onClick={() => { setMovieName(title); setMovieId(id); dispatch(clearAutocompleteData()); }}>
            {title}
          </li>
        ))
      )
    } else {
      return null;
    }
  }

  return (
    <header className="header" style={headerStyle}>
      <div className="header__container">
        <Link to="/" className="header__logo">CinemaTic</Link>
        <Menu />
        <div className="header__search">
          <form className="header__search" onSubmit={onSubmitHandler}>
            <button type="submit" className="header__button">
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <input
              type="text"
              placeholder="Пошук..."
              name="name"
              id="name"
              autocomplete="off"
              value={movieName}
              onChange={inputChanged}
              className="header__input" />
          </form>
          <ul className={`autocomplete-list ${movieAutocomplete.length === 0 ? 'autocomplete-list--none' : ''}`}>
            {autocomplete()}
          </ul>
        </div>
        <div className="header__auth">
          <button onClick={openRegisterModal} className="header__signup">Зареєструватися</button>
          <button onClick={openLoginModal} className="header__login">Увійти</button>
        </div>
      </div>
    </header >
  )
}

export default Header;