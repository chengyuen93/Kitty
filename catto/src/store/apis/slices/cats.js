import { CAT, CATS_BY_BREED } from '../rtkqueryTags';
import { URL_GET_A_CAT, URL_GET_CATS_BY_BREED } from '../urls/cats';

export const getCatAPI = builder => {
  return builder.query({
    query: ({ id }) => {
      return {
        url: `${URL_GET_A_CAT(id)}`,
        method: 'GET'
      };
    },
    transformResponse: (response, meta, arg) => {
      return response[0];
    },
    providesTags: [CAT]
  });
};
