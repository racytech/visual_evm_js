import React, { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../State/StateCtx";


function BlockN({ blockN }) {

    // const result = (
    //     blockN === null ?

    // )

    return (
        <div id="block-n">
            {blockN === null ?
                <h5>
                    No block to display
                </h5>
                :
                <h5>
                    Block transactions
                </h5>
            }
        </div>
    )
}

function Transaction({ idx, from, to, hash, gas, gasPrice, input, value }) {

    const { setActiveCmp, state } = useContext(StateContext);

    const { activeComponent } = state;

    const [collapsed, setCollapsed] = useState(false);

    if (!collapsed && (activeComponent === `${idx}.evm` || activeComponent === `${idx}.graph`)) {
        setCollapsed(true);
    }


    function handleCollapse(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault()
        setCollapsed(!collapsed);
    }

    let classList: string[] = ["tx-info"]
    if (!collapsed) {
        classList.push("collapsed")
    }


    function handleEVMClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault();
        console.log(`evm click: ${idx}.evm`);
        setActiveCmp(`${idx}.evm`);
    }

    function handleGraphClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault();
        console.log(`graph click: ${idx}.graph`);
        setActiveCmp(`${idx}.graph`);
    }

    return (
        <ul>
            <li
                className="tx-number"
                onClick={(e) => handleCollapse(e)}
            >
                <span role="link">
                    <span style={{ fontSize: "0.9rem" }}>tx</span> - {idx}
                </span>
            </li>
            <ul className={classList.join(" ")} >

                <li  >
                    <span role="link" className="disabled">
                        from:{from}
                    </span>
                </li>

                <li>
                    <span role="link" className="disabled">
                        to:{to}
                    </span>
                </li>

                <li>
                    <span role="link" className="disabled">
                        hash:{hash}
                    </span>
                </li>

                <li>
                    <span role="link" className="disabled">
                        gas:{gas}
                    </span>
                </li>

                <li>
                    <span role="link" className="disabled">
                        gasPrice:{gasPrice}
                    </span>
                </li>

                <li>
                    <span role="link" className="disabled">
                        value:{value}
                    </span>
                </li>
                <li>
                    <span role="link" className="disabled">
                        input:{input}
                    </span>
                </li>

                <li
                    role="link"
                    tabIndex={0}
                    className={`clickable ${activeComponent === `${idx}.evm` ? "tx-active" : ""}`}
                    onClick={(e) => handleEVMClick(e)}
                >
                    evm
                </li>

                <li
                    role="link"
                    tabIndex={0}
                    className={`clickable ${activeComponent === `${idx}.graph` ? "tx-active" : ""}`}
                    onClick={(e) => handleGraphClick(e)}
                >
                    graph
                </li>
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

