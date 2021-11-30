import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../State/StateCtx";
import { EVM } from "./TabComponent/EVM";
import { Graph } from "./TabComponent/Graph";


export function Components() {

    const { state } = useContext(StateContext);
    const { contentComponents } = state;
    // const { currentCmp } = state;

    // console.log(state.transactions.length)

    return (
        <div id="content-components">

            {
                contentComponents.map((id, i) => {
                    if (id.includes('evm')) {
                        return <EVM id={id} key={id} />
                    }

                    if (id.includes('graph')) {
                        return <Graph id={id} key={id} />
                    }

                    return null;
                })
            }

        </div>
    )
}