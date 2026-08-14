export class ROLE {
    constructor(code, value) {
        this.code = code;
        this.value = value;
    }

    static SUPERADMIN = new ROLE(1, 'Super Admin');
    static ADMIN = new ROLE(2, 'Admin');
    static USER = new ROLE(3, 'User');
}
