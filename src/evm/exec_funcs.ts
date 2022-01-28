import { BlockHeader, Transaction } from "../lib/types";
import { Memory, memoryMStore } from "./memory";
import { Stack } from "./stack";
import { u256_client } from "../lib/u256_client";
import { bytesToHex, getData, toEvenLength } from "../lib/utils";
import { Contract } from "./contract";
import { rpc_client } from "../lib/rpc_client";

export interface exec_result {
    nextPC: number, // next program counter
}

/* -------------- 0s: Stop and Arithmetic Operations -------------- */

export async function STOP(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function ADD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.ADD(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function MUL(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.MUL(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SUB(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SUB(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function DIV(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.DIV(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SDIV(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.DIV(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function MOD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.MOD(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SMOD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SMOD(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function ADDMOD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y, z] = [stack.pop(), stack.pop(), stack.peek()];
    const { result } = await u256_client.MULMOD(x, y, z);
    stack.set_last(result);
    return pc + 1;
}

export async function MULMOD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y, z] = [stack.pop(), stack.pop(), stack.peek()];
    const { result } = await u256_client.MULMOD(x, y, z);
    stack.set_last(result);
    return pc + 1;
}

export async function EXP(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.EXP(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SIGNEXTEND(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SIGNEXTEND(x, y);
    stack.set_last(result);
    return pc + 1;
}

/* -------------- 10s: Comparison & Bitwise Logic Operations -------------- */

export async function LT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.LT(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function GT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.GT(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SLT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SLT(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SGT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SGT(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function EQ(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.EQ(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function ISZERO(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const x = stack.peek();
    const { result } = await u256_client.ISZERO(x);
    stack.set_last(result);
    return pc + 1;
}

export async function AND(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.AND(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function OR(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.OR(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function XOR(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.XOR(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function NOT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const x = stack.peek();
    const { result } = await u256_client.NOT(x);
    stack.set_last(result);
    return pc + 1
}

export async function BYTE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.BYTE(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SHL(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SHL(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SHR(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SHR(x, y);
    stack.set_last(result);
    return pc + 1;
}

export async function SAR(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [x, y] = [stack.pop(), stack.peek()];
    const { result } = await u256_client.SAR(x, y);
    stack.set_last(result);
    return pc + 1;
}

/* -------------- 20s: SHA3 -------------- */

export async function SHA3(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    // TODO
    const [offset, size] = [stack.pop(), stack.peek()];
    memory.getVal(offset, size);
    // const { result } = await u256_client.SHA3(x, y);
    // stack[stack.last_idx()] = result;
    return pc + 1;
}

/* -------------- 30s: Environmental Information -------------- */

export async function ADDRESS(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push(contract.getSelf())
    return pc + 1;
}

export async function BALANCE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    // NOTES:
    // 1. this reads the accaunt's state, therefor add this to access list
    // 2. make this in rpc_client (getBalance), see eth_getBalance command in
    // https://github.com/ledgerwatch/erigon/tree/devel/cmd/rpcdaemon#rpc-implementation-status
    const address = stack.peek();
    const { result } = await rpc_client.getBalance(address, blockHeader.hash);
    stack.set_last(result);
    return pc + 1;
}

export async function ORIGIN(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push(contract.getOrigin());
    return pc + 1;
}

export async function CALLER(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push(contract.getCaller());
    return pc + 1;
}

export async function CALLVALUE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push(contract.getValue());
    return pc + 1;
}

export async function CALLDATALOAD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const offset = stack.peek();
    let data = getData(contract.getData(), offset, "0x" + (32).toString(16));
    stack.push(data);
    return pc + 1;
}

export async function CALLDATASIZE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {

    let data = contract.getData().slice(2) // always even length, remove 0x part
    let size = "0x" + (data.length / 2).toString(16);
    stack.push(toEvenLength(size))

    return pc + 1;
}

export async function CALLDATACOPY(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [memOffset, dataOffset, size] = stack.popN(3);
    let data = getData(contract.getData(), dataOffset, size);
    memory.store(memOffset, size, data);
    return pc + 1;
}

export async function CODESIZE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const size = "0x" + (byteCode.length).toString(16);
    stack.push(size);
    return pc + 1;
}

export async function CODECOPY(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [memOffset, codeOffset, size] = stack.popN(3);
    let data = getData(contract.getCode(), codeOffset, size);
    memory.store(memOffset, size, data);
    return pc + 1;
}

export async function GASPRICE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const { result } = await rpc_client.getGasPrice(); // TODO
    stack.push(result);
    return pc + 1;
}

export async function EXTCODESIZE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const address = stack.peek();
    const { result } = await rpc_client.getCode(address, blockHeader.hash); // TODO
    let size = (toEvenLength(result).length - 2) / 2
    stack.set_last("0x" + size.toString(16));
    return pc + 1;
}

export async function EXTCODECOPY(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [address, memOffset, codeOffset, size] = stack.popN(4);
    const code = await (await rpc_client.getCode(address, blockHeader.hash)).result; // TODO
    const codeCopy = getData(code, codeOffset, size);
    memory.store(memOffset, size, codeCopy);
    return pc + 1;
}

export async function RETURNDATASIZE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    // todo
    return pc;
}

export async function RETURNDATACOPY(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function EXTCODEHASH(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

/* -------------- 40s: Block Information -------------- */

export async function BLOCKHASH(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function COINBASE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function TIMESTAMP(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function NUMBER(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function DIFFICULTY(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function GASLIMIT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function CHAINID(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function SELFBALANCE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function BASEFEE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

/* ----- 50s: Stack, Memory, Storage and Flow Operations ----- */

export async function POP(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.pop()
    return pc + 1;
}

export async function MLOAD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const offset = stack.peek();
    const data = memory.getVal(offset, "0x" + (32).toString(16));
    stack.set_last(data);
    return pc + 1;
}

export async function MSTORE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [offset, val] = [stack.pop(), stack.pop()];
    memory.store32(offset, val);
    return pc + 1;
}

export async function MSTORE8(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [offset, val] = [stack.pop(), stack.pop()];
    memory.store8(offset, val);
    return pc + 1;
}

export async function SLOAD(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.pop();
    stack.push("unknown");
    return pc + 1;
}

export async function SSTORE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.popN(2);
    return pc + 1;
}

export async function JUMP(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const pos = stack.pop()
    return +pos;
}

export async function JUMPI(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const [pos, cond] = stack.popN(2);
    if (+cond) return +pos;
    return pc + 1;
}

export async function PC(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push(toEvenLength("0x" + (pc).toString(16)));
    return pc + 1;
}

export async function MSIZE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    const size = toEvenLength("0x" + (memory.size()).toString(16));
    stack.push(size);
    return pc + 1;
}

export async function GAS(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    stack.push("0xffffffff");
    return pc + 1;
}

export async function JUMPDEST(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc + 1;
}

/* ----- f0s: System operations ----- */

export async function CREATE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function CREATE2(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function CALL(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function CALLCODE(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function DELEGATECALL(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function STATICCALL(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function RETURN(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function REVERT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function INVALID(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

export async function SELFDESTRUCT(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    return pc;
}

/* -------------- PUSH, DUP, SWAP, LOG -------------- */


// make push instruction function
export async function makePush(pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
    console.log("PUSH CALLED")
    // this is must be PUSH1...PUSH32
    const opcode = byteCode[pc];

    const takes = opcode - 0x5F;
    const next = pc + 1; // next byte after PUSH instruction
    const end = next + takes;
    let to_hex = [];

    for (let i = next; i < end; i++) to_hex.push(byteCode[i]);

    stack.push(bytesToHex(to_hex));

    return end;
}

// make dup instruction function
export function makeDup(n: number) {
    return async function (pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
        stack.dup(n)
        return pc + 1;
    }
}

// make swap instruction function
export function makeSwap(n: number) {
    n++;
    return async function (pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
        stack.swap(n)
        return pc + 1;
    }
}

// make log instruction function, does not perform any logging
// just pushes off 2 + size items of the stuck
export function makeLog(n: number) {
    return async function (pc: number, stack: Stack, memory: Memory, contract: Contract, blockHeader: BlockHeader, byteCode: number[]): Promise<number> {
        stack.popN(2 + n);
        return pc + 1;
    }
}
