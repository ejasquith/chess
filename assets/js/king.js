import Board from './board.js';
import Piece from './piece.js';
import Rook from './rook.js';

export default class King extends Piece {
    getValidMoves(board, lookForChecks = true) {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.file;

        //ADD LOGIC FOR CHECKS
        if (rank + 1 <= 7 && 
            (board[rank + 1][file] === undefined || board[rank + 1][file].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank + 1, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank + 1, file]);
                }
        }
        if (rank + 1 <= 7 && file + 1 <= 7 && 
            (board[rank + 1][file + 1] === undefined || board[rank + 1][file + 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank + 1, file + 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank + 1, file + 1]);
                }
        }
        if (rank + 1 <= 7 && file - 1 >= 0 &&
            (board[rank + 1][file - 1] === undefined || board[rank + 1][file - 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank + 1, file - 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank + 1, file - 1]);
                }
        }
        if (rank - 1 >= 0 &&
            (board[rank - 1][file] === undefined || board[rank - 1][file].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank - 1, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank - 1, file]);
                }
        }
        if (rank - 1 >= 0 && file + 1 <= 7 &&
            (board[rank - 1][file + 1] === undefined || board[rank - 1][file + 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank - 1, file + 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank - 1, file + 1]);
                }
        }
        if (rank - 1 >= 0 && file - 1 >= 0 &&
            (board[rank - 1][file - 1] === undefined || board[rank - 1][file - 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank - 1, file - 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank - 1, file - 1]);
                }
        }
        if (file + 1 <= 7 &&
            (board[rank][file + 1] === undefined || board[rank][file + 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank, file + 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file + 1]);
                }
        }
        if (file - 1 >= 0 &&
            (board[rank][file - 1] === undefined || board[rank][file - 1].colour !== this.colour)) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [rank, file],
                    newCoords: [rank, file - 1],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file - 1]);
                }
        }

        // can only castle if king hasn't moved, and can't castle out of check
        if (!this.hasMoved && (!lookForChecks || !Board.getInstance().findChecks(this.colour))) {
            if (board[rank][0] instanceof Rook && !board[rank][0].hasMoved) {
                let flag = false;
                let slice = board[rank].slice(1,4);
                for (let square in slice) {
                    // can't castle through check
                    if (slice[square] !== undefined || (!lookForChecks || 
                        Board.getInstance().findChecks(this.colour, {
                            oldCoords: [rank, file],
                            newCoords: [rank, 1 + parseInt(square)],
                            ep: false,
                            castle: false
                        }))) {
                        flag = true;
                    }
                }
                // can't castle into check
                if (!flag &&
                    (!lookForChecks || !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [rank, file],
                        newCoords: [rank, file - 2],
                        ep: false,
                        castle: true
                }))) {
                    moves.push([rank, file - 2]);
                }
            }
            if (board[rank][7] instanceof Rook && !board[rank][7].hasMoved) {
                let flag = false;
                let slice = board[rank].slice(5,7);
                for (let square in slice) {
                    if (slice[square] !== undefined || (!lookForChecks ||
                        Board.getInstance().findChecks(this.colour, {
                            oldCoords: [rank, file],
                            newCoords: [rank, 5 + parseInt(square)],
                            ep: false,
                            castle: false
                        }))) {
                        flag = true;
                    }
                }
                if (!flag &&
                    (!lookForChecks || !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [rank, file],
                        newCoords: [rank, file + 2],
                        ep: false,
                        castle: true
                }))) {
                    moves.push([rank, file + 2]);
                }
            }
        }

        return moves;
    }
}