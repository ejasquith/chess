import Board from './board.js';

export default class Piece {
    constructor(colour, position) {
        this.colour = colour;
        this.position = position;
        this.hasMoved = false;
    }
    
    getValidMoves(board) {}

    move(file, rank) {
        Board.getInstance().movePiece(this, [this.position.rank, this.position.file], [rank, file]);
        this.position.file = file;
        this.position.rank = rank;
        this.hasMoved = true;
        console.log('moving piece');
        // edit html, deal with captures
    }
}