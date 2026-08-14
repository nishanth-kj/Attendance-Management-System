export class STATUS {
    constructor(code, value) {
        this.code = code;
        this.value = value;
    }

    static ACTIVE = new STATUS(1, 'ACTIVE');
    static INACTIVE = new STATUS(0, 'INACTIVE');
}

