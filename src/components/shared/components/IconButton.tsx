import React from "react";


export function IconButton({ action, icon, hint, _classes }: any) {

    function __click(e: any) {
        e.preventDefault();

        if (e.type === 'keyup') {
            const { keyCode } = e;

            if (keyCode === 13 || keyCode === 32) {
                action(e);
            }
        }
    }

    return (
        <span className={`icon-btn ${_classes.join(" ")}`} onClick={(e) => action(e)}
            role="link"
            tabIndex={0}
            onKeyUp={e => __click(e)}
        >
            {icon}
            {
                hint.length ?
                    <span className={`icon-btn-hint`}>{hint}</span>
                    :
                    null
            }

        </span>
    )
}