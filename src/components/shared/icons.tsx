import React from "react";
import { render } from "react-dom";

export const ICON_SEARCH = (
    <span className="material-icons-outlined">
        search
    </span>
)

export const ICON_CHECK_MARK = (
    <span className="material-icons-outlined">
        done
    </span>
)

export function closeIconWithFontSize(fontSize: string) {
    return (
        <span className="material-icons-outlined" style={{ fontSize }}>
            close
        </span>
    )
}