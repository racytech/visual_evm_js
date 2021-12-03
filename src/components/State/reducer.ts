import { ACTIONS } from "../shared/actions"

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
    type: number;
    payload: any;
}

export interface StateInterface {
    spinner: Spinner;
    transactions: Transaction[];
    blockN?: number | null;
    contentComponents: string[]; // id list of the components
    activeComponent: string; // id of the active component 
    tabComponents: string[]; // list of "opened" components
    collapsed: { [key: number]: boolean };
}

export const INIT_STATE: StateInterface = {
    spinner: { isOn: false, msg: "" },
    transactions: [],
    blockN: null,
    contentComponents: [],
    activeComponent: '',
    tabComponents: [],
    collapsed: {},
}

export function StateReducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_SPINNER:
            return { ...state, spinner: action.payload }

        case ACTIONS.SET_TRANSACTIONS:
            return {
                ...INIT_STATE,
                transactions: action.payload.txs,
                contentComponents: action.payload.contentComponents,
                // tabComponents: [],
                // activeComponent: '',
                blockN: action.payload.blockN
            }

        case ACTIONS.ADD_CONTENT_CMP:
            return { ...state, contentComponents: [...state.contentComponents, action.payload] }

        case ACTIONS.SET_ACTIVE_CMP:
            return {
                ...state,
                activeComponent: action.payload.id,
                collapsed: {
                    ...state.collapsed,
                    [action.payload.idx]: true,
                }
            };

        case ACTIONS.ADD_ACTIVE_CMP_WITH_TAB:
            return {
                ...state,
                activeComponent: action.payload.id,
                tabComponents: [...state.tabComponents, action.payload.id],
                collapsed: {
                    ...state.collapsed,
                    [action.payload.idx]: true,
                }
            }


        case ACTIONS.SET_COLLAPSED:
            return {
                ...state,
                collapsed: {
                    ...state.collapsed,
                    [action.payload]: !state.collapsed[action.payload],
                }
            }

        // case ACTIONS.SET_COLLAPSED_OPEN:
        //     return {
        //         ...state,
        //         collapsed: {
        //             ...state.collapsed,
        //             [action.payload]: true,
        //         }
        //     }

        default:
            throw new Error('Shoudn\'t have happened...')
    }
}


