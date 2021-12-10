export enum OPCODES {
    // 0x0 range - arithmetic ops.
    STOP = 0x0,
    ADD,
    MUL,
    SUB,
    DIV,
    SDIV,
    MOD,
    SMOD,
    ADDMOD,
    MULMOD,
    EXP,
    SIGNEXTEND,

    // 0x10 range - comparison ops.
    LT = 0x10,
    GT,
    SLT,
    SGT,
    EQ,
    ISZERO,
    AND,
    OR,
    XOR,
    NOT,
    BYTE,
    SHL,
    SHR,
    SAR,

    SHA3 = 0x20,

    // 0x30 range - closure state.
    ADDRESS = 0x30,
    BALANCE,
    ORIGIN,
    CALLER,
    CALLVALUE,
    CALLDATALOAD,
    CALLDATASIZE,
    CALLDATACOPY,
    CODESIZE,
    CODECOPY,
    GASPRICE,
    EXTCODESIZE,
    EXTCODECOPY,
    RETURNDATASIZE,
    RETURNDATACOPY,
    EXTCODEHASH,

    // 0x40 range - block operations.
    BLOCKHASH = 0x40,
    COINBASE,
    TIMESTAMP,
    NUMBER,
    DIFFICULTY,
    GASLIMIT,

    CHAINID = 0x46,
    SELFBALANCE,
    BASEFEE,

    // 0x50 range - 'storage' and execution.
    POP = 0x50,
    MLOAD,
    MSTORE,
    MSTORE8,
    SLOAD,
    SSTORE,
    JUMP,
    JUMPI,
    PC,
    MSIZE,
    GAS,
    JUMPDEST,

    // 0x60 range.
    PUSH1 = 0x60,
    PUSH2,
    PUSH3,
    PUSH4,
    PUSH5,
    PUSH6,
    PUSH7,
    PUSH8,
    PUSH9,
    PUSH10,
    PUSH11,
    PUSH12,
    PUSH13,
    PUSH14,
    PUSH15,
    PUSH16,
    PUSH17,
    PUSH18,
    PUSH19,
    PUSH20,
    PUSH21,
    PUSH22,
    PUSH23,
    PUSH24,
    PUSH25,
    PUSH26,
    PUSH27,
    PUSH28,
    PUSH29,
    PUSH30,
    PUSH31,
    PUSH32,
    DUP1,
    DUP2,
    DUP3,
    DUP4,
    DUP5,
    DUP6,
    DUP7,
    DUP8,
    DUP9,
    DUP10,
    DUP11,
    DUP12,
    DUP13,
    DUP14,
    DUP15,
    DUP16,
    SWAP1,
    SWAP2,
    SWAP3,
    SWAP4,
    SWAP5,
    SWAP6,
    SWAP7,
    SWAP8,
    SWAP9,
    SWAP10,
    SWAP11,
    SWAP12,
    SWAP13,
    SWAP14,
    SWAP15,
    SWAP16,

    // 0xa0 range - logging ops.
    LOG0 = 0xa0,
    LOG1,
    LOG2,
    LOG3,
    LOG4,

    // 0xf0 range - System operations.
    CREATE = 0xf0,
    CALL,
    CALLCODE,
    RETURN,
    DELEGATECALL,
    CREATE2,
    STATICCALL = 0xfa,
    REVERT = 0xfd,
    SELFDESTRUCT = 0xff,
}

interface operation {
    name: string;
    description: string;
    extra?: any;
}

interface operations { [key: number]: operation }

