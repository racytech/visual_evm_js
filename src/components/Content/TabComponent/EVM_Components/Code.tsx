import React, { useRef, useState, useEffect } from "react";

const MAX_CODE_SIZE = 1000;

function splitIntoParts(byteCode: number[]): number[][] {
    console.log("Recalculating...");
    const bSize = byteCode.length;
    let codeParts: number[][] = []
    if (bSize > MAX_CODE_SIZE) {
        const rest = bSize % MAX_CODE_SIZE;
        const parts = Math.floor(bSize / MAX_CODE_SIZE); // how many parts?

        if (parts === 1) {
            codeParts = [byteCode];
        } else {
            let end = MAX_CODE_SIZE + rest;
            const firstPart = byteCode.slice(0, end); // the largest part
            codeParts = [firstPart];

            for (let i = 1; i < parts; i++) {
                codeParts.push(byteCode.slice(end, end + MAX_CODE_SIZE));
                end += MAX_CODE_SIZE;
            }
        }

    } else {
        codeParts = [byteCode]
    }

    return codeParts;
}

function preGenerete() {

    // let preGeneretedParts = [];
    // for (let i = 0; i < totalParts; i++) {
    //     const part = codeParts[i];
    //     let preGenPart = [];
    //     part.forEach((v, i) => {
    //         preGenPart.push(
    //             <li
    //                 key={i}
    //                 className={"code-col" + `${stepPointer === i ? " active" : ""}`}
    //             >
    //                 <span>{i}</span>
    //                 <span>{v}</span>
    //                 <span>{add0(v.toString(16))}</span>
    //             </li>
    //         )
    //     });
    //     preGeneretedParts.push(preGenPart);
    // }

}

function add0(hex: string) {
    if (hex.length === 1) return "0" + hex;
    return hex;
}

function codeCol(i, stepPointer, v, classes) {
    return (
        <li
            key={i}
            className={classes.join(" ")}
        >
            <span>{i}</span>
            <span>{v}</span>
            <span>{add0(v.toString(16))}</span>
        </li>
    )
}

interface CodeInterface {
    reached: number[]; // -1 - unreached, 1 - reached, 0 - pushArg
    totalParts: number;
    firstPartSize: number;
    preIndexes: number[];
    minDisplay: number;
    codeParts: number[][];
    isInit: boolean;
}

export function CodeComponent({ activeTab, byteCode, stepPointer }) {

    const [codeState, setCodeState] = useState<CodeInterface>({
        reached: new Array(byteCode.length).fill(-1),
        totalParts: 0,
        firstPartSize: 0,
        preIndexes: [],
        minDisplay: 0,
        codeParts: [],
        isInit: false,
    });

    useEffect(() => {

        const {
            reached, totalParts, firstPartSize,
            preIndexes, minDisplay, isInit,
        } = codeState


        if (!isInit) {
            const codeParts = splitIntoParts(byteCode);
            const _totalParts = codeParts.length;
            const firstPart = codeParts[0];
            const _firstPartSize = firstPart.length;

            let _preIndexes = new Array(totalParts).fill(0);
            _preIndexes[0] = firstPartSize;

            let startingIdx = firstPartSize;
            for (let idx = 1; idx < totalParts; idx++) {
                _preIndexes[idx] = startingIdx + MAX_CODE_SIZE;
                startingIdx += MAX_CODE_SIZE;
            }

            reached[stepPointer] = 1;

            let minIdx = 0;
            for (let i = 0; i < _preIndexes.length; i++) {
                let endIdx = _preIndexes[i];

                if (stepPointer < endIdx) {
                    minIdx = i;
                    break;
                }
            }

            setCodeState({
                ...codeState,
                reached,
                totalParts: _totalParts,
                firstPartSize: _firstPartSize,
                preIndexes: _preIndexes,
                codeParts,
                isInit: true,
                minDisplay: codeState.minDisplay < minIdx ? minIdx : codeState.minDisplay,
            });
        } else {
            // initalized state

            reached[stepPointer] = 1;

            let minIdx = 0;
            for (let i = 0; i < preIndexes.length; i++) {
                let endIdx = preIndexes[i];

                if (stepPointer < endIdx) {
                    minIdx = i;
                    break;
                }
            }

            setCodeState({
                ...codeState,
                reached,
                minDisplay: codeState.minDisplay < minIdx ? minIdx : codeState.minDisplay,
            })
        }




    }, [stepPointer]);

    const style: React.CSSProperties = activeTab == 0 ?
        {}
        :
        { display: "none" };

    const __bytecode = byteCode.slice(0, stepPointer + 32);

    const scrollRef = useRef(null);

    function handleScroll(e: React.WheelEvent<HTMLUListElement>) {
        scrollRef.current.scrollLeft += e.deltaY * 2;
    }

    const { firstPartSize, minDisplay } = codeState;

    return (
        <div className="lower-window-content" style={style}>
            <div className="code-window">
                <div className="pc-info">

                </div>
                <div className="code-self">

                    <div className="code-col">
                        <span>idx</span>
                        <span>byte</span>
                        <span>hex</span>
                    </div>

                    <ul
                        className="code-list"
                        ref={scrollRef}
                        onWheel={e => handleScroll(e)}
                    >
                        {
                            // __bytecode.map((v, i) => {
                            //     return (
                            //         <li
                            //             key={i}
                            //             className={"code-col" + `${stepPointer === i ? " active" : ""}`}
                            //         >
                            //             <span>{i}</span>
                            //             <span>{v}</span>
                            //             <span>{add0(v.toString(16))}</span>
                            //         </li>
                            //     )
                            // })

                            // preGeneretedParts.map((part, i) => {


                            //     return part.map((v, i) => {
                            //         return v;
                            //     })
                            // })

                        }

                        {

                            codeState.codeParts.map((part, idx) => {
                                if (idx <= minDisplay) {

                                    if (idx > 0) {
                                        let startingIdx = firstPartSize;
                                        return part.map((v, i) => {
                                            const classes = ["code-col"];
                                            let a_idx = startingIdx + i; // actual idx
                                            if (stepPointer === a_idx) classes.push("active");
                                            if (codeState.reached[a_idx] === 1) {
                                                classes.push("reached");
                                            }
                                            startingIdx += MAX_CODE_SIZE;
                                            return codeCol(a_idx, stepPointer, v, classes);
                                        })

                                    } else {
                                        return part.map((v, i) => {
                                            const classes = ["code-col"];
                                            if (stepPointer === i) classes.push("active");
                                            if (codeState.reached[i] === 1) {
                                                classes.push("reached");
                                            }

                                            return codeCol(i, stepPointer, v, classes);
                                        })
                                    }
                                }

                            })
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}