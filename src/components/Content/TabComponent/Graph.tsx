import React, { useContext } from "react";
import { StateContext } from "../../State/StateCtx";

export function Graph({ id }) {
    const { state } = useContext(StateContext);

    // "Main state/App state" keeps track of currently active("to show") component
    // it also keeps the state of each transaction

    const { activeComponent } = state;


    let _style = activeComponent === id ?
        { display: "flex" }
        :
        { display: "none" };

    return (
        <div className="graph-cmp" style={_style}>
            THIS IS COMPONENT {id}
        </div>
    )
}