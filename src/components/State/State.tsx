import React, { useEffect, useReducer } from 'react'
import { ACTIONS } from '../../shared/constants'
import { INIT_STATE, Spinner, StateReducer } from './reducer'
import { StateContext } from './StateCtx'


async function fetchBlock(blockN: number) {
    return await (await (fetch(`http://127.0.0.1:12345/blocks?block=${blockN}`))).json()
}

export function State({ children }) {

    // @ts-ignore
    const [state, dispatch] = useReducer(StateReducer, INIT_STATE)


    useEffect(() => {
        // fetch("http://127.0.0.1:12345/blocks?block=5891876")
        //     .then(response => response.json())
        //     .then(console.log)
        //     .catch(console.error)

        toggleSpinner({ isOn: true, msg: "This should be displayed" })

        setTimeout(() => {
            toggleSpinner({ isOn: false, msg: "" })
        }, 1000)

    }, [])

    function toggleSpinner(params: Spinner) {
        dispatch({ type: ACTIONS.TOGGLE_SPINNER, payload: params })
    }

    function searchBlock(blockN: number) {
        fetchBlock(blockN)
            .then(data => {
                const txs = data.result.transactions;
                if (txs === null) {
                    dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: [] });
                } else {
                    dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: txs });
                }
            })
    }

    return (
        <StateContext.Provider value={{
            state,
            searchBlock,
            toggleSpinner,
        }}>
            {children}
        </StateContext.Provider>
    )
}