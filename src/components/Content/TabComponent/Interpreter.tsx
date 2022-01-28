import React, { useContext, useEffect, useRef, useState } from "react";
import { Memory } from "../../../evm/memory";
import { INSTRUCTIONS, OPCODES } from "../../../evm/opcodes";
import { Stack } from "../../../evm/stack";
import { rpc_client } from "../../../lib/rpc_client";
import { Transaction } from "../../../lib/types";
import { strHexToBytes, toEvenLength } from "../../../lib/utils";
import { StateContext } from "../../State/StateCtx";
import { ReadsComponent, WritesComponent } from "./EVM_Components/LowerWindows";
import { StackComponent } from "./EVM_Components/Stack";
import { Switcher } from "./EVM_Components/Swticher";
import { MemoryComponent } from "./EVM_Components/Memory";
import { Contract } from "../../../evm/contract";
import { CodeComponent } from "./EVM_Components/Code";
import { ICON_CHECK_MARK } from "../../shared/icons";

const CHECK_MARK = "\u2713";

interface InterpreterProps {
    id: string;
    contract: Contract
}

type execStep = { // each execution step has its own props
    previousPC: number;
    stack: Stack;
    memory: Memory;
    // pc instuction number that JUMP/JUMPI landed to TODO 
    // this is required to test if we are in the loop
    block_first?: number;
}

type txType = "message call" | "contract creation";

interface InStateInterface { // Interpreter State Interface
    tx: Transaction | null;
    type: txType;
    currentValidPC: number;
    step_pointer: number;
    byteCode: number[];
    // keeps track of the stack, memory and other unique props at each pc/step
    execOrder: { [key: number]: execStep[] }; // key in this case is pc
    execCount: { [key: number]: number };

    tabs: string[]; // names of the lower part tabs, TODO
    activeTab: number; // currently active tab in Interpreter component, Memory by default


    ready: boolean;

    contract: Contract;
}

function newExecStep(prev: number, stack: Stack, memory: Memory, block_first: number): execStep {
    return {
        previousPC: prev,
        stack,
        memory,
        block_first,
    }
}


