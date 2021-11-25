import { createContext } from 'react';
import { INIT_STATE, Spinner, StateInterface } from './reducer';

interface StateContextInterface {
    state: StateInterface;
    toggleSpinner: (params: Spinner) => void;
    searchBlock: (blockN: number) => void;
}

const ctx: StateContextInterface = {
    state: INIT_STATE,
    toggleSpinner: () => { },
    searchBlock: () => { },
}



export const StateContext = createContext<StateContextInterface>(ctx);