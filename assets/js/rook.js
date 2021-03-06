import Piece from './piece.js';
import Board from './board.js';

export default class Rook extends Piece {
    getValidMoves(board, lookForChecks = true) {
        let moves = [];
        for (let rank = this.position.rank + 1; rank <= 7; rank++) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [rank, this.position.file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([rank, this.position.file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, this.position.file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, this.position.file]);
                }
            }
        }
        for (let rank = this.position.rank - 1; rank >= 0; rank--) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [rank, this.position.file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([rank, this.position.file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [rank, this.position.file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([rank, this.position.file]);
                }
            }
        }

        for (let file = this.position.file + 1; file <= 7; file++) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [this.position.rank, file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([this.position.rank, file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [this.position.rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([this.position.rank, file]);
                }
            }
        }
        for (let file = this.position.file - 1; file >= 0; file--) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [this.position.rank, file],
                        ep: false,
                        castle: false
                    })) {
                        moves.push([this.position.rank, file]);
                    }
                }
                break;
            } else {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [this.position.rank, file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([this.position.rank, file]);
                }
            }
        }

        return moves;
    }
}