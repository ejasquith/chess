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

    generateHistoryString() {
        let turn = 1;
        let string = '';
        for (let move of this.history) {
            if (move[0].colour === 'white') {
                string += `${turn}. `;
            }
            let moveString = '';
            switch (move[0].constructor.name) {
                case 'Pawn':
                    break;
                case 'Knight':
                    moveString += 'N';
                    break;
                default:
                    moveString += move[0].constructor.name.charAt(0);
            }
            moveString += Game.#getAlgebraicCoords(move[2][1], move[2][0]);
            string += moveString + ' ';

            if (move[0].colour === 'black') {
                turn++;
            }
        }

        return string;
    }

    updateTurn() {
        if (this.activePlayer === 'black') {
            this.turn++;
            this.activePlayer = 'white';
        } else {
            this.activePlayer = 'black';
        }
    }

    static #getAlgebraicCoords(file, rank) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return letters[file] + (rank+1);
    }
}