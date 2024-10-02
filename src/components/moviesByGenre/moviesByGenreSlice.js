import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  moviesByGenre: {},
  moviesByGenreLoadingStatus: 'idle',
};


export const fetchMoviesByGenre = createAsyncThunk(
  'moviesByGenre/fetchMoviesByGenre',
  async (genreId, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}discover/movie?api_key=${_apiKey}&with_genres=${genreId}&language=uk-UA`)

    const data = response.results.map(result => {
      return {
        title: result.title,
        genre_ids: result.genre_ids,
        image: result.poster_path,
        overview: result.overview
          ? `${result.overview.slice(0, 210)}...`
          : 'Зміст фільма відсутній',
        rating: Number(result.vote_average.toFixed(1)),
        id: result.id
      }
    });

    return { genreId, data };
  }
);

const moviesByGenreSlice = createSlice({
  name: 'moviesByGenre',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, state => { state.moviesByGenreLoadingStatus = 'loading' })
      .addCase(fetchMoviesByGenre.rejected, state => { state.moviesByGenreLoadingStatus = 'error' })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.moviesByGenreLoadingStatus = 'idle';
        const { genreId, data } = action.payload;

        state.moviesByGenre[genreId] = data;
      })
  }
});

const { reducer } = moviesByGenreSlice;

export const selectMoviesByGenre = (genreId) => createSelector(
  state => state.moviesByGenre.moviesByGenre[genreId],
  (movies) => movies || []
);

export default reducer;