import React, { useEffect, useReducer } from 'react'
import { rpc_client } from '../../lib/rpc_client'
import { BlockHeader } from '../../lib/types'
import { ACTIONS } from '../shared/actions'
import { INIT_STATE, Spinner, StateReducer } from './reducer'
import { StateContext } from './StateCtx'
import { u256_client } from '../../lib/u256_client'

export function State({ children }) {

    // @ts-ignore
    const [state, dispatch] = useReducer(StateReducer, INIT_STATE)


    useEffect(() => {
        u256_client.test_requests()
            .then(console.log)
    }, []);

    function toggleSpinner(params: Spinner) {
        dispatch({ type: ACTIONS.TOGGLE_SPINNER, payload: params })
    }

    function searchBlock(blockN: number) {

        rpc_client.getBlockByNumber(blockN)
            .then(data => {

                const block: BlockHeader = data.result;
                const { transactions } = block;

                let payload = {
                    txs: [],
                    contentComponents: [],
                    blockN,
                    blockHeader: block,
                    linkBtns: [],
                }

                let len_txs = transactions.length;
                if (transactions && len_txs > 0) {
                    payload.txs = transactions

                    for (let i = 0; i < len_txs; i++) {
                        // @ts-ignore
                        payload.linkBtns.push({
                            id: `${i}-0.in`,
                            children: []
                        });
                    }
                }
                console.log(payload)
                dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload });
            })

        rpc_client.getGasPrice()
            .then(console.log)
    }


    function toggleCollapsed(idx: number, toOpen: boolean = false) {
        if (toOpen) {
            dispatch({ type: ACTIONS.SET_COLLAPSED_OPEN, payload: idx });
        } else {
            dispatch({ type: ACTIONS.SET_COLLAPSED, payload: idx });
        }
    }

    function addIntrptr(id: string, element: JSX.Element) {

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
                console.log("GOT HERE")
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
            addIntrptr,
            setActiveCMP,
            removeTab,
        }}>
            {children}
        </StateContext.Provider>
    )
}