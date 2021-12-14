export interface u256_msg {
    id: number;
    x: u256;
    y: u256;
    method: string;
}


export interface u256 {
    hex: string;
    bin?: string;
    signed?: string;
    unsigned?: string;
}

class U256_Client {

    private requestID: number = 1;
    private url: string = "http://localhost:12345/u256"

    private conn: WebSocket;

    constructor() {


    }


    // public async getBlockByNumber(blockN: number): Promise<RPC_Response> {
    //     this.requestID++;
    //     const hexN = `0x${blockN.toString(16)}`;
    //     const data = {
    //         jsonrpc: "2.0",
    //         method: "eth_getBlockByNumber",
    //         params: [hexN, true],
    //         id: this.requestID
    //     }
    //     // {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x%x", true],"id":%d}
    //     const response = await fetch(this.url, makeBody(data))
    //     return response.json();
    // }

    private onOpen(evt: Event) {
        this.conn.send("test")
    }

    private onMessage(evt: Event) {
        console.log(evt)
    }


    public async add(x: u256, y: u256) {
        this.requestID++;
        const data = {
            jsonrpc: "2.0",
            method: "eth_getCode",
            id: this.requestID
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public sub(x: u256, y: u256) {

    }

    public mul(x: u256, y: u256) {

    }

    public div(x: u256, y: u256) {

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
