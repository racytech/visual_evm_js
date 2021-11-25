import React, { useContext } from "react";
import { StateContext } from "./State/StateCtx";

export function Spinner() {


    const { state } = useContext(StateContext)



    const is_active = state.spinner.isOn;
    // let message = state.spinner.msg;

    let spinner = null;
    if (is_active) {
        // @ts-ignore
        spinner = (
            <div id="spinner">
                <div className="spinner-wrap">
                    <div className="lds-dual-ring"></div>
                    <div className="spinner-msg">
                        {state.spinner.msg}
                    </div>
                </div>
            </div>
        )

    }
    return spinner;
}