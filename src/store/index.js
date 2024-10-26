import { configureStore } from "@reduxjs/toolkit";
import newReleases from '../components/main/newReleasesSlice';
import genres from '../components/main/genresSlice';
import moviesByGenre from '../components/moviesByGenre/moviesByGenreSlice';
import movieDetails from '../components/MovieInfoPanel/MovieDetailsSlice';
import actors from '../components/actorsList/actorsSlice';
import modal from '../components/Modal/modalSlice';
import ticketDateTime from '../components/ticketDateTimePicker/TicketDateTimeSlice';
import movieAutocomplete from '../components/header/movieAutocompleteSlice';

const _apiBase = 'https://api.themoviedb.org/3/';
const _apiKey = '7121a545fb5b87984a51947d0de512b7';

const store = configureStore({
  reducer: { newReleases, genres, moviesByGenre, movieDetails, actors, modal, ticketDateTime, movieAutocomplete },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: { _apiBase, _apiKey }
    }
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;