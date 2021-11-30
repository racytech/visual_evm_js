import React, { useContext } from "react";
import { Components } from "./Content/Components";
import { Tabs } from "./Content/Tabs";
import { TxTree } from "./LeftSide/TxTree";
import { SearchBar } from "./LeftSide/SearchBar";
import { StateContext } from "./State/StateCtx";


function Header() {
    return (
        <div id="header">
            <h4>Erigon - transaction analysis</h4>
        </div>
    )
}

function LeftSide() {
    return (
        <div id="left-side">
            {
                /**
                 * display a tree
                 */
            }
            <SearchBar />
            <TxTree />
        </div>
    )
}


function Content() {

    const { state } = useContext(StateContext);
    const { activeComponent } = state;
    return (
        <div id="content">
            {
                activeComponent ?
                    <>
                        <Tabs />
                        <Components />
                    </>
                    :
                    null
                /**
                 * display tabs and tab corresponding content
                 * map(tab -> content)
                 * content = React Component
                 */
            }

        </div>
    )
}

export function Layout() {


    const layout = (
        <div id="layout">
            <Header />
            <div id="layout-wrapper">
                <LeftSide />
                <Content />
            </div>
        </div>
    )

    return layout
}