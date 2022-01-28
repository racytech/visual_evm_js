import React from "react";




export function ReadsComponent({ activTab }) {

    const style: React.CSSProperties = activTab == 1 ?
        {}
        :
        { display: "none" }

    return (
        <div className="lower-window-content" style={style}>
            is reads component
        </div>
    )
}

export function WritesComponent({ activTab }) {

    const style: React.CSSProperties = activTab == 2 ?
        {}
        :
        { display: "none" }

    return (
        <div className="lower-window-content" style={style}>
            is writes component
        </div>
    )
}

export function Code({ }) {
    return (
        <div>

        </div>
    )
}