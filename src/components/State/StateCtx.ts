import { createContext } from 'react';
import { INIT_STATE, Spinner, StateInterface } from './reducer';

interface StateContextInterface {
    state: StateInterface;
    toggleSpinner: (params: Spinner) => void;
    searchBlock: (blockN: number) => void;
    setActiveCmp: (id: string) => void;
    toggleCollapsed: (idx: number) => void;
}

const ctx: StateContextInterface = {
    state: INIT_STATE,
    toggleSpinner: () => { },
    searchBlock: () => { },
    setActiveCmp: () => { },
    toggleCollapsed: () => { },
}



export const StateContext = createContext<StateContextInterface>(ctx);