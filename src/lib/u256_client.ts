import { OPCODES } from "../evm/opcodes";


export interface u256_msg {
    id: number;
    params: {};
    opcode: number;
}


export interface u256 {
    hex: string;
    decimal?: string;
    binary?: string;
    signed?: boolean;
    overflow?: boolean;
}

class U256_Client {

    private requestID: number = 1;
    private url: string = "http://localhost:12345/u256"

    constructor() { }

    public async ADD(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.ADD,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async MUL(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.MUL,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SUB(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SUB,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async DIV(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.DIV,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SDIV(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SDIV,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async MOD(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.MOD,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SMOD(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SMOD,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async ADDMOD(x: string, y: string, z: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y, z },
            opcode: OPCODES.ADDMOD,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async MULMOD(x: string, y: string, z: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y, z },
            opcode: OPCODES.MULMOD,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async EXP(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.EXP,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SIGNEXTEND(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SIGNEXTEND,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async LT(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.LT,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async GT(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.GT,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SLT(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SLT,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SGT(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SGT,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async EQ(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.EQ,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async ISZERO(x: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x },
            opcode: OPCODES.ISZERO,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async AND(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.AND,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async OR(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.OR,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async XOR(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.XOR,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async NOT(x: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x },
            opcode: OPCODES.NOT,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async BYTE(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.BYTE,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SHL(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SHL,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SHR(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SHR,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SAR(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SAR,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async SHA3(x: string, y: string) {
        this.requestID++;
        const data: u256_msg = {
            id: this.requestID,
            params: { x, y },
            opcode: OPCODES.SHA3,
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    // # ADD,
    // # MUL,
    // # SUB,
    // # DIV,
    // # SDIV,
    // # MOD,
    // # SMOD,
    // # ADDMOD,
    // # MULMOD,
    // # EXP,
    // # SIGNEXTEND,

    // # // 0x10 range - comparison ops.
    // # LT = 0x10,
    // # GT,
    // # SLT,
    // # SGT,
    // # EQ,
    // # ISZERO,
    // # AND,
    // # OR,
    // # XOR,
    // # NOT,
    // # BYTE,
    // # SHL,
    // # SHR,
    // # SAR,

    // # SHA3 = 0x20,
    public async test_requests() {
        const add = await this.ADD("0x1", "0x2");
        // console.log(`ADD: ${result}`);
        const mul = await this.MUL("0x1e5f", "0x4444");
        // console.log(`MUL: ${result}`);
        const sub = await this.SUB("0x1e5f", "0x4444");
        // console.log(`SUB: ${result}`);
        const div = await this.DIV("0x1e5f", "0x4444");
        // console.log(`DIV: ${result}`);
        const sdiv = await this.SDIV("0x1e5f", "0x4444");
        // console.log(`SDIV: ${result}`);
        const mod = await this.MOD("0x1e5f", "0x4444");
        // console.log(`MOD: ${result}`);
        const smod = await this.SMOD("0x1e5f", "0x4444");
        // console.log(`SMOD: ${result}`);
        const addmod = await this.ADDMOD("0x1e5f", "0x4444", "0x1234");
        // console.log(`ADDMOD: ${result}`);
        const mulmod = await this.MULMOD("0x1e5f", "0x4444", "0x1234");
        // console.log(`MULMOD: ${result}`);
        const exp = await this.EXP("0x1e5f", "0x4444");
        // console.log(`EXP: ${result}`);
        const signextend = await this.SIGNEXTEND("0x1e5f", "0x4444");
        // console.log(`SIGNEXTEND: ${result}`);

        const lt = await this.LT("0x1e5f", "0x4444");
        // console.log(`LT: ${result}`);
        const gt = await this.GT("0x1e5f", "0x4444");
        // console.log(`GT: ${result}`);
        const slt = await this.SLT("0x1e5f", "0x4444");
        // console.log(`SLT: ${result}`);
        const sgt = await this.SGT("0x1e5f", "0x4444");
        // console.log(`SGT: ${result}`);
        const eq = await this.EQ("0x1e5f", "0x4444");
        // console.log(`EQ: ${result}`);
        const iszero = await this.ISZERO("0x1e5f");
        // console.log(`ISZERO: ${result}`);
        const and = await this.AND("0x1e5f", "0x4444");
        // console.log(`AND: ${result}`);
        const or = await this.OR("0x1e5f", "0x4444");
        // console.log(`OR: ${result}`);
        const xor = await this.XOR("0x1e5f", "0x4444");
        // console.log(`XOR: ${result}`);
        const not = await this.NOT("0x1e5f");
        // console.log(`NOT: ${result}`);
        const byte = await this.BYTE("0x1e5f", "0x4444");
        // console.log(`BYTE: ${result}`);
        const shl = await this.SHL("0x1e5f", "0x4444");
        // console.log(`SHL: ${result}`);
        const shr = await this.SHR("0x1e5f", "0x4444");
        // console.log(`SHR: ${result}`);
        const sar = await this.SAR("0x1e5f", "0x4444");
        // console.log(`SAR: ${result}`);

        const sha3 = await this.SHA3("0x1e5f", "0x4444");
        // console.log(`SHA3: ${result}`);

        return {
            add, mul, sub, div, sdiv, mod,
            smod, addmod, mulmod, exp, signextend,
            lt, gt, slt, sgt, eq, iszero, and,
            or, xor, not, byte, shl, shr, sar, sha3,
        }
    }
}

export const u256_client = new U256_Client();


function makeBody(data = {}): RequestInit {
    return {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
}
