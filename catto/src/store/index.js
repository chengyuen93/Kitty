import { configureStore } from "@reduxjs/toolkit";
import api from "./apis/combinedApis";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      api.middleware
    );
  },
});
