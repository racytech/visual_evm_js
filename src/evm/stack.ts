// TODO

export class Stack {

    private stack: string[] = []

    constructor(s?: string[]) {
        if (s) this.stack = s;
    }

    public getStack() {
        return [...this.stack];
    }

    public copy() {
        return new Stack([...this.stack])
    }

    public push(hex: string) {
        this.stack.push(hex);
    }

    public push_multiple(hex_arr: string[]) {
        this.stack = [...this.stack, ...hex_arr];
    }

    public popN(n: number): string[] {
        let result = [];
        for (let i = 0; i < n; i += 1) {
            result.push(this.stack.pop());
        }
        return result;
    }

    public pop(): string {
        return this.stack.pop();
    }

    public peek(): string {
        return this.stack[this.stack.length - 1];
    }

    public swap(n: number) {
        const len = this.stack.length;
        const temp = this.stack[len - n];
        this.stack[len - n] = this.stack[len - 1];
        this.stack[len - 1] = temp;
        // [this.stack[len - n], this.stack[len - 1]] = [this.stack[len - 1], this.stack[len - n]];
    }

    public dup(n: number) {
        const len = this.stack.length;
        this.stack.push(this.stack[len - n]);
    }

    // Back returns the n'th item in stack
    public back(n: number): string {
        const len = this.stack.length;
        return this.stack[len - n - 1];
    }


    public last_idx(): number {
        return this.stack.length - 1;
    }

    public set(idx: number, hex: string) {
        this.stack[idx] = hex;
    }

    public set_last(hex: string) {
        this.stack[this.stack.length - 1] = hex;
    }
}