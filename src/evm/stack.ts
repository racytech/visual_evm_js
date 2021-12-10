// TODO

export class Stack {

    private stack = []

    constructor(s?: Stack) {
        if (s) {
            this.stack = s.getStack()
        }

    }

    public getStack() {
        return this.stack;
    }
}