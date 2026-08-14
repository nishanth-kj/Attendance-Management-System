export class RESPONSE_STATUS {
    constructor(code, value) {
        this.code = code;
        this.value = value;
    }

    static SUCCESS = new RESPONSE_STATUS(1, 'SUCCESS');
    static ERROR = new RESPONSE_STATUS(0, 'ERROR');
}
