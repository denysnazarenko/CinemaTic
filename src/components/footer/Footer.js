import { Link } from 'react-router-dom';

import './footer.scss';

import facebook from '../../assets/footer/icons/facebook.svg';
import instagram from '../../assets/footer/icons/instagram.svg';
import telegram from '../../assets/footer/icons/telegram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__menu menu-footer">
            <ul className="menu-footer__list">
              <li className="menu-footer__item">
                <a href="">Акції та знижки</a>
              </li>
              <li className="menu-footer__item">
                <Link to="/about-us">Про нас</Link>
              </li>
              <li className="menu-footer__item">
                <a href="">Контакти</a>
              </li>
              <li className="menu-footer__item">
                <a href="">Політика конфіденційності</a>
              </li>
            </ul>
          </div>
          <div className="footer__social">
            <a href="#" className="footer__social-item">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="footer__social-item">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" className="footer__social-item">
              <img src={telegram} alt="Telegram" />
            </a>
          </div>
        </div>
        <div className="footer__info">
          <div className="footer__description">
            <span>CinemaTic</span> — це сучасний вебдодаток для покупки квитків у кінотеатри, який розпочав свою діяльність у 2024 році. Ми прагнемо зробити вашу купівлю квитків максимально зручною та приємною. На нашій платформі ви можете легко знайти та купити квитки на всі популярні фільми та мультфільми, що транслюються в кінотеатрах вашого міста.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;