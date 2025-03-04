import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false,
  isSidebarOpen: true,
  isMobile: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    toggleSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
      if (action.payload) {
        state.isCollapsed = true;
        state.isSidebarOpen = false;
      }
    },
  },
});

export const { toggleCollapsed, toggleSidebarOpen, setMobile } = sidebarSlice.actions;
export default sidebarSlice.reducer; 