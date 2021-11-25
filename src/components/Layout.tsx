import React from "react";
import { Components } from "./Content/Components";
import { Tabs } from "./Content/Tabs";
import { TxTree } from "./LeftSide/TxTree";
import { SearchBar } from "./LeftSide/SearchBar";


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
    return (
        <div id="content">
            {
                /**
                 * display tabs and tab corresponding content
                 * map(tab -> content)
                 * content = React Component
                 */
            }
            <Tabs />
            <Components />
        </div>
    )
}

export function Layout() {


    const layout = (
        <div id="layout">
            <LeftSide />
            <Content />
        </div>
    )

    return layout
}