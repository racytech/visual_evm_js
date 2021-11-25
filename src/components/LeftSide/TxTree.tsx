import React, { useContext } from "react";
import { StateContext } from "../State/StateCtx";

export function TxTree() {

    const { state, toggleSpinner } = useContext(StateContext);
    const txs = state.transactions;

    return (
        <div id="tx-tree">

        </div>
    )
}