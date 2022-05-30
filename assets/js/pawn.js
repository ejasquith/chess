import Piece from './piece.js';
import Game from './game.js';
import Board from './board.js';

export default class Pawn extends Piece {
    getValidMoves(board, lookForChecks = true) {
        let moves = [];
        let sign = this.colour === 'white' ? 1 : -1;
        // undefined means either array location is empty (ie no piece), or doesn't exist
        // do need to check for out of bounds index here
        // actually probably don't - if pawn is on 8th/1st rank, that means it has promoted and is no longer pawn
        if (this.position.rank + sign <= 7 && board[this.position.rank+sign][this.position.file] === undefined) {
            if (!lookForChecks ||
                !Board.getInstance().findChecks(this.colour, {
                oldCoords: [this.position.rank, this.position.file],
                newCoords: [this.position.rank + sign, this.position.file],
                ep: false,
                castle: false
            })) {
                moves.push([this.position.rank+sign, this.position.file]);
            }
            // no need to check index here as it can only ever be true when pawn is on second/seventh rank
            if (!this.hasMoved && board[this.position.rank+2*sign][this.position.file] === undefined) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [this.position.rank + 2*sign, this.position.file],
                    ep: false,
                    castle: false
                })) {
                    moves.push([this.position.rank+2*sign, this.position.file]);
                }
            }
        }
        // doesn't need to check if index out of bounds, because out of bounds values return undefined
        // would return error when checking piece colour, if the condition didn't fail and
        // skip over second condition when returned undefined
        if (board[this.position.rank+sign][this.position.file+sign] !== undefined 
            && board[this.position.rank+sign][this.position.file+sign].colour !== this.colour) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [this.position.rank + sign, this.position.file + sign],
                    ep: false,
                    castle: false
                })) {
                    moves.push([this.position.rank+sign, this.position.file+sign])
                }
        }
        if (board[this.position.rank+sign][this.position.file-sign] !== undefined
            && board[this.position.rank+sign][this.position.file-sign].colour !== this.colour) {
                if (!lookForChecks ||
                    !Board.getInstance().findChecks(this.colour, {
                    oldCoords: [this.position.rank, this.position.file],
                    newCoords: [this.position.rank + sign, this.position.file - sign],
                    ep: false,
                    castle: false
                })) {
                    moves.push([this.position.rank+sign, this.position.file-sign])
                }
        }

        // logic for en passant
        let game = Game.getInstance();
        if (game.history.length !== 0) {
            let lastMove = game.history[game.history.length - 1];

            if ((this.position.rank === 3 || this.position.rank === 4) &&
                board[this.position.rank][this.position.file + 1] !== undefined &&
                board[this.position.rank][this.position.file + 1].constructor.name === 'Pawn' &&
                lastMove.piece.constructor.name === 'Pawn' &&
                lastMove.newCoords[0] === this.position.rank &&
                lastMove.newCoords[1] === this.position.file + 1 &&
                (lastMove.oldCoords[0] === 1 || lastMove.oldCoords[0] === 6)) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [this.position.rank + sign, this.position.file + 1],
                        ep: true,
                        castle: false
                    })) {
                        moves.push([this.position.rank + sign, this.position.file + 1]);
                    }
            }

            if ((this.position.rank === 3 || this.position.rank === 4) &&
                board[this.position.rank][this.position.file - 1] !== undefined &&
                board[this.position.rank][this.position.file - 1].constructor.name === 'Pawn' &&
                lastMove.piece.constructor.name === 'Pawn' &&
                lastMove.newCoords[0] === this.position.rank &&
                lastMove.newCoords[1] === this.position.file - 1 &&
                (lastMove.oldCoords[0] === 1 || lastMove.oldCoords[0] === 6)) {
                    if (!lookForChecks ||
                        !Board.getInstance().findChecks(this.colour, {
                        oldCoords: [this.position.rank, this.position.file],
                        newCoords: [this.position.rank + sign, this.position.file - 1],
                        ep: true,
                        castle: false
                    })) {
                        moves.push([this.position.rank + sign, this.position.file - 1]);
                    }
            }
        }
        return moves;
    }
}