import { useState, useEffect } from 'react';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="header">
      <div className="header__container">
        <a href="" className="header__logo">CinemaTic</a>
        <div className="header__menu menu">
          <div className={`menu__icon ${isOpen ? "_active" : ""}`} onClick={toggleMenu}><span></span></div>
          <nav className={`menu__body ${isOpen ? "_active" : ""}`}>
            <ul className="menu__list">
              <li className="menu__item">
                <a href="">Головна сторінка</a>
              </li>
              <li className="menu__item">
                <a href="">Акції та знижки</a>
              </li>
              <li className="menu__item">
                <a href="">Про нас</a>
              </li>
              <li className="menu__item">
                <a href="">Контакти</a>
              </li>
            </ul>
          </nav>
        </div>
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
          <a href="" className="header__signup">Зареєструватися</a>
          <a href="" className="header__login">Увійти</a>
        </div>
      </div>
    </header >
  )
}

export default Header;