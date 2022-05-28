export default class Game {
    static instance = undefined;
    constructor() {
        this.activePlayer = 'white';
        this.turn = 1;
        this.history = [];
    }

    static getInstance() {
        if (Game.instance === undefined) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    updateHistory(piece, oldCoords, newCoords) {
        this.history.push([piece, oldCoords, newCoords]);
    }

    updateTurn() {
        if (this.activePlayer === 'black') {
            this.turn++;
            this.activePlayer = 'white';
        } else {
            this.activePlayer = 'black';
        }
    }

    #getAlgebraicCoords(file, rank) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return letters[file] + (rank+1);
    }
}