import React from "react";

export interface SwitchInterface {
    tabs: string[],
    switcher: Function,
    activeTab: number,
}

// switches tabs in lower part of the UI
export function Switcher({ tabs, switcher, activeTab }: SwitchInterface) {

    function action(e: React.MouseEvent<HTMLLIElement, MouseEvent>, idx: number) {
        e.preventDefault()
        switcher(idx);
    }


    return (
        <ul className="switcher">

            {
                tabs.map((v, i) => {
                    return (
                        <li
                            className={"switcher-tab" + `${activeTab === i ? " tab-active" : ""}`}
                            key={i}
                            onClick={(e) => action(e, i)}
                        >
                            <h6>{v}</h6>
                        </li>
                    )
                })
            }

        </ul>
    )

}