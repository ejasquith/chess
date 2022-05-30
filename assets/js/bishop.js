import Piece from './piece.js';
import Board from './board.js';

export default class Bishop extends Piece {
    getValidMoves(board, lookForChecks = true) {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.file;
        while (rank < 7 && file < 7) {
            rank++;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [rank, file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file]);
                }
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank < 7 && file > 0) {
            rank++;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    if (board[rank][file].colour !== this.colour) {
                        if (!lookForChecks ||
                            !Board.getInstance().findChecks(this.colour, {
                            oldCoords: [this.position.rank, this.position.file],
                            newCoords: [rank, file],
                            ep: false,
                            castle: false
                        })) {
                            moves.push([rank, file]);
                        }
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file]);
                }
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file < 7) {
            rank--;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [rank, file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file]);
                }
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file > 0) {
            rank--;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [rank, file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, file]);
                }
            }
        }
        return moves;
    }
}