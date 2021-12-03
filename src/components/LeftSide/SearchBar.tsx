import React, { useContext, useState } from "react";
import { IconButton } from "../shared/components/IconButton";
import { ICON_SEARCH } from "../shared/icons";
import { StateContext } from "../State/StateCtx";



export function SearchBar() {

    const [state, setState] = useState({
        value: "5915910",
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
        let v = state.value.trim()
        if (!state.isErr && v) {
            // console.log(state);
            // dispatch search
            // setState({ isErr: false, value: "" });
            searchBlock(+v)
        }

    }

    let classList: string[] = []
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
            {/* <button onClick={e => handleSearch(e)}>
                search
            </button> */}
            <IconButton
                action={handleSearch}
                icon={ICON_SEARCH}
                hint={"search for a block by its number"}
                _classes={[]}
                hintPosition={"bottom right"}
            />
        </div>
    )
}

// 5915910