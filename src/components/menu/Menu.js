import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './menu.scss';

const Menu = () => {
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
    <div className="menu">
      <div className={`menu__icon ${isOpen ? "_active" : ""}`} onClick={toggleMenu}><span></span></div>
      <nav className={`menu__body ${isOpen ? "_active" : ""}`}>
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/">Головна сторінка</Link>
          </li>
          <li className="menu__item">
            <a href="">Акції та знижки</a>
          </li>
          <li className="menu__item">
            <Link to="/about-us">Про нас</Link>
          </li>
          <li className="menu__item">
            <a href="">Контакти</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu;