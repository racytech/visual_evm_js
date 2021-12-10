// TODO 

export class Memory {

    private memory = [];

    constructor(m?: Memory) {
        if (m) {
            this.memory = m.getMemory();
        }
    }

    public getMemory() {
        return this.memory
    }
}