import Piece from './piece.js';

export default class Bishop extends Piece {
    getValidMoves(board) {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.file;
        while (rank < 7 && file < 7) {
            rank++;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank < 7 && file > 0) {
            rank++;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file < 7) {
            rank--;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file > 0) {
            rank--;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }
        return moves;
    }
}