import { BREEDS, CAT, CATS_BY_BREED } from '../rtkqueryTags';
import {
  URL_GET_A_CAT,
  URL_GET_BREEDS,
  URL_GET_CATS_BY_BREED
} from '../urls/cats';

export const getCatAPI = builder => {
  return builder.query({
    query: () => {
      return {
        url: `${URL_GET_A_CAT}`,
        method: 'GET'
      };
    },
    transformResponse: (response, meta, arg) => {
      return response[0];
    },
    providesTags: [CAT]
  });
};

export const getBreedsAPI = builder => {
  return builder.query({
    query: () => {
      return {
        url: URL_GET_BREEDS,
        method: 'GET'
      };
    },
    transformResponse: (response, meta, arg) => {
      const options = Object.values(response).map(x => ({
        id: x.id,
        title: x.name
      }));
      return options;
    },
    providesTags: [BREEDS]
  });
};

export const getCatsByBreedAPI = builder => {
  return builder.query({
    query: ({ breed_id, limit = 6 }) => {
      return {
        url: `${URL_GET_CATS_BY_BREED(breed_id)}${
          limit === undefined ? '' : `?limit=${limit}`
        }`,
        method: 'GET'
      };
    },
    transformResponse: (response, meta, arg) => {
      const cats = Object.values(response);
      const data = { breeds: cats[0]?.breeds ?? [], info: [] };
      cats.forEach(({ breeds, ...info }) => {
        data.info.push(info);
      });

      return data;
    },
    providesTags: [CATS_BY_BREED]
  });
};
