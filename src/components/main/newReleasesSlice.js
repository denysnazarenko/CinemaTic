import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const newReleasesAdapter = createEntityAdapter();

const initialState = newReleasesAdapter.getInitialState({
  newReleasesLoadingStatus: 'idle'
});

export const fetchNewReleases = createAsyncThunk(
  'newReleases/fetchNewReleases',
  async (_, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}movie/popular?api_key=${_apiKey}&language=uk&page=1`);

    const data = response.results.map(result => {
      return {
        title: result.title,
        genre_ids: result.genre_ids,
        image: result.backdrop_path,
        overview: result.overview,
        rating: Number(result.vote_average.toFixed(1)),
        release_date: result.release_date.slice(0, 4),
        id: result.id
      }
    });

    return data;
  }
);

const newReleasesSlice = createSlice({
  name: 'newReleases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewReleases.pending, state => { state.newReleasesLoadingStatus = 'loading' })
      .addCase(fetchNewReleases.rejected, state => { state.newReleasesLoadingStatus = 'error' })
      .addCase(fetchNewReleases.fulfilled, (state, action) => {
        state.newReleasesLoadingStatus = 'idle';
        newReleasesAdapter.setAll(state, action.payload);
      })
  }
});

const { reducer } = newReleasesSlice;

export const { selectAll } = newReleasesAdapter.getSelectors(state => state.newReleases);

export default reducer;