import Board from './board.js';

export default class Piece {
    constructor(colour, position) {
        this.colour = colour;
        this.position = position;
        this.hasMoved = false;
    }
    
    getValidMoves(board, lookForChecks = true) {}

    move(file, rank, callback) {
        Board.getInstance().movePiece(this, [this.position.rank, this.position.file], [rank, file], callback);
        this.position.file = file;
        this.position.rank = rank;
        this.hasMoved = true;
    }
}