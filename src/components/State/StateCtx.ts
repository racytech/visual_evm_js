import { createContext } from 'react';
import { INIT_STATE, Spinner, StateInterface } from './reducer';

interface StateContextInterface {
    state: StateInterface;
    toggleSpinner: (params: Spinner) => void;
    searchBlock: (blockN: number) => void;
    toggleCollapsed: (idx: number) => void;
    addIntrptr: (id: string, element: JSX.Element) => void,
    setActiveCMP: (id: string) => void,
    removeTab: (id: string) => void,
}

const ctx: StateContextInterface = {
    state: INIT_STATE,
    toggleSpinner: () => { },
    searchBlock: () => { },
    toggleCollapsed: () => { },
    addIntrptr: () => { },
    setActiveCMP: () => { },
    removeTab: () => { },
}



export const StateContext = createContext<StateContextInterface>(ctx);