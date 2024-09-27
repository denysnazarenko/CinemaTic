import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const genresAdapter = createEntityAdapter();

const initialState = genresAdapter.getInitialState({
  genresLoadingStatus: 'idle'
});

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}genre/movie/list?api_key=${_apiKey}&language=uk`);

    return response.genres;
  }
);

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, state => { state.genresLoadingStatus = 'loading' })
      .addCase(fetchGenres.rejected, state => { state.genresLoadingStatus = 'error' })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genresLoadingStatus = 'idle';
        genresAdapter.setAll(state, action.payload);
      })
  }
});

const { reducer } = genresSlice;

export const { selectAll } = genresAdapter.getSelectors(state => state.genres);

export default reducer;