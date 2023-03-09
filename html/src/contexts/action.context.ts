import React from "react";
import { CurrentActionContext } from "../interfaces/contexts.interface";

export const currentActionContext = React.createContext<CurrentActionContext>({
    currentAction: null,
    setCurrentAction: () => { }
})