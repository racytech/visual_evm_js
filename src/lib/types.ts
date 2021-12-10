export interface RPC_Response {
    id: number;
    jsonrpc: string;
    result: any;
}

export interface BlockHeader {
    baseFeePerGas: string;
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: Transaction[]
    transactionsRoot: string;
    uncles: any;
}

export interface Transaction {
    blockHash: string;
    blockNumber: string;
    chainId: string;
    from: string;
    gas: string;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: string;
    r: string;
    s: string;
    to: string;
    transactionIndex: string;
    type: string;
    v: string;
    value: string;
}