export function Interpreter({ id, contract }: InterpreterProps) {

    const { state } = useContext(StateContext);
    const { activeComponent, blockHeader } = state;


    const [inState, setInState] = useState<InStateInterface>({
        tx: null,
        type: "message call",
        currentValidPC: -1, // points to a valid executable step
        step_pointer: -1, // points to any existing step
        byteCode: [],
        execOrder: {},
        execCount: {},
        tabs: ["code", "memory"],
        activeTab: 0,
        ready: false,
        contract,
    });


    function call(caller, addr_to, input, value) {
        let validPC = 0;
        let step_pointer = 0;

        rpc_client.getCode(addr_to, blockHeader.hash)
            .then(data => {
                console.log(data.result.length);
                const strHexCode = data.result;
                const byteCode = strHexToBytes(strHexCode);
                // console.log(byteCode.length, "BYTECODE");
                contract.setCode(toEvenLength(strHexCode));
                setInState({
                    ...inState,
                    // tx,
                    type: "message call",
                    currentValidPC: validPC,
                    step_pointer,
                    byteCode,
                    execOrder: {
                        ...inState.execOrder,
                        [step_pointer]: [{
                            previousPC: -1,
                            stack: new Stack(),
                            memory: new Memory(),
                        }]
                    },

                    ready: true,
                    contract,
                });
            })
    }

    function create(caller, code, value) {
        let validPC = 0;
        let step_pointer = 0;

        const byteCode = strHexToBytes(code);
        contract.setCode(toEvenLength(code));
        setInState({
            ...inState,
            // tx,
            type: "contract creation",
            currentValidPC: validPC,
            step_pointer,
            byteCode,
            execOrder: {
                ...inState.execOrder,
                [step_pointer]: [{
                    previousPC: -1,
                    stack: new Stack(),
                    memory: new Memory(),
                }]
            },

            ready: true,
            contract,
        });
    }

    useEffect(() => {
        // 6156190
        const [from, to, data, value] = contract.getAll();
        let type: txType = "contract creation"
        if (to) type = "message call";
        console.log("TX TYPE: ", type)
        if (type === "message call") call(from, to, data, value);
        else if (type === "contract creation") create(from, data, value);
        else throw `Unexpected tx type: ${type}`;



        // if (type === "message call") {
        //     rpc_client.getCode(tx.to, tx.blockHash)
        //         .then(data => {
        //             console.log(data);
        //             const strHexCode = data.result;
        //             const byteCode = strHexToBytes(strHexCode);
        //             // console.log(byteCode.length, "BYTECODE");
        //             setInState({
        //                 ...inState,
        //                 tx,
        //                 type: type,
        //                 currentValidPC: validPC,
        //                 step_pointer,
        //                 byteCode,
        //                 execOrder: {
        //                     ...inState.execOrder,
        //                     [step_pointer]: [{
        //                         previousPC: -1,
        //                         stack: new Stack(),
        //                         memory: new Memory(),
        //                     }]
        //                 },

        //                 ready: true,
        //             });
        //         })
        // }

        // if (type === "contract creation") {
        //     const byteCode = strHexToBytes(tx.input);
        //     setInState({
        //         ...inState,
        //         tx,
        //         type: type,
        //         currentValidPC: validPC,
        //         step_pointer,
        //         byteCode,
        //         execOrder: {
        //             ...inState.execOrder,
        //             [step_pointer]: [{
        //                 previousPC: -1,
        //                 stack: new Stack(),
        //                 memory: new Memory(),
        //             }]
        //         },

        //         ready: true,
        //     });
        // }


    }, [])


    // hexInputToByteInput(input);

    let _style = activeComponent === id ?
        {}
        :
        { display: "none" };


    function execute() {
        // check if execution is in order
        // e.g if currentValidPc is calling this function

        // we need to know the previous exec step
        // so we can take its stack and memory

        // execute the instruction 

        const { currentValidPC, execOrder, byteCode, tx } = inState;

        // refers to the previous PC
        const caller = currentValidPC;

        const execHistory = execOrder[currentValidPC]; // how many times we've been at this PC

        const lastExecution: execStep = execHistory[execHistory.length - 1];
        const { stack, memory } = lastExecution;

        const opcode = byteCode[currentValidPC];

        const instruction = INSTRUCTIONS[opcode] // get an instruction
        /*** THIS INSTRUCTIONS CREATE NEW EXEC FRAME (NEW INTEPRETER WINDOW) ***/
        if (opcode === OPCODES.CREATE) { }
        if (opcode === OPCODES.CALL) { }
        if (opcode === OPCODES.CALLCODE) { }
        if (opcode === OPCODES.DELEGATECALL) { }
        if (opcode === OPCODES.CREATE2) { }
        if (opcode === OPCODES.STATICCALL) { }

        if (instruction.mem_func) {
            const [to_resize, err, msg] = instruction.mem_func(stack);
            if (err) {
                // TODO
                throw msg;
            }
            if (to_resize > 0) memory.resize(to_resize);
        }


        // it shoud take stack, memory, bytecode, pc and all what is necessary params for execution,
        // execute the instruction and return nextValidPC and other stuff
        instruction.exec_func(currentValidPC, stack, memory, contract, blockHeader, byteCode)
            .then((nextValidPC) => {
                // set new state here
                const existingStepAtNext = inState.execOrder[nextValidPC] || [];
                const execCountAtPC = inState.execCount[currentValidPC];
                setInState({
                    ...inState,
                    currentValidPC: nextValidPC,
                    step_pointer: nextValidPC,
                    execOrder: {
                        ...inState.execOrder,
                        [nextValidPC]: [
                            ...existingStepAtNext,
                            newExecStep(caller, stack.copy(), memory.copy(), 0)
                        ],
                    },
                    execCount: {
                        ...inState.execCount,
                        [currentValidPC]: -~execCountAtPC,
                    }
                })
            })


        /**
         * We need to feed opcode, lastExecution's stack and mamory to jump_table
         * jump_table maps opcode to corresponding operation, calls this operation
         * and returns new stack and memory
         */


        // if (lastExecution.caller == - 1) { // means it is the first step in exec order


        // } else { // not the first step in exec order

        // }

        // // temperary code
        // if (opcode >= OPCODES.PUSH1 && opcode <= OPCODES.PUSH32) {
        //     let takes = opcode - 0x5F;
        //     nextValidPC += 1;
        //     nextValidPC += takes
        // } else if (opcode === OPCODES.JUMP || opcode === OPCODES.JUMPI) {
        //     console.log("is JUMPI")
        // } else {
        //     nextValidPC++;
        // }


        // const exec_step: execStep = {
        //     previousPC: caller,
        //     stack: new Stack(),
        //     memory: new Memory(),
        // }

        // inState[nextValidPC] ?
        //     setInState({
        //         ...inState,
        //         currentValidPC: nextValidPC,
        //         step_pointer: nextValidPC,
        //         execOrder: {
        //             ...inState.execOrder,
        //             [nextValidPC]: inState[nextValidPC].push(exec_step)
        //         }
        //     })
        //     :
        //     setInState({
        //         ...inState,
        //         currentValidPC: nextValidPC,
        //         step_pointer: nextValidPC,
        //         execOrder: {
        //             ...inState.execOrder,
        //             [nextValidPC]: [exec_step]
        //         }
        //     })
    }


    function setTab(idx: number) {
        setInState({ ...inState, activeTab: idx })
    }

    function handleKeyDown(e: KeyboardEvent) {
        e.preventDefault()
        const { currentValidPC, execOrder, step_pointer } = inState;
        const arr = Object.keys(execOrder)

        if (e.code === "ArrowUp") {
            // decrease step_pointer
            if (arr.length > 1) {
                let prev = step_pointer;
                for (let i = 0; i < arr.length; i++) {
                    if (+arr[i] === step_pointer && i !== 0) {
                        prev = +arr[i - 1];
                    }
                }
                setInState({ ...inState, step_pointer: prev });
            }

        }

        if (e.code === "ArrowDown") {
            // increase step_pointer
            if (arr.length > 1) {
                let next = step_pointer;
                for (let i = 0; i < arr.length; i++) {
                    if (+arr[i] === step_pointer && i < arr.length - 1) {
                        next = +arr[i + 1];
                    }
                }
                setInState({ ...inState, step_pointer: next });
            }
        }

        if (e.code === "Space") {
            if (step_pointer === currentValidPC) {
                execute();
            }
        }
    }

    function setFocused(e: React.MouseEvent<HTMLLIElement, MouseEvent>, step: number) {
        e.preventDefault()
        setInState({ ...inState, step_pointer: step });
    }

    const { step_pointer, execOrder } = inState;
    const execSteps = execOrder[step_pointer];

    const firstRow = [ // ["content", "meaning/hint", "classes"]
        ["c", "number of times instruction at this program counter was executed", "count"],
        ["pc", "program counter", "pc"],
        ["hex", "hexadecimal value of an instruction", "hex"],
        ["opcode", "mnemonic (memorizable code name)", "opcode"],
        ["pop", "number of items this instruction pops out of the stack", "pop"],
        ["push", "number of items this instruction pushes onto the stack", "push"],

        ["h", "(halts) indicates whether this instruction should halt further execution", "bool halts"],
        ["rev", "(reverts) determines whether this instruction reverts state (implicitly halts)", "bool reverts"],
        ["ret", "(returns) determines whether this instruction sets the return data content", "bool returns"],
        ["r", "(reads) determines whether this instruction reads the state", "bool reads"],
        ["w", "(writes) determines whether this a state modifying instruction", "bool writes"],

        ["j", "(jumps) indicates whether the program counter should not increment", "bool jumps"],
        ["nf", "(new frame) indicates whether this instruction creates new execution frame", "bool n_frame"],
        // has to be leveled hint with more explanation

    ]

    return (
        <div className="evm-cmp" style={_style}>

            {
                id === activeComponent && inState.ready ?
                    <>
                        <div className="upper-part" >

                            <div className="exec-part">

                                <div className="row-info-wrap">
                                    {
                                        firstRow.map((v, i) => {
                                            return (
                                                <span
                                                    title={v[1]}
                                                    className={v[2]}
                                                    key={i}
                                                >{v[0]}</span>
                                            )
                                        })
                                    }
                                </div>


                                <ExecSteps
                                    id={id}
                                    execOrder={inState.execOrder}
                                    execCount={inState.execCount}
                                    pointer={inState.step_pointer}
                                    byteCode={inState.byteCode}
                                    validPC={inState.currentValidPC}
                                    keyDownHandler={handleKeyDown}
                                    execute={execute}
                                    setFocused={setFocused}
                                />

                            </div>

                            <div className="right-part">

                                <div className="right-window">
                                    <StackComponent execSteps={execSteps} />
                                </div>

                            </div>

                        </div>

                        <div className="lower-part">

                            <div className="lower-tool-bar">
                                <Switcher
                                    tabs={inState.tabs}
                                    switcher={setTab}
                                    activeTab={inState.activeTab}
                                />
                            </div>

                            <div className="lower-window">
                                <CodeComponent
                                    activeTab={inState.activeTab}
                                    byteCode={inState.byteCode}
                                    stepPointer={inState.step_pointer}
                                />
                                <MemoryComponent
                                    activeTab={inState.activeTab}
                                    execSteps={execSteps}
                                />
                                {/* <ReadsComponent activTab={inState.activeTab} />
                                <WritesComponent activTab={inState.activeTab} /> */}
                            </div>

                        </div>
                    </>
                    :
                    null
            }

        </div>
    )
}

