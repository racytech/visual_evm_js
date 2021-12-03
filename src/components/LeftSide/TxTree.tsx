import React, { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../State/StateCtx";


function BlockN({ blockN }) {

    // const result = (
    //     blockN === null ?

    // )

    return (
        <div id="block-n">
            {blockN === null ?
                <h6>
                    No transactions yet
                </h6>
                :
                <h6>
                    Block transactions
                </h6>
            }
        </div>
    )
}

function Transaction({ idx, from, to, hash, gas, gasPrice, input, value }) {

    const { setActiveCmp, toggleCollapsed, state } = useContext(StateContext);

    const { activeComponent, collapsed } = state;


    function handleCollapse(e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLLIElement>) {
        e.preventDefault()
        toggleCollapsed(idx);
    }

    // function keyUp(e: React.KeyboardEvent<HTMLLIElement>) {
    //     e.preventDefault();
    //     console.log(e);
    //     if (e.type === 'keyup') {
    //         const { code } = e;

    //         if (code === "Space" || code === "Enter") {
    //             handleCollapse(e);
    //         }
    //     }
    // }

    let classList: string[] = ["tx-info"];
    if (!collapsed[idx]) {
        classList.push("collapsed")
    }

    let whenCollapsed: string[] = ["tx-number"];
    if (!collapsed[idx] && (activeComponent === `${idx}.evm` || activeComponent === `${idx}.graph`)) {
        whenCollapsed.push("active-tab")
    }

    function handleEVMClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault();
        console.log(`evm click: ${idx}.evm`);
        setActiveCmp(`${idx}.evm`);
    }

    // function handleGraphClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    //     e.preventDefault();
    //     console.log(`graph click: ${idx}.graph`);
    //     setActiveCmp(`${idx}.graph`);
    // }

    return (
        <ul>
            <li
                // role="link"
                // tabIndex={0}

                className={whenCollapsed.join(" ")}
                onClick={(e) => handleCollapse(e)}
            // onKeyUp={(e) => keyUp(e)}            
            >
                <span role="link">
                    tx: {idx}
                </span>
            </li>
            <ul className={classList.join(" ")} >


                <li
                    role="link"
                    tabIndex={0}
                    className={`clickable ${activeComponent === `${idx}.evm` ? "tx-active" : ""}`}
                    onClick={(e) => handleEVMClick(e)}
                >
                    evm
                </li>

                {/* <li
                    role="link"
                    tabIndex={0}
                    className={`clickable ${activeComponent === `${idx}.graph` ? "tx-active" : ""}`}
                    onClick={(e) => handleGraphClick(e)}
                >
                    graph
                </li> */}
            </ul>
        </ul>
    )
}

export function TxTree() {

    const { state, toggleSpinner } = useContext(StateContext);
    const { transactions, blockN, activeComponent } = state;


    return (
        <div id="tx-tree">
            <BlockN blockN={blockN} />
            <div id="tx-list">
                {

                    transactions.length > 0 ?

                        transactions.map((v, i) => {
                            return <Transaction
                                key={i}
                                idx={i}
                                {...v}
                            />
                        })
                        :

                        blockN === null ?
                            null
                            :
                            <p>There are no transactions in this block</p>

                }
            </div>
        </div>
    )
}

