import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const actorsAdapter = createEntityAdapter();

const initialState = actorsAdapter.getInitialState({
  actorsLoadingStatus: 'idle'
});

export const fetchActors = createAsyncThunk(
  'actors/fetchActors',
  async (movieId, thunkApi) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkApi.extra;

    const response = await request(`${_apiBase}movie/${movieId}/credits?api_key=${_apiKey}&language=uk-UA`);

    const data = response.cast.slice(0, 20).map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character.split('/')[0].trim(),
      image: actor.profile_path
    }));

    return data;
  }
);

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, state => { state.actorsLoadingStatus = 'loading' })
      .addCase(fetchActors.rejected, state => { state.actorsLoadingStatus = 'error' })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.actorsLoadingStatus = 'idle';
        actorsAdapter.setAll(state, action.payload);
      })
  }
});

const { reducer } = actorsSlice;

export const { selectAll } = actorsAdapter.getSelectors(state => state.actors);

export default reducer;