class User {
    constructor(name) {
        this.name = name;
        this.score = 'Currently playing...';
    }

    setUser(e) {
        e.preventDefault();
        user.name = e.target[0].value;
        changeDomToNextForm('userDiv', 'gameDiv');
    }

    setScore(){}
}