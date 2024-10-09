import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  movieId: 533535,
  movieData: {
    country: [],
    genreNames: []
  },
  movieDetailsLoadingStatus: 'idle'
};

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}movie/${movieId}?api_key=${_apiKey}&language=uk-UA&append_to_response=credits`);

    const director = response.credits.crew.find(person => person.job === 'Director');
    const data = {
      id: response.id,
      title: response.title,
      backgroundImage: response.backdrop_path,
      poster: response.poster_path,
      rating: Number(response.vote_average.toFixed(1)),
      release: response.release_date.slice(0, 4),
      country: response.origin_country.join(', '),
      genre: response.genres.slice(0, 3).map(genre => genre.name).join(', '),
      runtime: response.runtime,
      director: director ? director.name : 'Не вказано',
      overview: response.overview ? response.overview : 'Зміст фільма відсутній'
    }

    return data;
  }
);

const MovieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, state => { state.movieDetailsLoadingStatus = 'loading' })
      .addCase(fetchMovieDetails.rejected, state => { state.movieDetailsLoadingStatus = 'error' })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetailsLoadingStatus = 'idle';
        state.movieData = action.payload;
      })
  }
});

const { actions, reducer } = MovieDetailsSlice;

export default reducer;
export const { setMovieId } = actions;