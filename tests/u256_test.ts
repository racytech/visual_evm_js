import { u256 } from '../src/evm/u256';
import { strHexToBytes } from '../src/lib/utils';
var assert = require('assert');

const a = new u256();

const hexString = "0x2340";
console.log(hexString.length)
const bytes = strHexToBytes(hexString)
console.log(bytes)
a.fromBytes(bytes)

// console.log(a.Int)
// // for (const byte of a.Int) {
// //     console.log(byte.toString(2))
// // }

const MASKS_1 = {
    0: 0xFF_FF_FF_00,
    1: 0xFF_FF_00_FF,
    2: 0xFF_00_FF_FF,
    3: 0x00_FF_FF_FF,
}

let idx = 7; // points to currently "in process" 32bit value in Int
let myInt: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0];
let set = 0;
for (let i = bytes.length - 1; i >= 0; i--) {
    let to_shift = set * 8;
    let byte = bytes[i] << to_shift;
    console.log(to_shift, byte, set);
    myInt[idx] = byte;

    set++;

    if (set === 4) {
        idx--;
        set = 0;
    }

}
console.log(myInt)