import { baseApi } from './baseApi';
import { getCatAPI } from './slices/cats';

const api = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCat: getCatAPI(builder)
  }),
  overrideExisting: true
});

export default api;

export const { useLazyGetCatQuery } = api;
