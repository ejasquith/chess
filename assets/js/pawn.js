import Piece from './piece.js';

export default class Pawn extends Piece {
    getValidMoves(board) {
        let moves = [];
        let sign = this.colour === 'white' ? 1 : -1;
        // undefined means either array location is empty (ie no piece), or doesn't exist
        // do need to check for out of bounds index here
        // actually probably don't - if pawn is on 8th/1st rank, that means it has promoted and is no longer pawn
        if (this.position.rank + sign <= 7 && board[this.position.rank+sign][this.position.file] === undefined) {
            moves.push([this.position.rank+sign, this.position.file]);
            // no need to check index here as it can only ever be true when pawn is on second/seventh rank
            if (!this.hasMoved && board[this.position.rank+2*sign][this.position.file] === undefined) {
                moves.push([this.position.rank+2*sign, this.position.file]);
            }
        }
        // doesn't need to check if index out of bounds, because out of bounds values return undefined
        // would return error when checking piece colour, if the condition didn't fail and
        // skip over second condition when returned undefined
        if (board[this.position.rank+sign][this.position.file+sign] !== undefined 
            && board[this.position.rank+sign][this.position.file+sign].colour !== this.colour) {
                moves.push([this.position.rank+sign, this.position.file+sign])
        }
        if (board[this.position.rank+sign][this.position.file-sign] !== undefined
            && board[this.position.rank+sign][this.position.file-sign].colour !== this.colour) {
                moves.push([this.position.rank+sign, this.position.file-sign])
        }
        return moves;
    }
}