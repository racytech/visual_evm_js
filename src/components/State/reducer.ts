import { ACTIONS } from "../../shared/constants";

export interface Transaction {
    from: string;
    to: string | null;
    hash: string;
    gas: string;
    gasPrice: string;
    input: string;
    value: string;
}

export interface Spinner {
    isOn: boolean;
    msg: string;
}

export interface Action {
    type: string;
    payload: any;
}

export interface StateInterface {
    spinner: Spinner;
    transactions: Transaction[],
}

export const INIT_STATE: StateInterface = {
    spinner: { isOn: false, msg: "" },
    transactions: [],
}

export function StateReducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_SPINNER:
            return { ...state, spinner: action.payload }

        case ACTIONS.SET_TRANSACTIONS:
            return { ...state, transactions: action.payload }

        default:
            throw new Error('Shoudn\'t have happened...')
    }
}