import { baseApi } from './baseApi';
import { getBreedsAPI, getCatAPI, getCatsByBreedAPI } from './slices/cats';

const api = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCat: getCatAPI(builder),
    getBreeds: getBreedsAPI(builder),
    getCatsByBreed: getCatsByBreedAPI(builder)
  }),
  overrideExisting: true
});

export default api;

export const {
  useLazyGetCatQuery,
  useGetBreedsQuery,
  useLazyGetCatsByBreedQuery
} = api;
