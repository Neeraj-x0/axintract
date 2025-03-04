import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCollapsed: false,
    isNavBarOpen: false,
    isMobile: false,
};

const navBarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        toggleCollapsed: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        toggleNavBarOpen: (state, action) => {
            if (typeof action.payload === 'boolean') {
                state.isNavBarOpen = action.payload;
            } else {
                state.isNavBarOpen = !state.isNavBarOpen;
            }
        },
        setMobile: (state, action) => {
            state.isMobile = action.payload;
            if (action.payload) {
                state.isCollapsed = true;
            }
        },
    },
});

export const { toggleCollapsed, toggleNavBarOpen, setMobile } = navBarSlice.actions;
export default navBarSlice.reducer; 