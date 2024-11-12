import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ScrollToTop from "../scrollToTop/ScrollToTop";
import MainPage from '../pages/MainPage';
import MoviePage from '../pages/MoviePage';
import AboutUsPage from "../pages/AboutUsPage";
import Footer from '../footer/Footer';
import Modal from "../Modal/Modal";
import RegisterForm from "../registerForm/RegisterForm";
import LoginForm from "../loginForm/LoginForm";
import TicketPurchase from "../ticketPurchase/TicketPurchase";

import '../../style/index.scss';

const App = () => {
  const { modalType } = useSelector(state => state.modal);

  return (
    <Router>
      <div className="app">
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer />
        <Modal>
          {modalType === 'register' && <RegisterForm />}
          {modalType === 'login' && <LoginForm />}
          {modalType === 'ticketPurchase' && <TicketPurchase />}
        </Modal>
      </div>
    </Router>
  )
}

export default App;