import { configureStore } from "@reduxjs/toolkit";
import newReleases from '../components/main/newReleasesSlice';
import genres from '../components/main/genresSlice';

const _apiBase = 'https://api.themoviedb.org/3/';
const _apiKey = '7121a545fb5b87984a51947d0de512b7';

const store = configureStore({
  reducer: { newReleases, genres },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: { _apiBase, _apiKey }
    }
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;