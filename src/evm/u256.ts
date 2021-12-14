import { strHexToBytes } from "../lib/utils";

const MASKS_1 = {
    0: 0x00_00_00_FF,
    1: 0x00_00_FF_FF,
    2: 0x00_FF_FF_FF,
    3: 0xFF_FF_FF_FF,
}

/**
    8 32-bit numbers or 8 4-byte numbers \
    js can only safely represent integers between -(2^53 - 1) and 2^53 - 1 \
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
 */
type Int = [number, number, number, number, number, number, number, number];


// export function u256fromHex(): Int {

// }

// export function u256fromBytes(): Int {

// }

// export function IntToHexStr(): string {

// }

// export function IntToBitsStr(): string {

// }

// export function u256Add(a: Int, b: Int): Int {

// }

// export function u256Mul(a: Int, b: Int): Int {

// }

export class u256 {

    constructor(public Int: Int = [0, 0, 0, 0, 0, 0, 0, 0]) { }

    // expects hex string starting with "0x"
    public fromHex(hexStr: string): u256 {
        return this.fromBytes(strHexToBytes(hexStr))
    }

    public fromBytes(bytes: number[]): u256 {

        if (bytes.length > 32) throw "u256: bytes length is more then 32"

        let idx = 7; // points to currently "in process" 32bit value in Int
        let to_set = 0;

        for (let i = bytes.length - 1; i >= 0; i--) {

            let to_shift = to_set * 8;
            let byte = bytes[i] << to_shift; // shift each byte (to_set * 8) bits

            this.Int[idx] |= byte; // set 

            to_set++;

            if (to_set === 4) {
                idx--;
                to_set = 0;
            }

        }

        return this
    }

    public toHex(): string {

        let result = "0x";
        let hexBytes = [];
        for (let idx = 7; idx >= 0; idx--) {
            let n4byte = this.Int[idx]; // 4 byte number

            let to_mask = 0;
            let byte = (n4byte & MASKS_1[to_mask]) >> (to_mask * 8)
            hexBytes.push(byte.toString(16))

            to_mask++; // 1
            byte = byte = (n4byte & MASKS_1[to_mask]) >> (to_mask * 8)
            hexBytes.push(byte.toString(16))

            to_mask++; // 2
            byte = byte = (n4byte & MASKS_1[to_mask]) >> (to_mask * 8)
            hexBytes.push(byte.toString(16))

            to_mask++; // 3
            byte = byte = (n4byte & MASKS_1[to_mask]) >> (to_mask * 8)
            hexBytes.push(byte.toString(16))
        }
        console.log(hexBytes.reverse().join(""))
        return result;
    }
}
