import Piece from './piece.js';

export default class Queen extends Piece {
    getValidMoves(board) {
        let moves = [];
        for (let rank = this.position.rank + 1; rank <= 7; rank++) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    moves.push([rank, this.position.file]);
                }
                break;
            } else {
                moves.push([rank, this.position.file]);
            }
        }
        for (let rank = this.position.rank - 1; rank >= 0; rank--) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    moves.push([rank, this.position.file]);
                }
                break;
            } else {
                moves.push([rank, this.position.file]);
            }
        }

        for (let file = this.position.file + 1; file <= 7; file++) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    moves.push([this.position.rank, file]);
                }
                break;
            } else {
                moves.push([this.position.rank, file]);
            }
        }
        for (let file = this.position.file - 1; file >= 0; file--) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    moves.push([this.position.rank, file]);
                }
                break;
            } else {
                moves.push([this.position.rank, file]);
            }
        }

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