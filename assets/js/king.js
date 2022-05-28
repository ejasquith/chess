import Board from './board.js';
import Piece from './piece.js';
import Rook from './rook.js';

export default class King extends Piece {
    getValidMoves(board) {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.file;

        //ADD LOGIC FOR CHECKS
        if (rank + 1 <= 7 && 
            (board[rank + 1][file] === undefined || board[rank + 1][file].colour !== this.colour)) {
            moves.push([rank + 1, file]);
        }
        if (rank + 1 <= 7 && file + 1 <= 7 && 
            (board[rank + 1][file + 1] === undefined || board[rank + 1][file + 1].colour !== this.colour)) {
            moves.push([rank + 1, file + 1]);
        }
        if (rank + 1 <= 7 && file - 1 >= 0 &&
            (board[rank + 1][file - 1] === undefined || board[rank + 1][file - 1].colour !== this.colour)) {
            moves.push([rank + 1, file - 1]);
        }
        if (rank - 1 >= 0 &&
            (board[rank - 1][file] === undefined || board[rank - 1][file].colour !== this.colour)) {
            moves.push([rank - 1, file]);
        }
        if (rank - 1 >= 0 && file + 1 <= 7 &&
            (board[rank - 1][file + 1] === undefined || board[rank - 1][file + 1].colour !== this.colour)) {
            moves.push([rank - 1, file + 1]);
        }
        if (rank - 1 >= 0 && file - 1 >= 0 &&
            (board[rank - 1][file - 1] === undefined || board[rank - 1][file - 1].colour !== this.colour)) {
            moves.push([rank - 1, file - 1]);
        }
        if (file + 1 <= 7 &&
            (board[rank][file + 1] === undefined || board[rank][file + 1].colour !== this.colour)) {
            moves.push([rank, file + 1]);
        }
        if (file - 1 >= 0 &&
            (board[rank][file - 1] === undefined || board[rank][file - 1].colour !== this.colour)) {
            moves.push([rank, file - 1]);
        }

        if (!this.hasMoved) {
            if (board[rank][0] instanceof Rook && !board[rank][0].hasMoved) {
                let flag = false;
                for (let square of board[rank].slice(1,4)) {
                    if (square !== undefined) {
                        flag = true;
                    }
                }
                if (!flag) {
                    moves.push([rank, file - 2]);
                }
            }
            if (board[rank][7] instanceof Rook && !board[rank][7].hasMoved) {
                let flag = false;
                for (let square of board[rank].slice(5,7)) {
                    if (square !== undefined) {
                        flag = true;
                    }
                }
                if (!flag) {
                    moves.push([rank, file + 2]);
                }
            }
        }

        return moves;
    }
}