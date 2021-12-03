import React, { useRef, useState } from "react";

interface LinkBtnInterface {
    hintStyle: React.CSSProperties,
}


interface LinkBtnProps {
    _classes: string[];
    _click: Function;
    hint: string;
    id?: string;
    children?: any;
}

export function LinkBTN({ _classes, _click, hint, id, children }: LinkBtnProps) {

    const [state, setState] = useState<LinkBtnInterface>({
        hintStyle: {
            display: "none",
        },
    });

    const linkRef = useRef(null);

    let mouseIn = false;
    let _timeout;
    function mouseEnter(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        e.preventDefault()

        mouseIn = true;
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        // @ts-ignore
        let rect = linkRef.current.getBoundingClientRect();
        const { left, right, top, bottom } = rect;

        // console.log(rect);
    }

    function mouseLeave(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {

    }

    function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        if (id) {
            _click(e, id);
        } else {
            _click(e);
        }

    }

    return (
        <li
            ref={linkRef}
            role="link"
            tabIndex={0}
            className={[..._classes, "link-btn"].join(" ")}
            onClick={e => handleClick(e)}
            onMouseEnter={e => mouseEnter(e)}
            onMouseLeave={e => mouseLeave(e)}
        >
            {children}
        </li>
    )

}