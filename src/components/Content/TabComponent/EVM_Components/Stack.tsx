import React from "react";

const hex_16 = [
    "0", "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "A", "B",
    "C", "D", "E", "F",
]

function randomHexStr() {
    let hex = "";
    let max_size = Math.floor(Math.random() * 32);

    while (hex.length < max_size) hex += hex_16[Math.floor(Math.random() * 16)];

    return "0x" + hex;
}

function generateDummyStack(size: number) {
    let stack = [];

    for (let i = 0; i < size; i++)  stack.push(randomHexStr());

    return stack;
}

// this is UI stack, it has nothing to do with stack data structure
// 'execSteps' param are all execution steps at current step_pointer
export function StackComponent({ execSteps }) {

    const dummyStack = generateDummyStack(100);

    const last_step = execSteps[execSteps.length - 1];
    const stack = last_step.stack.getStack();
    console.log(stack);
    return (

        <div className="stack">
            <div className="stack-item-title">
                <h6>stack</h6>
                <span className="stack-labels">
                    <span>&#8470;</span>
                    <span>idx</span>
                    <span>value</span>
                </span>
            </div>
            {
                stack.length ?

                    <ul className="stack-items">

                        {
                            stack.map((hex, i) => {
                                return (
                                    <li key={i} className="stack-item">
                                        <span className="stack-count">+</span>
                                        <span className="stack-idx">{i}</span>
                                        <span className="stack-value">{hex}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    :
                    null
            }


        </div>


    )
}