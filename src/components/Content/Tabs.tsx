import React, { useContext, useRef, useState } from 'react';
import { IconButton } from '../shared/components/IconButton';
import { LinkBTN } from '../shared/components/LinkButton';
import { closeIconWithFontSize } from '../shared/icons';

import { StateContext } from '../State/StateCtx';


function Tab({ id }) {

    const { state, removeTab, setActiveCMP } = useContext(StateContext);

    const { activeComponent } = state;

    let classList = ["is-tab"];
    if (activeComponent === id) {
        classList = [...classList, "tab-active"];
    }

    function handleAcive(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault()
        console.log(id)
        setActiveCMP(id);
    }

    function handleRemoveTab(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation()
        removeTab(id);
    }

    return (

        <LinkBTN
            _click={handleAcive}
            _classes={classList}
            hint={`${id}`}
        >

            <span className="tab-title" >{id}</span>
            { /** "CLOSE" ICON BTN GOES HERE */}

            <IconButton
                _click={handleRemoveTab}
                icon={closeIconWithFontSize("12px")}
                _classes={["icon-btn-21"]}
                hintPosition={"bottom right"}
                hint="close window"
            />

        </LinkBTN>
    )
}

function TabList() {

    const { state } = useContext(StateContext);
    const { tabList } = state;

    const scrollRef = useRef(null);

    function handleScroll(e: React.WheelEvent<HTMLUListElement>) {
        scrollRef.current.scrollLeft += e.deltaY;
    }

    return (
        <ul
            id="tab-list"
            onWheel={e => handleScroll(e)}
            ref={scrollRef}
        >
            {
                tabList.map((id, i) => {
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