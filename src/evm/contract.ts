export class Contract {

    constructor(
        private callerAddr?: string,
        private caller?: string, // from/sender
        private self?: string, // to

        private data?: string,
        private value?: string,
        private origin?: string,

        private code?: string, // hex code

        // private codeHash?: string,
        // private codeAddr?: string,
        // private input?: string,
    ) { }
    

    public getCallerAddr() {
        return this.callerAddr;
    }

    public getCaller() {
        return this.caller;
    }

    public getSelf() {
        return this.self;
    }

    public getData() {
        return this.data;
    }

    public getValue() {
        return this.value;
    }

    public getAll() {
        return [this.caller, this.self, this.data, this.value];
    }

    public getOrigin() {
        return this.origin;
    }

    public getCode() {
        return this.code;
    }

    public setCode(code: string) {
        this.code = code;
    }
    
    // public getInput() {
    //     return this.input;
    // }
}