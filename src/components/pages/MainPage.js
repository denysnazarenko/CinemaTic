import Main from "../main/Main";
import MoviesByGenre from "../moviesByGenre/MoviesByGenre";
import Footer from "../footer/Footer";

const MainPage = () => {
  return (
    <>
      <Main />
      <MoviesByGenre genre={28} />
      <MoviesByGenre genre={12} />
      <MoviesByGenre genre={14} />
      <Footer />
    </>
  )
}

export default MainPage;