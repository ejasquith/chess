export default class Game {
    static instance = undefined;
    constructor() {
        this.activePlayer = 'white';
        this.blackInCheck = false;
        this.whiteInCheck = false;
        this.turn = 1;
        this.history = [];
        this.FENHistory = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'];
    }

    static getInstance() {
        if (Game.instance === undefined) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    static resetInstance() {
        Game.instance = undefined;
        return Game.getInstance();
    }

    static getAlgebraicCoords(file, rank) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return letters[file] + (rank+1);
    }

    updateHistory(move) {
        this.history.push(move);
    }

    generateHistoryString() {
        let turn = 1;
        let string = '';
        for (let move of this.history) {
            if (move.piece.colour === 'white') {
                string += `${turn}. `;
            }

            let moveString = '';

            if (move.piece.constructor.name === 'King' && move.newCoords[1] === move.oldCoords[1] + 2) {
                moveString += 'O-O';
            } else if (move.piece.constructor.name === 'King' && move.newCoords[1] === move.oldCoords[1] - 2) {
                moveString += 'O-O-O';
            } else {
                if (move.promotion) {
                    if (move.capturedPiece !== undefined) {
                        moveString += Game.getAlgebraicCoords(move.oldCoords[1], move.oldCoords[0]).charAt(0);
                    }
                } else {
                    switch (move.piece.constructor.name) {
                        case 'Pawn':
                            if (move.capturedPiece !== undefined) {
                                moveString += Game.getAlgebraicCoords(move.oldCoords[1], move.oldCoords[0]).charAt(0);
                            }
                            break;
                        case 'Knight':
                            moveString += 'N';
                            break;
                        default:
                            moveString += move.piece.constructor.name.charAt(0);
                    }
                }
                if (move.capturedPiece !== undefined) {
                    moveString += 'x';
                }
                moveString += Game.getAlgebraicCoords(move.newCoords[1], move.newCoords[0]);
            }
            if (move.promotion) {
                moveString += `=${move.piece.constructor.name.charAt(0)}`;
            }

            if (move.checkmate) {
                moveString += '#';
            } else if (move.check) {
                moveString += '+';
            }

            string += moveString + ' ';

            if (move.piece.colour === 'black') {
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

    checkDrawBy50Moves() {
        if (this.history.length <= 50) {
            return false;
        }

        let result = true;
        for (let move of this.history.slice(-50)) {
            if (move.piece.constructor.name === 'Pawn' || move.capturedPiece !== undefined) {
                result = false;
            }
        }
        return result;
    }

    checkDrawByThreefoldRepetition() {
        let result = false;
        for (let FEN of this.FENHistory) {
            if (this.FENHistory.filter(x => x === FEN).length >= 3) {
                result = true;
                break;
            }
        }
        return result;
    }
}