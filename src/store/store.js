import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commentSlice";

const store = configureStore({
  reducer: {
    comment: commentSlice,
  },
});

export default store;