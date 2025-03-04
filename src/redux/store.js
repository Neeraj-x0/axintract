import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import navBarReducer from "./features/navBarSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    navBar: navBarReducer,
  },
});

