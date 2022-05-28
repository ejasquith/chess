import Pawn from './pawn.js';
import Rook from './rook.js';
import Knight from './knight.js';
import Bishop from './bishop.js';
import Queen from './queen.js';
import King from './king.js';
import Game from './game.js';

export default class Board {
    static instance = undefined;
    constructor() {
        this.array = [];
        this.selectedPiece = undefined;
        this.initialiseBoard();
    }

    static getInstance() {
        if (Board.instance === undefined) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    initialiseBoard() {
        for (let rank = 7; rank >= 0; rank--) {
            let rankArray = [];
            let colour = (rank <= 1) ? 'white' : 'black';
    
            for (let file = 0; file < 8; file++) {
                if (rank === 0 || rank === 7) {
                    let piece;
                    switch (file) {
                        case 0:
                        case 7:
                            piece = new Rook(colour, {file: file, rank: rank});
                            break;
                        case 1:
                        case 6:
                            piece = new Knight(colour, {file: file, rank: rank});
                            break;
                        case 2:
                        case 5:
                            piece = new Bishop(colour, {file: file, rank: rank});
                            break;
                        case 3:
                            piece = new Queen(colour, {file: file, rank: rank});
                            break;
                        case 4:
                            piece = new King(colour, {file: file, rank: rank});
                            break;
                        default:
                            // will never be run, but for completeness throw an error
                            throw 'Error: file index out of bounds';
                    }
                    rankArray.push(piece);
                } else if (rank === 1 || rank === 6) {
                    let pawn = new Pawn(colour, {file: file, rank: rank});
                    rankArray.push(pawn);
                } else {
                    rankArray.push(undefined);
                }
            }
            this.array.push(rankArray);
        }
        console.log(this.array);
    }

    movePiece(piece, oldCoords, newCoords) {
        //this.array[oldCoords[0]].splice(oldCoords[1], 1, undefined);
        this.array[oldCoords[0]][oldCoords[1]] = undefined;
        let capturedPiece = this.array[newCoords[0]][newCoords[1]];
        this.array[newCoords[0]][newCoords[1]] = piece;

        // castling - move rook as well
        if (piece instanceof King && newCoords[1] === oldCoords[1] + 2) {
            let rook = this.array[oldCoords[0]][7];
            this.array[oldCoords[0]][7] = undefined;
            this.array[oldCoords[0]][5] = rook;
        } else if (piece instanceof King && newCoords[1] === oldCoords[1] - 2) {
            let rook = this.array[oldCoords[0]][0];
            this.array[oldCoords[0]][0] = undefined;
            this.array[oldCoords[0]][3] = rook;
        }

        Game.getInstance().updateHistory({piece: piece, oldCoords: oldCoords, newCoords: newCoords, capturedPiece: capturedPiece, checkmate: false, check: false});
        Game.getInstance().updateTurn();
    }
}