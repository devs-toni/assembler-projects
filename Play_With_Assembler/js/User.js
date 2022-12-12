class User {
    constructor(name) {
        this.name = name;
        this.score = 'Currently playing...';
    }

    setUser(e) {
        e.preventDefault();
        this.name = e.target[0].value;
        this.isPlaying = true;
        changeDomToNextForm('userDiv', 'gameDiv');
        pushInRegister(this.name, this.score, true);
        game.currentUser = this;
        timer = setInterval(() => {
            console.log(this.time);
            this.time += 1;
        }, 1000);
    }
}

    playAgain(e) {
        this.name = e.target.value;
        this.isPlaying = true;
        changeDomToNextForm('userDiv', 'gameDiv');
    }
}