const USERNAME_DEFAULT = 'Anonymous';

class User {

    userName;

    constructor(userName) {
        this.userName = userName;
    }

    getUserName() {
        return this.userName || USERNAME_DEFAULT;
    }
}

export default User;