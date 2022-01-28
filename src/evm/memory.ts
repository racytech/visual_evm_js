// TODO 

import { Stack } from "./stack";

export const MEM_LIMIT_SIZE = 32 * 2048; // 64KB

export class Memory {

    private memory: number[] = [];

    constructor(m?: number[]) {
        if (m) this.memory = m;
    }

    public size() {
        return this.memory.length;
    }

    public getMemory() {
        return [...this.memory];
    }

    public copy() {
        return new Memory([...this.memory]);
    }

    public resize(size: number) {
        const to_add = new Array(size).fill(-1);
        this.memory = [...this.memory, ...to_add];
    }

    public store8(offset: string, val: string) {
        this.memory[+offset] = +val;
    }

    public store32(offset: string, val: string) {
        const len = val.length - 2; // take out 0x part
        const to_add = 32 - (len / 2);

        let result = new Array(to_add).fill(0);

        for (let i = 2; i < val.length; i += 2) {
            let hex = "0x" + val[i] + val[i + 1];
            result.push(+hex);
        }

        this.memory = [
            ...this.memory.slice(0, +offset),
            ...result,
            ...this.memory.slice(+offset + 32)
        ];
    }

    public store(offset: string, size: string, data: string) {
        // expects data length to be always even

        let result = new Array(+size).fill(0);
        for (let i = 2; i < data.length; i += 2) {
            result.push(+("0x" + data[i] + data[i + 1]));
        }

        this.memory = [
            ...this.memory.slice(0, +offset),
            ...result,
            ...this.memory.slice(+offset),
        ]
    }

    public getVal(str_offset: string, str_size: string): string {
        const [offset, size] = [+str_offset, +str_size];
        let result = "";
        for (let i = offset; i < offset + size; i += 1) {
            let hex = this.memory[i].toString(16);
            result += hex.length === 1 ? "0" + hex : hex;
        }
        return "0x" + result;
    }
}


// const [offsetErr: [number, string, boolean] = 

export function memorySha3(stack: Stack): [number, boolean, string] {
    const [offset, length] = [stack.back(0), stack.back(1)];
    // return calcMemSize64(stack.Back(0), stack.Back(1))
    if (+offset > MEM_LIMIT_SIZE) {
        return [0, true, `Exceeding allowed memory size: MEM_SIZE_LIMIT=${MEM_LIMIT_SIZE}`];
    }

    if (+length === 0) {
        return [0, false, ""];
    }


}

export function memoryCallDataCopy(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(2))
}

export function memoryReturnDataCopy(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(2))
}

export function memoryCodeCopy(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(2))
}

export function memoryExtCodeCopy(stack: Stack) {
    // return calcMemSize64(stack.Back(1), stack.Back(3))
}

export function memoryMLoad(stack: Stack) {
    // return calcMemSize64WithUint(stack.Back(0), 32)
}

export function memoryMStore8(stack: Stack) {
    // return calcMemSize64WithUint(stack.Back(0), 1)
}

export function memoryMStore(stack: Stack): [number, boolean, string] {
    const offset = stack.back(0);

    if (+offset > MEM_LIMIT_SIZE) {
        return [0, true, `Exceeding allowed memory size: MEM_SIZE_LIMIT=${MEM_LIMIT_SIZE}`];
    }

    return [+offset + 32, false, ""];
}

export function memoryCreate(stack: Stack) {
    // return calcMemSize64(stack.Back(1), stack.Back(2))
}

export function memoryCreate2(stack: Stack) {
    // return calcMemSize64(stack.Back(1), stack.Back(2))
}

export function memoryCall(stack: Stack) {
    // x, overflow := calcMemSize64(stack.Back(5), stack.Back(6))
    // if overflow {
    // 	return 0, true
    // }
    // y, overflow := calcMemSize64(stack.Back(3), stack.Back(4))
    // if overflow {
    // 	return 0, true
    // }
    // if x > y {
    // 	return x, false
    // }
    // return y, false
}
export function memoryDelegateCall(stack: Stack) {
    // x, overflow := calcMemSize64(stack.Back(4), stack.Back(5))
    // if overflow {
    // 	return 0, true
    // }
    // y, overflow := calcMemSize64(stack.Back(2), stack.Back(3))
    // if overflow {
    // 	return 0, true
    // }
    // if x > y {
    // 	return x, false
    // }
    // return y, false
}

export function memoryStaticCall(stack: Stack) {
    // x, overflow := calcMemSize64(stack.Back(4), stack.Back(5))
    // if overflow {
    // 	return 0, true
    // }
    // y, overflow := calcMemSize64(stack.Back(2), stack.Back(3))
    // if overflow {
    // 	return 0, true
    // }
    // if x > y {
    // 	return x, false
    // }
    // return y, false
}

export function memoryReturn(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(1))
}

export function memoryRevert(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(1))
}

export function memoryLog(stack: Stack) {
    // return calcMemSize64(stack.Back(0), stack.Back(1))
}
