import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../Modal/modalSlice';

import Menu from '../menu/Menu';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';

const Header = ({ bg, position }) => {
  const dispatch = useDispatch();

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

  return (
    <header className="header" style={headerStyle}>
      <div className="header__container">
        <Link to="/" className="header__logo">CinemaTic</Link>
        <Menu />
        <div className="header__search">
          <form className="header__search">
            <button type="submit" className="header__button">
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <input
              type="text"
              placeholder="Пошук..."
              name="name"
              id="name"
              autocomplete="off"
              className="header__input" />
          </form>
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