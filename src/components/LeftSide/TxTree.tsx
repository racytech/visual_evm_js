import React, { useContext, useEffect, useRef, useState } from "react";
import { EVM } from "../Content/TabComponent/EVM";
import { LinkBTN } from "../shared/components/LinkButton";
import { StateContext } from "../State/StateCtx";


function BlockN({ blockN }) {

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

function TreeBTN({ id, children, clickAction, level }) {

    // className={`clickable ${activeComponent === `${idx}.evm` ? "tx-active" : ""}`}

    const { state } = useContext(StateContext);

    const { activeComponent } = state;

    level = level++;

    const classList = []

    return (
        <ul style={{
            paddingLeft: `${level * 8}px`,
            borderLeft: '1px solid var(--white-a12)',
        }}>


            {/* <li
                role="link"
                tabIndex={0}
                onClick={(e) => action(e, id)}
            >
                {id}
            </li> */}

            <LinkBTN
                _click={clickAction}
                _classes={activeComponent === id ? [...classList, "active"] : classList}
                hint={`${id}`}
                id={id}
            >
                {id}
            </LinkBTN>

            {
                children.map((v, idx) => {
                    return <TreeBTN
                        key={idx}
                        id={v.id}
                        children={v.children}
                        clickAction={clickAction}
                        level={level}
                    />
                })
            }

        </ul>
    )
}

function Transaction({ idx }) {

    const { toggleCollapsed, addEVM, state } = useContext(StateContext);

    const { collapsed, linkBtns } = state;

    function handleCollapse(e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLLIElement>) {
        e.preventDefault();

        toggleCollapsed(idx);
    }

    let thisLinkBtn;
    for (const linkBtn of linkBtns) {
        if (linkBtn.id === `${idx}-0.evm`) {
            thisLinkBtn = linkBtn;
        }
    }

    console.log(thisLinkBtn);

    function handleLinkBtnClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) {
        e.preventDefault();

        addEVM(id, <EVM id={id} />)
    }

    return (
        <ul className={collapsed[idx] ? "tx-list-item" : "tx-list-item close"}>
            <LinkBTN
                _classes={[]}
                _click={handleCollapse}
                hint={'TEST'}
            >
                <span >
                    tx: {idx}
                </span>

            </ LinkBTN>
            {
                // thisLinkBtn.children.length ?

                //     :
                //     null
            }
            <TreeBTN
                id={thisLinkBtn.id}
                children={thisLinkBtn.children}
                clickAction={handleLinkBtnClick}
                level={1}
            />
        </ul>
    )
}

export function TxTree() {

    const { state } = useContext(StateContext);
    const { transactions, blockN } = state;


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

