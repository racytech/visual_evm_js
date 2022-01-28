import React, { useRef } from "react";
import { MEM_LIMIT_SIZE } from "../../../../evm/memory";

export function MemoryComponent({ activeTab, execSteps }) {

    const style: React.CSSProperties = activeTab == 1 ?
        {}
        :
        { display: "none" };


    const last_step = execSteps[execSteps.length - 1];
    const memory = last_step.memory.getMemory();

    let unoccupied_cells = 0;
    for (const n of memory) {
        if (n === -1) unoccupied_cells += 1;
    }

    const scrollRef = useRef(null);

    function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
        scrollRef.current.scrollLeft += e.deltaY * 2;
    }

    return (
        <div className="lower-window-content" style={style}>
            <div className="mem-window">

                <div className="mem-nav">
                    Recent and stuff
                </div>


                <div className="mem-self">

                    <div className="mem-title">
                        <span>idx</span>
                        <span>byte</span>
                        <span>hex</span>
                    </div>


                    <div className="mem-lists"
                        onWheel={e => handleScroll(e)}
                        ref={scrollRef}>

                        <ul className="mem-idx-row">
                            {
                                memory.map((v, i) => {
                                    return <li key={i}>{i}</li>
                                })
                            }
                        </ul>

                        <ul className="mem-byte-row">
                            {
                                memory.map((v, i) => {
                                    let val = v !== -1 ? v : "-";
                                    return <li key={i}>{val}</li>
                                })
                            }
                        </ul>

                        <ul className="mem-hex-row">
                            {
                                memory.map((v, i) => {
                                    let val = v !== -1 ? v.toString(16) : "-";
                                    return <li key={i}>{val}</li>
                                })
                            }
                        </ul>
                    </div>


                </div>

                <div className="mem-info">

                    <div className="mem-info-wrap">
                        <span className="mem-info-title">memory size:</span>
                        <span className="mem-info-content">{memory.length}</span>
                    </div>

                    <div className="mem-info-wrap">
                        <span className="mem-info-title">unoccupied:</span>
                        <span className="mem-info-content">{unoccupied_cells}</span>
                    </div>

                    <div className="mem-info-wrap">
                        <span className="mem-info-title">max allowed size:</span>
                        <span className="mem-info-content">{MEM_LIMIT_SIZE}</span>
                    </div>

                </div>

            </div>
        </div>
    )
}