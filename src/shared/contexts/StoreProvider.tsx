import React, { useContext, useReducer, createContext } from "react";
import {
  Appstate,
  initialAppState,
  appReducer,
  ReducerActions,
} from "./appReducer";

const GeneralContext = createContext<
  { state: Appstate; dispatch: React.Dispatch<ReducerActions> } | undefined
>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <GeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a StoreProvider");
  }
  return context;
};
