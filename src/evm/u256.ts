
// 8 32-bit numbers, javascript can only safely represent integers between -(2^53 - 1) and 2^53 - 1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
type Int = [number, number, number, number, number, number, number, number];

// export class Int {

//     constructor() {}

// }


const EMPTY_BYTE = 0b00_00_00_00;
const MAX_32BIT = 0xFF_FF_FF_FF;


const MASKS_1 = {
    0: 0xFF_FF_FF_00,
    1: 0xFF_FF_00_FF,
    2: 0xFF_00_FF_FF,
    3: 0x00_FF_FF_FF,
}

// const MA

export class u256 {

    constructor(public Int: Int = [0, 0, 0, 0, 0, 0, 0, 0]) { }

    public fromHex(input: string): Int {

        return this.Int
    }

    public fromBytes(bytes: number[]): Int {

        if (bytes.length > 32) throw "u256: bytes length is more then 32"

        let idx = 7; // points to currently "in process" 32bit value in Int

        let set = 0;
        for (let i = bytes.length - 1; i >= 0; i--) {
            let to_shift = set * 8;
            let byte = bytes[i] << to_shift;

            this.Int[idx] = byte

            set++;

            if (set === 4) {
                idx--;
                set = 0;
            }

        }

        // if (idx === 7) { // means that all bytes together is less then MAX_32BIT
        //     this.Int[7] = n;
        // }

        return this.Int
    }
}


// let byte = bytes[i]; 
// let wokring32 = this.Int[idx];
// n = (wokring32 << (to_shift * 2)) | byte
// this.Int[idx] = n;
// set++;
// to_shift++

// if (to_shift === 4) {
//     idx--;
// }


// let setBytes = (n << 2) & byte;
// if (setBytes > MAX_32BIT) {
//     this.Int[idx] = MAX_32BIT; // all bits are set
//     idx--; // go to the next one from the end e.g 7 -> 6 -> 5 -> 4 etc.
//     n = setBytes >> 32; // rest 
// } else if (setBytes == MAX_32BIT) {
//     n = 0;
//     this.Int[idx] = MAX_32BIT; // all bits are set 
//     idx--;
// } else {
//     n = setBytes;
// }
// console.log(n, idx)