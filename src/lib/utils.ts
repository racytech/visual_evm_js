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
        console.log(input);
        let i = 0
        for (; i < input.length; i += 2) {
            let byte = strHexToByte(input[i], input[i + 1]);
            if (byte < 0 || byte > 255) throw `INVALID BYTE: ${byte}`;
            data.push(byte);
        }

    } else {
        throw `INPUT LENGTH < 2: INPUT: ${input}`;
    }



    return data;
}