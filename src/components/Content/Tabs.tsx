import React, { useContext, useState } from 'react';
import { IconButton } from '../shared/components/IconButton';
import { closeIconWithFontSize } from '../shared/icons';

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

    function removeTab(e) {
        e.preventDefault();
        console.log("Remove tab")
    }

    return (
        <li
            className={classList.join(" ")}
            role="link" tabIndex={0}
            onClick={(e) => handleAcive(e)}
        >
            <span className="tab-title" >{id}</span>
            { /** "CLOSE" ICON BTN GOES HERE */}

            <IconButton
                action={removeTab}
                icon={closeIconWithFontSize("12px")}
                _classes={["icon-btn-21"]}
                hintPosition={"bottom right"}
                hint="close window"
            />
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