import React, { useEffect, useReducer } from 'react'
import { ACTIONS } from '../shared/actions'
import { INIT_STATE, Spinner, StateReducer } from './reducer'
import { StateContext } from './StateCtx'


async function fetchBlock(blockN: number) {
    return await (await (fetch(`http://127.0.0.1:12345/blocks?block=${blockN}`))).json()
}

async function getBlockByNumber(blockN: number) {
    // {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x%x", true],"id":%d}
    const query = {
        jsonrpc: 2.0,
        method: 'eth_getBlockByNumber',
        params: [`0x${blockN.toString(16)}`, true],
        id: 1,
    }

    console.log(JSON.stringify(query))

    return await (await fetch('http://localhost:8545', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blockN),
    })).json()
}



export function State({ children }) {

    // @ts-ignore
    const [state, dispatch] = useReducer(StateReducer, INIT_STATE)


    useEffect(() => {
        // fetch("http://127.0.0.1:12345/blocks?block=5891876")
        //     .then(response => response.json())
        //     .then(console.log)
        //     .catch(console.error)

        // toggleSpinner({ isOn: true, msg: "This should be displayed" })

        // setTimeout(() => {
        //     toggleSpinner({ isOn: false, msg: "" })
        // }, 1000)


    }, []);

    function toggleSpinner(params: Spinner) {
        dispatch({ type: ACTIONS.TOGGLE_SPINNER, payload: params })
    }

    function searchBlock(blockN: number) {
        fetchBlock(blockN)
            .then(data => {
                const txs = data.result.transactions;

                // const payload = txs && txs.length > 0 ?
                //     { txs, blockN } : { txs: [], blockN };

                let payload = { txs: [], contentComponents: [], blockN };

                let len_txs = txs.length;
                if (txs && len_txs > 0) {
                    payload.txs = txs

                    for (let i = 0; i < len_txs; i++) {
                        // @ts-ignore
                        payload.contentComponents.push(`${i}.evm`);
                        // @ts-ignore
                        payload.contentComponents.push(`${i}.graph`);
                    }
                }

                dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload });
            })
    }

    function setActiveCmp(id: string) {

        let in_list = false;
        for (const tabCmp of state.tabComponents) {
            if (tabCmp === id) {
                in_list = true;
                break;
            }
        }

        let idx = "";
        for (let i = 0; i < id.length; i++) {
            if (isNaN(+id[i])) {
                break
            }
            idx += id[i]
        }

        console.log(idx);

        const payload = { id, idx: +idx } // id of the component and idx of the transaction

        if (!in_list) {
            // if tab that we want to add is not present in tablist
            // add a tab to the list and set it as active tab
            dispatch({
                type: ACTIONS.ADD_ACTIVE_CMP_WITH_TAB,
                payload,
            })
        } else {
            dispatch({
                type: ACTIONS.SET_ACTIVE_CMP,
                payload,
            });
        }
    }

    function toggleCollapsed(idx: number, toOpen: boolean = false) {
        if (toOpen) {
            dispatch({ type: ACTIONS.SET_COLLAPSED_OPEN, payload: idx });
        } else {
            dispatch({ type: ACTIONS.SET_COLLAPSED, payload: idx });
        }
    }

    return (
        <StateContext.Provider value={{
            state,
            searchBlock,
            toggleSpinner,
            setActiveCmp,
            toggleCollapsed,
        }}>
            {children}
        </StateContext.Provider>
    )
}