import Main from "../main/Main";
import MoviesByGenre from "../moviesByGenre/MoviesByGenre";

const MainPage = () => {
  return (
    <>
      <Main />
      <MoviesByGenre genre={28} />
      <MoviesByGenre genre={12} />
      <MoviesByGenre genre={14} />
    </>
  )
}

export default MainPage;