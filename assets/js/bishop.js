import Board from './board.js';
import Piece from './piece.js';

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
                    if (lookForChecks) {
                        if (Board.getInstance().findChecks(this.colour, 
                            {
                                oldCoords: [this.position.rank, this.position.file], 
                                newCoords: [rank, file],
                                ep: false
                            }
                        )) {
                            moves.push([rank, file]);
                        }
                    } else {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (lookForChecks) {
                    if (!Board.getInstance().findChecks(this.colour, 
                        {
                            oldCoords: [this.position.rank, this.position.file], 
                            newCoords: [rank, file],
                            ep: false
                        }
                    )) {
                        moves.push([rank, file]);
                    }
                } else {
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
                    if (lookForChecks) {
                        let checks = Board.getInstance().findChecks(this.colour, 
                            {
                                oldCoords: [this.position.rank, this.position.file], 
                                newCoords: [rank, file],
                                ep: false
                            }
                        );
                        console.log(checks);
                        if (!checks) {
                            console.log('addng move');
                            moves.push([rank, file]);
                        }
                    } else {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (lookForChecks) {
                    if (!Board.getInstance().findChecks(this.colour, 
                        {
                            oldCoords: [this.position.rank, this.position.file], 
                            newCoords: [rank, file],
                            ep: false
                        }
                    )) {
                        console.log('addng move');
                        moves.push([rank, file]);
                    }
                } else {
                    console.log('addng move');
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
                    if (lookForChecks) {
                        if (!Board.getInstance().findChecks(this.colour, 
                            {
                                oldCoords: [this.position.rank, this.position.file], 
                                newCoords: [rank, file],
                                ep: false
                            }
                        )) {
                            moves.push([rank, file]);
                        }
                    } else {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (lookForChecks) {
                    if (!Board.getInstance().findChecks(this.colour, 
                        {
                            oldCoords: [this.position.rank, this.position.file], 
                            newCoords: [rank, file],
                            ep: false
                        }
                    )) {
                        moves.push([rank, file]);
                    }
                } else {
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
                    if (lookForChecks) {
                        if (!Board.getInstance().findChecks(this.colour, 
                            {
                                oldCoords: [this.position.rank, this.position.file], 
                                newCoords: [rank, file],
                                ep: false
                            }
                        )) {
                            moves.push([rank, file]);
                        }
                    } else {
                        moves.push([rank, file]);
                    }
                }
                break;
            } else {
                if (lookForChecks) {
                    if (!Board.getInstance().findChecks(this.colour, 
                        {
                            oldCoords: [this.position.rank, this.position.file], 
                            newCoords: [rank, file],
                            ep: false
                        }
                    )) {
                        moves.push([rank, file]);
                    }
                } else {
                    moves.push([rank, file]);
                }
            }
        }
        console.log(moves);
        return moves;
    }
}