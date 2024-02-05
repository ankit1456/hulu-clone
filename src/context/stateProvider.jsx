/* eslint-disable react/prop-types */
// setup data layer
// we need this  to track the user
import { createContext, useContext, useReducer } from "react";
// this is data layer
export const StateContext = createContext();
// build a provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// this is how we use it indside of a component
export const useStateValue = () => useContext(StateContext);
