
// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         // credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

import { RPC_Response } from "./types";



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

class RPC_Client {

    private url = `http://localhost:${this.port}`
    private requestID = 1;

    constructor(private port: number = 8545) { }

    public async getBlockByNumber(blockN: number): Promise<RPC_Response> {
        this.requestID++;
        const hexN = `0x${blockN.toString(16)}`;
        const data = {
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [hexN, true],
            id: this.requestID
        }
        // {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x%x", true],"id":%d}
        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async getCode(address: string, blockHash: string): Promise<RPC_Response> {
        this.requestID++;
        const data = {
            jsonrpc: "2.0",
            method: "eth_getCode",
            params: [address, blockHash],
            id: this.requestID
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }


    public async getBalance(address: string, blockHash: string): Promise<RPC_Response> {
        this.requestID++;
        const data = {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, blockHash],
            id: this.requestID
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }

    public async getGasPrice(): Promise<RPC_Response> {
        this.requestID++;
        const data = {
            jsonrpc: "2.0",
            method: "eth_gasPrice",
            params: [],
            id: this.requestID
        }

        const response = await fetch(this.url, makeBody(data))
        return response.json();
    }
}


export const rpc_client = new RPC_Client();