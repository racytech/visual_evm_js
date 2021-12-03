import React, { useEffect, useReducer } from 'react'
import { ACTIONS } from '../shared/actions'
import { INIT_STATE, Spinner, StateReducer } from './reducer'
import { StateContext } from './StateCtx'


async function fetchBlock(blockN: number) {
    return await (await (fetch(`http://127.0.0.1:12345/blocks?block=${blockN}`))).json()
}

export function State({ children }) {

    // @ts-ignore
    const [state, dispatch] = useReducer(StateReducer, INIT_STATE)


    useEffect(() => {

    }, []);

    function toggleSpinner(params: Spinner) {
        dispatch({ type: ACTIONS.TOGGLE_SPINNER, payload: params })
    }

    function searchBlock(blockN: number) {
        fetchBlock(blockN)
            .then(data => {
                const txs = data.result.transactions;

                let payload = {
                    txs: [],
                    contentComponents: [],
                    blockN,
                    linkBtns: [],
                };

                let len_txs = txs.length;
                if (txs && len_txs > 0) {
                    payload.txs = txs

                    for (let i = 0; i < len_txs; i++) {
                        // @ts-ignore
                        payload.linkBtns.push({
                            id: `${i}-0.evm`,
                            children: []
                        });
                    }
                }

                dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload });
            })
    }


    function toggleCollapsed(idx: number, toOpen: boolean = false) {
        if (toOpen) {
            dispatch({ type: ACTIONS.SET_COLLAPSED_OPEN, payload: idx });
        } else {
            dispatch({ type: ACTIONS.SET_COLLAPSED, payload: idx });
        }
    }

    function addEVM(id: string, element: JSX.Element) {

        let isInTabs = false;
        for (const tabID of state.tabList) {
            if (tabID === id) {
                isInTabs = true;
            }
        }

        if (!state[id]) {
            if (!isInTabs) {
                dispatch({
                    type: ACTIONS.ADD_DISPLAY_COMPONENT_WITH_TAB,
                    payload: {
                        key: id,
                        element,
                    }
                })
            } else {
                dispatch({
                    type: ACTIONS.ADD_DISPLAY_COMPONENT,
                    payload: {
                        key: id,
                        element,
                    }
                })
            }
        } else {
            if (!isInTabs) {
                dispatch({
                    type: ACTIONS.ADD_TAB,
                    payload: id,
                })
            } else {
                setActiveCMP(id);
            }
        }
    }

    function setActiveCMP(id: string) {
        if (id) {

            let n = ""
            for (let i = 0; i < id.length; i++) {
                if (isNaN(+id[i])) {
                    break;
                }
                n += id[i]
            }

            if (!state.collapsed[+n]) {
                dispatch({
                    type: ACTIONS.SET_ACTIVE_CMP_2,
                    payload: {
                        key: id,
                        idx: +n
                    }
                })
            } else {
                dispatch({
                    type: ACTIONS.SET_ACTIVE_CMP,
                    payload: id,
                })
            }
        }
    }

    function removeTab(id: string) {

        if (state.tabList.length > 0) {

            let newTabs = [];
            let activeTab = ""

            for (let i = 0; i < state.tabList.length; i++) {
                let tab = state.tabList[i];
                if (tab === id) {

                    if (i > 0) {
                        // not a first tab in tablist 
                        // set previous component as active
                        activeTab = state.tabList[i - 1];
                    }

                    if (i === 0) {
                        // first tab in tablist and tablist length is > 0
                        // set next component as active
                        activeTab = state.tabList[i + 1];
                    }

                    continue;
                }
                newTabs.push(tab);
            }

            // if we want to close currently active component
            if (state.activeComponent === id) {
                if (state.tabList.length === 1) {
                    dispatch({
                        type: ACTIONS.REMOVE_TAB_SET_ACTIVE,
                        payload: {
                            newTabs,
                            activeTab: "",
                        }
                    })
                } else {
                    dispatch({
                        type: ACTIONS.REMOVE_TAB_SET_ACTIVE,
                        payload: {
                            newTabs,
                            activeTab,
                        }
                    })
                }
            } else {
                dispatch({
                    type: ACTIONS.REMOVE_TAB,
                    payload: newTabs,
                })
            }
        }
    }

    return (
        <StateContext.Provider value={{
            state,
            searchBlock,
            toggleSpinner,
            toggleCollapsed,
            addEVM,
            setActiveCMP,
            removeTab,
        }}>
            {children}
        </StateContext.Provider>
    )
}