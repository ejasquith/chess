import Board from './board.js';
import Piece from './piece.js';

export default class Knight extends Piece {
    getValidMoves(board, lookForChecks = true) {
        let rank = this.position.rank;
        let file = this.position.file;
        let moves = [];

        //how far the knight can move in x or y
        let offsets = [-2, -1, 1, 2];

        for (let offset of offsets) {
            for (let offset2 of offsets) {
                // must move 1 in one direction and 2 in other
                if (Math.abs(offset) === Math.abs(offset2)) {
                    continue;
                } else if (!((rank + offset > 7) || (rank + offset < 0) || (file + offset2 > 7) || (file + offset2 < 0))) {
                    if (board[rank + offset][file + offset2] !== undefined) {
                        if (board[rank + offset][file + offset2].colour !== this.colour) {
                            if (!lookForChecks ||
                                Board.getInstance().findChecks(this.colour, {
                                oldCoords: [this.position.rank, this.position.file],
                                newCoords: [rank + offset, file + offset2],
                                ep: false,
                                castle: false
                            })) {
                                moves.push([rank + offset, file + offset2]);
                            }
                        }
                    } else {
                        if (!lookForChecks ||
                            Board.getInstance().findChecks(this.colour, {
                            oldCoords: [this.position.rank, this.position.file],
                            newCoords: [rank + offset, file + offset2],
                            ep: false,
                            castle: false
                        })) {
                            moves.push([rank + offset, file + offset2]);
                        }
                    }
                }
            }
        }
        return moves;
    }
}