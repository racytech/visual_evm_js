import React, { useContext, useEffect, useState } from "react";
import { Memory } from "../../../evm/memory";
import { OPERATIONS, OPCODES } from "../../../evm/opcodes";
import { Stack } from "../../../evm/stack";
import { rpc_client } from "../../../lib/rpc_client";
import { Transaction } from "../../../lib/types";
import { strHexToBytes } from "../../../lib/utils";
import { StateContext } from "../../State/StateCtx";


interface EVMProps {
    id: string;
    tx: Transaction;
}



type execStep = { // each execution step has its own props
    caller: number;
    stack: Stack;
    memory: Memory;
}

type txType = "message call" | "contract creation";

interface EVMStateInterface {
    tx: Transaction | null;
    type: txType;
    currentValidPC: number;
    step_pointer: number;
    byteCode: number[];
    // keeps track of the stack, memory and other unique props at each pc/step
    execOrder: { [key: number]: execStep[] } // key in this case is pc
}

export function EVM({ id, tx }: EVMProps) {

    const { state } = useContext(StateContext);
    const { activeComponent } = state;


    const [evmState, setEVMState] = useState<EVMStateInterface>({
        tx: null,
        type: "message call",
        currentValidPC: -1, // points to a valid executable step
        step_pointer: -1, // points to any existing step
        byteCode: [],
        execOrder: {},
    });

    useEffect(() => {


        let type: txType = "contract creation"
        if (tx.to) {
            type = "message call";
        }

        let validPC = 0;
        let step_pointer = 0;


        rpc_client.getCode(tx.to, tx.blockHash)
            .then(data => {
                const strHexCode = data.result;
                const byteCode = strHexToBytes(strHexCode);



                setEVMState({
                    ...evmState,
                    tx,
                    type: type,
                    currentValidPC: validPC,
                    step_pointer,
                    byteCode,
                    execOrder: {
                        ...evmState.execOrder,
                        [step_pointer]: [{
                            caller: -1,
                            stack: new Stack(),
                            memory: new Memory(),
                        }]
                    }
                });
            })

    }, [])


    // hexInputToByteInput(input);

    let _style = activeComponent === id ?
        {}
        :
        { display: "none" };

    const __byteCode = evmState.byteCode;

    function getArgs(idx: number): "-" | string {
        let opcode = __byteCode[idx]
        let result: any = ["0x"];
        if (opcode >= OPCODES.PUSH1 && opcode <= OPCODES.PUSH32) {
            let takes = opcode - 0x5F;
            for (let i = idx + 1; i <= idx + takes; i++) {
                let byte = __byteCode[i];
                result.push(byte.toString(16))
            }

            result = result.join("");
            return result
        }

        return "-";
    }


    function execute(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.preventDefault()
        // check if execution is in order
        // e.g if currentValidPc is calling this function

        // we need to know the previous exec step
        // so we can take its stack and memory

        // execute the instruction 

        const { currentValidPC, execOrder, byteCode } = evmState;

        const caller = currentValidPC; // will be set to the next exec step

        const execHistory = execOrder[currentValidPC]; // how many times we've been at this PC
        const lastExecution: execStep = execHistory[execHistory.length - 1];


        const opcode = byteCode[currentValidPC];

        let nextValidPC = currentValidPC;
        // if (lastExecution.caller == - 1) { // means it is the first step in exec order


        // } else { // not the first step in exec order

        // }

        // temperary code
        if (opcode >= OPCODES.PUSH1 && opcode <= OPCODES.PUSH32) {
            let takes = opcode - 0x5F;
            nextValidPC += 1;
            nextValidPC += takes
        } else if (opcode === OPCODES.JUMP || opcode === OPCODES.JUMPI) {
            console.log("is JUMPI")
        } else {
            nextValidPC++;
        }

        // lastExecution.caller == - 1? means it the first step in exec order
        // lastExecution.stack
        // lastExecution.memory
        const exec_step: execStep = {
            caller: caller,
            stack: new Stack(),
            memory: new Memory(),
        }

        console.log(caller, nextValidPC, exec_step)

        evmState[nextValidPC] ?
            setEVMState({
                ...evmState,
                currentValidPC: nextValidPC,
                execOrder: {
                    ...evmState.execOrder,
                    [nextValidPC]: evmState[nextValidPC].push(exec_step)
                }
            })
            :
            setEVMState({
                ...evmState,
                currentValidPC: nextValidPC,
                execOrder: {
                    ...evmState.execOrder,
                    [nextValidPC]: [exec_step]
                }
            })

        // after execution is complete we need to reset the currentValidPC
    }

    return (
        <div className="evm-cmp" style={_style}>

            <div className="upper-part">

                <div className="exec-part">

                    <ul className="exec-steps">
                        <div className="row-info-wrap">
                            <li className="row-info step">
                                <span>pc</span>
                                <span>hex</span>
                                <span>opcode</span>
                                <span>arguments</span>
                                <span></span>
                            </li>
                        </div>


                        {
                            Object.keys(evmState.execOrder)
                                .map((v, i) => {
                                    return (
                                        <li className="step" key={i}>
                                            <span>{+v}</span>
                                            <span>{`0x${__byteCode[+v].toString(16)}`}</span>
                                            <span>{OPERATIONS[__byteCode[+v]].name}</span>
                                            <span>{getArgs(+v)}</span>
                                            <span>
                                                <span onClick={(e) => execute(e)}>+</span>

                                            </span>
                                        </li>
                                    )
                                })
                        }

                    </ul>

                </div>

                <div className="right-part">

                    <div className="right-window">

                    </div>

                    {/* <div className="right-tool-bar">

                    </div> */}

                </div>

            </div>

            <div className="lower-part">

                <div className="lower-tool-bar">

                </div>

                <div className="lower-window">

                </div>

            </div>

        </div>
    )
}