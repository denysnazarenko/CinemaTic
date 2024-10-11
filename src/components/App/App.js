import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "../scrollToTop/ScrollToTop";
import MainPage from '../pages/MainPage';
import MoviePage from '../pages/MoviePage';
import Footer from '../footer/Footer';

import '../../style/index.scss';

const App = () => {
  return (
    <Router>
      <main className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App;