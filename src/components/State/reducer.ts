import { BlockHeader, Transaction } from "../../lib/types"
import { LinkBTN } from "../../lib/utils"
import { ACTIONS } from "../shared/actions"


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
    blockHeader: BlockHeader | null;
    activeComponent: string; // id of the active component 
    tabList: string[]; // list of "opened" components
    collapsed: { [key: number]: boolean };
    displayComponents: { [key: string]: JSX.Element },
    linkBtns: LinkBTN[],
    restFiles: string[],
    arrowUpDown: { [key: string]: number },
}

export const INIT_STATE: StateInterface = {
    spinner: { isOn: false, msg: "" },
    transactions: [],
    blockN: null,
    blockHeader: null,
    activeComponent: '',
    tabList: [],
    collapsed: {},
    displayComponents: {}, // transactions to be displayed as soon as search called
    linkBtns: [],
    restFiles: [], // dynamically added "views"
    arrowUpDown: {}
}

export function StateReducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_SPINNER:
            return { ...state, spinner: action.payload }

        case ACTIONS.SET_TRANSACTIONS:
            return {
                ...INIT_STATE,
                transactions: action.payload.txs,
                blockN: action.payload.blockN,
                blockHeader: action.payload.blockHeader,
                linkBtns: action.payload.linkBtns,
            }

        case ACTIONS.SET_COLLAPSED:
            return {
                ...state,
                collapsed: {
                    ...state.collapsed,
                    [action.payload]: !state.collapsed[action.payload],
                }
            }

        case ACTIONS.SET_ACTIVE_CMP:
            return {
                ...state,
                activeComponent: action.payload,
            }

        // set active component and open transaction "folder"
        case ACTIONS.SET_ACTIVE_CMP_2:
            return {
                ...state,
                activeComponent: action.payload.key,
                collapsed: {
                    ...state.collapsed,
                    [action.payload.idx]: true,
                }
            }


        case ACTIONS.ADD_TAB:
            return {
                ...state,
                tabList: [...state.tabList, action.payload],
            }

        case ACTIONS.REMOVE_TAB:
            return {
                ...state,
                tabList: action.payload,
            }

        case ACTIONS.REMOVE_TAB_SET_ACTIVE:
            return {
                ...state,
                activeComponent: action.payload.activeTab,
                tabList: action.payload.newTabs,
            }

        case ACTIONS.ADD_DISPLAY_COMPONENT:
            return {
                ...state,
                displayComponents: {
                    ...state.displayComponents,
                    [action.payload.key]: action.payload.element,
                },
                activeComponent: action.payload.key,
            }


        case ACTIONS.ADD_DISPLAY_COMPONENT_WITH_TAB:
            return {
                ...state,
                displayComponents: {
                    ...state.displayComponents,
                    [action.payload.key]: action.payload.element,
                },
                activeComponent: action.payload.key,
                tabList: [...state.tabList, action.payload.key],
            }

        default:
            throw new Error('Shoudn\'t have happened...')
    }
}
