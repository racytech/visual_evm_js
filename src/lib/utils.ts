export interface LinkBTN {
    id: string,
    children: LinkBTN[],
}

export function makeChildren(data: LinkBTN): string {


    return ""
}


export function strHexToByte(a: string, b: string) {
    return parseInt(`0x${a}${b}`);
}

export function strHexToBytes(input: string): number[] {
    let data = [];


    if (input.length > 2) {
        input = input.slice(2);

        if (input.length % 2 === 1) {
            input = "0" + input;
        }

        let i = 0
        for (; i < input.length; i += 2) {
            let byte = strHexToByte(input[i], input[i + 1]);
            if (byte < 0 || byte > 255) throw `INVALID BYTE: ${byte}`;
            data.push(byte);
        }

    }

    return data;
}

export function bytesToHex(input: number[]): string {
    let result = "0x";

    for (const byte of input) {
        let b = byte.toString(16);

        if (b.length < 2) b = "0" + `${b}`;
        result += `${b}`;
    }

    return result;
}

export function toEvenLength(hex: string): string {
    if (hex.length % 2 === 1) {
        return "0x" + "0" + hex.slice(2);
    }
    return hex;
}

export function getData(hexData: string, offset: string, strSize: string): string {

    let no0x = hexData.slice(2); // remove 0x part
    const dataSize = no0x.length / 2;
    let [start, size] = [+offset, +strSize];
    if (start > dataSize) start = dataSize;
    let end = start + size;
    if (end > dataSize) end = length;

    let result = "0x";

    for (let i = start * 2; i < end * 2; i += 2) {
        result += (no0x[i] + no0x[i + 1]);
    }

    return result;
}