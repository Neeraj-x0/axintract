"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "./store";
import PropTypes from "prop-types";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

