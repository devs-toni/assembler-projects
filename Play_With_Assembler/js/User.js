class User {
    constructor(name) {
        this.name = name;
        this.score = 'Currently playing...';
    }

    setUser(e) {
        e.preventDefault();
        this.name = e.target[0].value;
    }

    setScore(){}
}