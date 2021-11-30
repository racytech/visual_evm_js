import React, { useContext, useState } from 'react';
import { StateContext } from '../State/StateCtx';


function Tab({ id }) {

    const { setActiveCmp, state } = useContext(StateContext);

    const { activeComponent } = state;

    let classList = ["is-tab"];
    if (activeComponent === id) {
        classList = [...classList, "tab-active"];
    }

    function handleAcive(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault()
        setActiveCmp(id);
    }

    return (
        <li
            className={classList.join(" ")}
            role="link" tabIndex={0}
            onClick={(e) => handleAcive(e)}
        >
            <span>{id}</span>
            { /** "CLOSE" ICON BTN GOES HERE */}
        </li>
    )
}

function TabList() {

    const { state } = useContext(StateContext);
    const { tabComponents } = state;


    return (
        <ul id="tab-list">
            {
                tabComponents.map((id, i) => {
                    return <Tab key={id} id={id} />
                })
            }
        </ul>
    )
}

export function Tabs() {

    return (
        <div id="content-tabs">
            <TabList />
        </div>
    )
}