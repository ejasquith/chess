import Board from './board.js';

export default class Piece {
    constructor(colour, position) {
        this.colour = colour;
        this.position = position;
        this.hasMoved = false;
    }
    
    getValidMoves(board, lookForChecks = true) {}

    move(file, rank, callback) {
        let oldRank = this.position.rank;
        let oldFile = this.position.file;
        this.position.file = file;
        this.position.rank = rank;
        Board.getInstance().movePiece(this, [oldRank, oldFile], [this.position.rank, this.position.file], callback);        
        this.hasMoved = true;
    }
}