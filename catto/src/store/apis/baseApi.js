import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as TAGS from './rtkqueryTags';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ENDPOINT }),
  endpoints: () => ({}),
  tagTypes: Object.values(TAGS)
});
