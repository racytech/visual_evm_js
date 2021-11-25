import React, { useContext, useState } from "react";
import { StateContext } from "../State/StateCtx";



export function SearchBar() {

    const [state, setState] = useState({
        value: "",
        isErr: false,
    });

    const { searchBlock } = useContext(StateContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        if (isNaN(+e.target.value)) {
            setState({ isErr: true, value: e.target.value })
        } else {
            setState({ isErr: false, value: e.target.value })
        }
    }

    function handleSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!state.isErr) {
            console.log(state);
            // dispatch search
            searchBlock(+state.value)
        }

    }

    let classList = []
    if (state.isErr) {
        classList.push("error")
    }

    return (
        <div id="search-bar">
            <input
                className={classList.join(" ")}
                type="text"
                placeholder="enter block number..."
                value={state.value}
                onChange={(e) => handleChange(e)}
            />
            <button onClick={e => handleSearch(e)}>
                search
            </button>
        </div>
    )
}