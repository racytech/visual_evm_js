import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../State/StateCtx";


interface EVMInterface {
    isActive: boolean;
}

export function EVM({ id }) {


    const [localState, setLocalState] = useState(0);


    const { state } = useContext(StateContext);

    // "Main state/App state" keeps track of currently active("to show") component
    // it also keeps the state of each transaction

    const { activeComponent } = state;


    let _style = activeComponent === id ?
        { display: "flex" }
        :
        { display: "none" };

    function incr(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        let n = localState + 1;
        setLocalState(n);
    }

    return (
        <div className="evm-cmp" style={_style}>
            THIS IS COMPONENT {id}
            <button onClick={(e) => incr(e)}>counter++</button>
            <div>{localState}</div>
        </div>
    )
}