function ExecSteps({ id, execOrder, execCount, keyDownHandler, pointer, validPC, byteCode, execute, setFocused }) {


    const hasCode = byteCode.length > 0;
    console.log(execOrder)
    const execSteps = (
        <ul className="exec-steps" role={"list"}>
            {
                Object.keys(execOrder)
                    .map((v, i) => {
                        return (
                            <ExecStep
                                key={i}
                                v={v}
                                i={i}
                                pointer={pointer}
                                validPC={validPC}
                                byteCode={byteCode}
                                handle={keyDownHandler}
                                focus={pointer === +v}
                                setFocused={setFocused}
                                execCountAtPC={execCount[v]}
                            />

                        )
                    })
            }

        </ul>
    );

    const msg = (
        <div>It appears to be this transaction has no bytecode to execute</div>
    )

    if (hasCode) return execSteps;

    return msg;
}


function ExecStep({ v, i, pointer, validPC, byteCode, handle, focus, setFocused, execCountAtPC }) {

    function getArgs(idx: number): "-" | string {
        let opcode = byteCode[idx]
        let result = "0x";
        if (opcode >= OPCODES.PUSH1 && opcode <= OPCODES.PUSH32) {
            let takes = opcode - 0x5F;
            for (let i = idx + 1; i <= idx + takes; i++) {
                let byte = byteCode[i];
                let hex = byte.toString(16);
                if (hex.length < 2) hex = "0" + hex;
                result += hex;
            }

            // result = result.join("");
            return result
        }

        return "-";
    }

    const myRef = useRef(null);

    useEffect(() => {
        if (myRef && myRef.current && focus) {
            console.log("FOCUS")
            myRef.current.focus();
            myRef.current.addEventListener("keydown", handle);
        }

        return () => {
            if (myRef && myRef.current) {
                myRef.current.removeEventListener("keydown", handle);
            }
        }
    }, [pointer])


    const B_IDX = byteCode[+v]; // byte index
    return (
        <li
            className={`step ${+v === validPC ? "valid" : ""}`
            }
            key={i}
            role={"listitem"}
            tabIndex={+v === pointer ? 0 : -1}
            ref={myRef}
            onClick={(e) => setFocused(e, +v)}
        >
            <span className="count">{execCountAtPC ? execCountAtPC : 0}</span>
            <span className="pc">{+v}</span>
            <span className="hex">{`0x${byteCode[+v].toString(16)}`}</span>
            <span className="opcode">{INSTRUCTIONS[B_IDX].name}</span>
            <span className="pop">{INSTRUCTIONS[B_IDX].num_pops}</span>
            <span className="push">{INSTRUCTIONS[B_IDX].num_pushes}</span>

            <span className="bool">{INSTRUCTIONS[B_IDX].halts ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].reverts ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].returns ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].reads ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].writes ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].jumps ? ICON_CHECK_MARK : ""}</span>
            <span className="bool">{INSTRUCTIONS[B_IDX].new_frame ? ICON_CHECK_MARK : ""}</span>
        </li>
    )
}