export const OPERATIONS: operations = {
    // 0x0 range - arithmetic ops.
    [OPCODES.STOP]: { name: "STOP", description: "" },
    [OPCODES.ADD]: { name: "ADD", description: "" },
    [OPCODES.MUL]: { name: "MUL", description: "" },
    [OPCODES.SUB]: { name: "SUB", description: "" },
    [OPCODES.DIV]: { name: "DIV", description: "" },
    [OPCODES.SDIV]: { name: "SDIV", description: "" },
    [OPCODES.MOD]: { name: "MOD", description: "" },
    [OPCODES.SMOD]: { name: "SMOD", description: "" },
    [OPCODES.ADDMOD]: { name: "ADDMOD", description: "" },
    [OPCODES.MULMOD]: { name: "MULMOD", description: "" },
    [OPCODES.EXP]: { name: "EXP", description: "" },
    [OPCODES.SIGNEXTEND]: { name: "SIGNEXTEND", description: "" },

    // 0x10 range - comparison ops.
    [OPCODES.LT]: { name: "LT", description: "" },
    [OPCODES.GT]: { name: "GT", description: "" },
    [OPCODES.SLT]: { name: "SLT", description: "" },
    [OPCODES.SGT]: { name: "SGT", description: "" },
    [OPCODES.EQ]: { name: "EQ", description: "" },
    [OPCODES.ISZERO]: { name: "ISZERO", description: "" },
    [OPCODES.AND]: { name: "AND", description: "" },
    [OPCODES.OR]: { name: "OR", description: "" },
    [OPCODES.XOR]: { name: "XOR", description: "" },
    [OPCODES.NOT]: { name: "NOT", description: "" },
    [OPCODES.BYTE]: { name: "BYTE", description: "" },
    [OPCODES.SHL]: { name: "SHL", description: "" },
    [OPCODES.SHR]: { name: "SHR", description: "" },
    [OPCODES.SAR]: { name: "SAR", description: "" },

    [OPCODES.SHA3]: { name: "SHA3", description: "" },

    // 0x30 range - closure state.
    [OPCODES.ADDRESS]: { name: "ADDRESS", description: "" },
    [OPCODES.BALANCE]: { name: "BALANCE", description: "" },
    [OPCODES.ORIGIN]: { name: "ORIGIN", description: "" },
    [OPCODES.CALLER]: { name: "CALLER", description: "" },
    [OPCODES.CALLVALUE]: { name: "CALLVALUE", description: "" },
    [OPCODES.CALLDATALOAD]: { name: "CALLDATALOAD", description: "" },
    [OPCODES.CALLDATASIZE]: { name: "CALLDATASIZE", description: "" },
    [OPCODES.CALLDATACOPY]: { name: "CALLDATACOPY", description: "" },
    [OPCODES.CODESIZE]: { name: "CODESIZE", description: "" },
    [OPCODES.CODECOPY]: { name: "CODECOPY", description: "" },
    [OPCODES.GASPRICE]: { name: "GASPRICE", description: "" },
    [OPCODES.EXTCODESIZE]: { name: "EXTCODESIZE", description: "" },
    [OPCODES.EXTCODECOPY]: { name: "EXTCODECOPY", description: "" },
    [OPCODES.RETURNDATASIZE]: { name: "RETURNDATASIZE", description: "" },
    [OPCODES.RETURNDATACOPY]: { name: "RETURNDATACOPY", description: "" },
    [OPCODES.EXTCODEHASH]: { name: "EXTCODEHASH", description: "" },

    // 0x40 range - block operations.
    [OPCODES.BLOCKHASH]: { name: "BLOCKHASH", description: "" },
    [OPCODES.COINBASE]: { name: "COINBASE]", description: "" },
    [OPCODES.TIMESTAMP]: { name: "TIMESTAMP]", description: "" },
    [OPCODES.NUMBER]: { name: "NUMBER", description: "" },
    [OPCODES.DIFFICULTY]: { name: "DIFFICULTY]", description: "" },
    [OPCODES.GASLIMIT]: { name: "GASLIMIT", description: "" },

    [OPCODES.CHAINID]: { name: "CHAINID", description: "" },
    [OPCODES.SELFBALANCE]: { name: "SELFBALANCE", description: "" },
    [OPCODES.BASEFEE]: { name: "BASEFEE", description: "" },

    // 0x50 range - 'storage' and execution.
    [OPCODES.POP]: { name: "POP", description: "" },
    [OPCODES.MLOAD]: { name: "MLOAD", description: "" },
    [OPCODES.MSTORE]: { name: "MSTORE", description: "" },
    [OPCODES.MSTORE8]: { name: "MSTORE8", description: "" },
    [OPCODES.SLOAD]: { name: "LOAD", description: "" },
    [OPCODES.SSTORE]: { name: "SSTORE", description: "" },
    [OPCODES.JUMP]: { name: "JUMP", description: "" },
    [OPCODES.JUMPI]: { name: "JUMPI", description: "" },
    [OPCODES.PC]: { name: "PC", description: "" },
    [OPCODES.MSIZE]: { name: "MSIZE", description: "" },
    [OPCODES.GAS]: { name: "GAS", description: "" },
    [OPCODES.JUMPDEST]: { name: "JUMPDEST", description: "" },

    // 0x60 range.
    [OPCODES.PUSH1]: { name: "PUSH1", description: "" },
    [OPCODES.PUSH2]: { name: "PUSH2", description: "" },
    [OPCODES.PUSH3]: { name: "PUSH3", description: "" },
    [OPCODES.PUSH4]: { name: "PUSH4", description: "" },
    [OPCODES.PUSH5]: { name: "PUSH5", description: "" },
    [OPCODES.PUSH6]: { name: "PUSH6", description: "" },
    [OPCODES.PUSH7]: { name: "PUSH7", description: "" },
    [OPCODES.PUSH8]: { name: "PUSH8", description: "" },
    [OPCODES.PUSH9]: { name: "PUSH9", description: "" },
    [OPCODES.PUSH10]: { name: "PUSH10", description: "" },
    [OPCODES.PUSH11]: { name: "PUSH11", description: "" },
    [OPCODES.PUSH12]: { name: "PUSH12", description: "" },
    [OPCODES.PUSH13]: { name: "PUSH13", description: "" },
    [OPCODES.PUSH14]: { name: "PUSH14", description: "" },
    [OPCODES.PUSH15]: { name: "PUSH15", description: "" },
    [OPCODES.PUSH16]: { name: "PUSH16", description: "" },
    [OPCODES.PUSH17]: { name: "PUSH17", description: "" },
    [OPCODES.PUSH18]: { name: "PUSH18", description: "" },
    [OPCODES.PUSH19]: { name: "PUSH19", description: "" },
    [OPCODES.PUSH20]: { name: "PUSH20", description: "" },
    [OPCODES.PUSH21]: { name: "PUSH21", description: "" },
    [OPCODES.PUSH22]: { name: "PUSH22", description: "" },
    [OPCODES.PUSH23]: { name: "PUSH23", description: "" },
    [OPCODES.PUSH24]: { name: "PUSH24", description: "" },
    [OPCODES.PUSH25]: { name: "PUSH25", description: "" },
    [OPCODES.PUSH26]: { name: "PUSH26", description: "" },
    [OPCODES.PUSH27]: { name: "PUSH27", description: "" },
    [OPCODES.PUSH28]: { name: "PUSH28", description: "" },
    [OPCODES.PUSH29]: { name: "PUSH29", description: "" },
    [OPCODES.PUSH30]: { name: "PUSH30", description: "" },
    [OPCODES.PUSH31]: { name: "PUSH31", description: "" },
    [OPCODES.PUSH32]: { name: "PUSH32", description: "" },
    [OPCODES.DUP1]: { name: "DUP1", description: "" },
    [OPCODES.DUP2]: { name: "DUP2", description: "" },
    [OPCODES.DUP3]: { name: "DUP3", description: "" },
    [OPCODES.DUP4]: { name: "DUP4", description: "" },
    [OPCODES.DUP5]: { name: "DUP5", description: "" },
    [OPCODES.DUP6]: { name: "DUP6", description: "" },
    [OPCODES.DUP7]: { name: "DUP7", description: "" },
    [OPCODES.DUP8]: { name: "DUP8", description: "" },
    [OPCODES.DUP9]: { name: "DUP9", description: "" },
    [OPCODES.DUP10]: { name: "DUP10", description: "" },
    [OPCODES.DUP11]: { name: "DUP11", description: "" },
    [OPCODES.DUP12]: { name: "DUP12", description: "" },
    [OPCODES.DUP13]: { name: "DUP13", description: "" },
    [OPCODES.DUP14]: { name: "DUP14", description: "" },
    [OPCODES.DUP15]: { name: "DUP15", description: "" },
    [OPCODES.DUP16]: { name: "DUP16", description: "" },
    [OPCODES.SWAP1]: { name: "SWAP1", description: "" },
    [OPCODES.SWAP2]: { name: "SWAP2", description: "" },
    [OPCODES.SHA3]: { name: "SWAP3", description: "" },
    [OPCODES.SWAP4]: { name: "SWAP4", description: "" },
    [OPCODES.SWAP5]: { name: "SWAP5", description: "" },
    [OPCODES.SWAP6]: { name: "SWAP6", description: "" },
    [OPCODES.SWAP7]: { name: "SWAP7", description: "" },
    [OPCODES.SWAP8]: { name: "SWAP8", description: "" },
    [OPCODES.SWAP9]: { name: "SWAP9", description: "" },
    [OPCODES.SWAP10]: { name: "SWAP10", description: "" },
    [OPCODES.SWAP11]: { name: "SWAP11", description: "" },
    [OPCODES.SWAP12]: { name: "SWAP12", description: "" },
    [OPCODES.SWAP13]: { name: "SWAP13", description: "" },
    [OPCODES.SWAP14]: { name: "SWAP14", description: "" },
    [OPCODES.SWAP15]: { name: "SWAP15", description: "" },
    [OPCODES.SWAP16]: { name: "SWAP16", description: "" },

    // 0xa0 range - logging ops.
    [OPCODES.LOG0]: { name: "LOG0", description: "" },
    [OPCODES.LOG1]: { name: "LOG1", description: "" },
    [OPCODES.LOG2]: { name: "LOG2", description: "" },
    [OPCODES.LOG3]: { name: "LOG3", description: "" },
    [OPCODES.LOG4]: { name: "LOG4", description: "" },

    // 0xf0 range - System operations.
    [OPCODES.CREATE]: { name: "CREATE", description: "" },
    [OPCODES.CALL]: { name: "CALL", description: "" },
    [OPCODES.CALLCODE]: { name: "CALLCODE", description: "" },
    [OPCODES.RETURN]: { name: "RETURN", description: "" },
    [OPCODES.DELEGATECALL]: { name: "DELEGATECALL", description: "" },
    [OPCODES.CREATE2]: { name: "CREATE2", description: "" },
    [OPCODES.STATICCALL]: { name: "STATICCALL", description: "" },
    [OPCODES.REVERT]: { name: "REVERT", description: "" },
    [OPCODES.SELFDESTRUCT]: { name: "SELFDESTRUCT]", description: "" },
}