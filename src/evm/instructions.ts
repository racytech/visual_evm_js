/* -------------- 0s: Stop and Arithmetic Operations -------------- */

function STOP() {

}

function ADD() {

}

function MUL() {

}

function SUB() {

}

function DIV() {

}

function SDIV() {

}

function MOD() {

}

function SMOD() {

}

function ADDMOD() {

}

function MULMOD() {

}

function EXP() {

}

function SIGNEXTEND() {

}

/* -------------- 10s: Comparison & Bitwise Logic Operations -------------- */

function LT() {

}

function GT() {

}

function SLT() {

}

function SGT() {

}

function EQ() {

}

function ISZERO() {

}

function AND() {

}

function OR() {

}

function XOR() {

}

function NOT() {

}

function BYTE() {

}

function SHL() {

}

function SHR() {

}

function SAR() {

}

/* -------------- 20s: SHA3 -------------- */

function SHA3() {

}

/* -------------- 30s: Environmental Information -------------- */

function ADDRESS() {

}

function ORIGIN() {

}

function CALLER() {

}

function CALLVALUE() {

}

function CALLDATALOAD() {

}

function CALLDATASIZE() {

}

function CALLDATACOPY() {

}

function CODESIZE() {

}

function CODECOPY() {

}

function GASPRICE() {

}

function EXTCODESIZE() {

}

function EXTCODECOPY() {

}

function RETURNDATASIZE() {

}

function RETURNDATACOPY() {

}

function EXTCODEHASH() {

}

/* -------------- 40s: Block Information -------------- */

function BLOCKHASH() {

}

function COINBASE() {

}

function TIMESTAMP() {

}

function NUMBER() {

}

function DIFFICULTY() {

}

function GASLIMIT() {

}

function CHAINID() {

}

function SELFBALANCE() {

}

/* ----- 50s: Stack, Memory, Storage and Flow Operations ----- */

function POP() {

}

function MLOAD() {

}

function MSTORE() {

}

function MSTORE8() {

}

function SLOAD() {

}

function SSTORE() {

}

function JUMP() {

}

function JUMPI() {

}

function PC() {

}

function MSIZE() {

}

function GAS() {

}

function JUMPDEST() {

}

/* ----- f0s: System operations ----- */

function CREATE() {

}

function CREATE2() {

}

function CALL() {

}

function CALLCODE() {

}

function DELEGATECALL() {

}

function STATICCALL() {

}

function RETURN() {

}

function REVERT() {
}

function INVALID() {

}

function SELFDESTRUCT() {

}

/* -------------- PUSH, DUP, SWAP, LOG -------------- */

// opPush1 is a specialized version of pushN
function PUSH1() {

}

// make push instruction function
function makePush() {


}

// make dup instruction function
function makeDup() {

}

// make swap instruction function
function makeSwap() {

}

// make log instruction function, does not perform any logging
// just pushes off 2 + size items of the stuck
function makeLog() {

}