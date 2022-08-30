import React, { useContext, useReducer, createContext } from "react";
import { Appstate, initialAppState, appReducer, ReducerActions } from './appReducer'

type Dispatch = (action: ReducerActions) => void

export const GeneralContext = createContext<{ state: Appstate, dispatch: Dispatch } | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            {children}
        </GeneralContext.Provider>
    )
}

export const useGeneralContext = () => {
    const context = useContext(GeneralContext);
    if (context === null) throw new Error('useGeneralContext must be used within a StoreProvider')
    return context
}