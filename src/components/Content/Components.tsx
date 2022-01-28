import React, { useContext } from "react";
import { StateContext } from "../State/StateCtx";


export function Components() {

    const { state } = useContext(StateContext);
    const { displayComponents } = state;

    return (
        <div id="content-components">

            {...Object.values(displayComponents)}

        </div>
    )
}