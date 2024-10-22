import { useParams } from 'react-router-dom';

import Header from "../header/Header";
import MovieInfoPanel from "../MovieInfoPanel/MovieInfoPanel";
import TicketDateTimePicker from '../ticketDateTimePicker/TicketDateTimePicker';
import ActorsList from "../actorsList/ActorsList";

const MoviePage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <MovieInfoPanel movieId={id} />
      <TicketDateTimePicker />
      <ActorsList movieId={id} />
    </>
  )
}

export default MoviePage;