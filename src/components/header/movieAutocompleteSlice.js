import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  movieAutocomplete: [],
  movieAutocompleteLoadingStatus: 'idle'
}

export const fetchMovieAutocomplete = createAsyncThunk(
  'movieAutocomplete/fetchMovieAutocomplete',
  async (movieName, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}search/movie?api_key=${_apiKey}&query=${encodeURIComponent(movieName)}&language=uk-UA`);

    const data = response.results.slice(0, 5).map(movie => ({
      id: movie.id,
      title: movie.title
    }));

    return data;
  }
)

const MovieAutocompleteSlice = createSlice({
  name: 'movieAutocomplete',
  initialState,
  reducers: {
    clearAutocompleteData: (state) => {
      state.movieAutocomplete = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAutocomplete.pending, state => { state.movieAutocompleteLoadingStatus = 'loading' })
      .addCase(fetchMovieAutocomplete.rejected, state => { state.movieAutocompleteLoadingStatus = 'error' })
      .addCase(fetchMovieAutocomplete.fulfilled, (state, action) => {
        state.movieAutocompleteLoadingStatus = 'idle';
        state.movieAutocomplete = action.payload
      })
  }
})

const { actions, reducer } = MovieAutocompleteSlice;

export default reducer;

export const {
  clearAutocompleteData
} = actions;