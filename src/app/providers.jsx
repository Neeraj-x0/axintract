"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import PropTypes from "prop-types";
import { CookiesProvider } from "react-cookie";

export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <Provider store={store}>{children}</Provider>
    </CookiesProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
