import React, { useRef, useState } from "react";

interface IconBtnInterface {
    hintStyle: React.CSSProperties,
}

interface IconBtnProps {
    _click: Function,
    icon: JSX.Element,
    hint: string,
    _classes: string[],
    hintPosition: "center left" | "top left" | "bottom left" | "center right" | "top right" | "bottom right"
}

export function IconButton({ _click, icon, hint, _classes, hintPosition }: IconBtnProps) {


    const [state, setState] = useState<IconBtnInterface>({
        hintStyle: {
            display: "none",
        },
    });

    function __click(e: any) {
        e.preventDefault();
        
        console.log(e);
        if (e.type === 'keyup') {
            const { code } = e;

            if (code === "Space" || code === "Enter") {
                _click(e);
            }
        }
    }


    let mouseIn = false;
    let _timeout;
    function mouseEnter(e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.FocusEvent<HTMLSpanElement, Element>) {
        e.preventDefault()

        mouseIn = true;
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        // @ts-ignore
        let btnRect = btn.current.getBoundingClientRect();
        const { left, right, top, bottom } = btnRect;

        _timeout = setTimeout(() => {
            if (mouseIn) {
                let _style: React.CSSProperties = {
                    position: "fixed",
                    display: `flex`,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    fontSize: "12px",
                    outline: "1px solid var(--white-a12)",
                    padding: "2px 4px",
                    background: "#000",
                }

                // left: `${right + 6}px`,
                // top: `${bottom + 6}px`,

                switch (hintPosition) {
                    case "center right":
                        _style = { ..._style, left: `${right + 6}px` };
                        break;
                    case "top right":
                        _style = {
                            ..._style,
                            left: `${right + 6}px`,
                            bottom: `${vh - bottom + 6 + btnRect.height}px`
                        };
                        break;
                    case "bottom right":
                        _style = { ..._style, left: `${right + 6}px`, top: `${bottom + 6}px` };
                        break;
                    case "center left":
                        _style = { ..._style, right: `${vw - right + 6 + btnRect.width}px` };
                        break;
                    case "top left":
                        _style = {
                            ..._style,
                            right: `${vw - right + 6 + btnRect.width}px`,
                            bottom: `${vh - bottom + 6 + btnRect.height}px`
                        };
                        break;
                    case "bottom left":
                        _style = {
                            ..._style,
                            right: `${vw - right + 6 + btnRect.width}px`,
                            top: `${bottom + 6}px`
                        };
                        break;
                    default:
                        _style = { ..._style, left: `${right + 6}px`, top: `${bottom + 6}px` }
                }

                setState({ hintStyle: _style });
            }
        }, 500)
    }


    function mouseLeave(e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.FocusEvent<HTMLSpanElement, Element>) {
        e.preventDefault();
        mouseIn = false;
        clearTimeout(_timeout);
        setState({ hintStyle: { display: "none" } });
    }

    const btn = useRef<HTMLSpanElement>(null);

    return (
        <span
            ref={btn}
            className={`icon-btn ${_classes.join(" ")}`}
            onClick={(e) => {
                mouseIn = false;
                clearTimeout(_timeout);
                _click(e);
            }}
            
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}

            // onFocus={(e) => mouseEnter(e)}
            // onBlur={(e) => mouseLeave(e)}
            role="link"
            tabIndex={0}
            onKeyUp={e => __click(e)}
        >
            {icon}
            {
                hint.length ?
                    <span
                        className="icon-btn-hint"
                        style={state.hintStyle}
                    >{hint}</span>
                    :
                    null
            }

        </span>
    )
}