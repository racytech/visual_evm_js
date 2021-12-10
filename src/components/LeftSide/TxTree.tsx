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

    const { state } = useContext(StateContext);

    const { activeComponent } = state;

    level = level++;

    const classList = []

    return (
        <ul style={{
            paddingLeft: `${level * 8}px`,
            borderLeft: '1px solid var(--white-a12)',
        }}>


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

function TxLink({ idx }) {

    const { toggleCollapsed, addEVM, state } = useContext(StateContext);

    const { collapsed, linkBtns, transactions } = state;

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

    function handleLinkBtnClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) {
        e.preventDefault();
        let n = "";
        for (let i = 0; i < id.length; i++) {
            if (isNaN(+id[i])) {
                break;
            }
            n += id[i];
        }

        // console.log(transactions[+n]);

        addEVM(id, <EVM id={id} tx={transactions[+n]} />);
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
    const { transactions, restFiles, blockN } = state;


    return (
        <div id="tx-tree">
            <BlockN blockN={blockN} />
            <ul id="tx-list">
                {

                    transactions.length > 0 ?

                        transactions.map((v, i) => {
                            return <TxLink
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


                {
                    restFiles.length > 0 ?

                        restFiles.map((v, i) => {
                            return (
                                <LinkBTN
                                    key={v}
                                    _click={() => { }}
                                    _classes={[]}
                                    hint={""}
                                >
                                    {v}
                                </LinkBTN>
                            )
                        })

                        :
                        null
                }
            </ul>
        </div>
    )
}

