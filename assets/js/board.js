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
    }

    movePiece(piece, oldCoords, newCoords, callback) {
        let capturedPiece;

        // en passant
        // if pawn is moving file (capturing) and new square does not have a piece (en passant)
        let enPassant = false;
        if (piece instanceof Pawn && newCoords[1] !== oldCoords[1] && this.array[newCoords[0]][newCoords[1]] === undefined) {
            capturedPiece = this.array[oldCoords[0]][newCoords[1]];
            this.array[oldCoords[0]][newCoords[1]] = undefined;
            enPassant = true;
        }

        this.array[oldCoords[0]][oldCoords[1]] = undefined;
        if (!enPassant) {
            capturedPiece = this.array[newCoords[0]][newCoords[1]];
        }
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

        // pawn promotion
        let promotion = false;
        if (piece instanceof Pawn && (newCoords[0] === 0 || newCoords[0] === 7)) {
            promotion = true;
            // display modal
            let modal = document.getElementById('promotion-modal');
            modal.innerHTML = '<p>Choose piece to promote to:</p>';

            modal.style.display = 'block';

            let options = ['Queen', 'Rook', 'Bishop', 'Knight'];
            for (let option of options) {
                let btn = document.createElement('button');
                btn.innerHTML = option;
                btn.setAttribute('class', 'promotion-btn');
                btn.setAttribute('id', `promotion-btn-${option.toLowerCase()}`);
                document.getElementById('promotion-modal').appendChild(btn);
            }

            let promotionButtons = document.getElementsByClassName('promotion-btn');
            for (let btn of promotionButtons) {
                btn.addEventListener('click', function(event) {
                    modal.style.display = 'none';
                    let colour = newCoords[0] === 7 ? 'white' : 'black';
                    // switch for piece selection
                    switch (event.currentTarget.id) {
                        case 'promotion-btn-queen':
                            piece = new Queen(colour, {file: newCoords[1], rank: newCoords[0]});
                            piece.hasMoved = true;
                            Board.getInstance().array[newCoords[0]][newCoords[1]] = piece;
                            break;
                        case 'promotion-btn-rook':
                            piece = new Rook(colour, {file: newCoords[1], rank: newCoords[0]});
                            piece.hasMoved = true;
                            Board.getInstance().array[newCoords[0]][newCoords[1]] = piece;
                            break;
                        case 'promotion-btn-bishop':
                            piece = new Bishop(colour, {file: newCoords[1], rank: newCoords[0]});
                            piece.hasMoved = true;
                            Board.getInstance().array[newCoords[0]][newCoords[1]] = piece;
                            break;
                        case 'promotion-btn-knight':
                            piece = new Knight(colour, {file: newCoords[1], rank: newCoords[0]});
                            piece.hasMoved = true;
                            Board.getInstance().array[newCoords[0]][newCoords[1]] = piece;
                            break;
                    }
                    Game.getInstance().updateHistory({piece: piece, oldCoords: oldCoords, newCoords: newCoords, capturedPiece: capturedPiece, checkmate: false, check: false, promotion: promotion});
                    Game.getInstance().updateTurn();
                    callback();
                })
            }
            
        } else {
            Game.getInstance().updateHistory({piece: piece, oldCoords: oldCoords, newCoords: newCoords, capturedPiece: capturedPiece, checkmate: false, check: false, promotion: promotion});
            Game.getInstance().updateTurn();
            callback();
        }
    }

    findChecks(colour, move) {
        // before every move, will this put either king in check?
        // in getValidMove, if own king in check, not valid move
        // make temporary array with move made to check
        
        let board = this.array;

        let check = false;

        // if move passed, use modified board state
        if (move !== undefined) {
            let piece = board[move.oldCoords[0]][move.oldCoords[1]];
            board[move.newCoords[0]][move.newCoords[1]] = piece;
            if (move.ep) {
                board[move.oldCoords[0]][move.newCoords[1]] = undefined;
            }
            board[move.oldCoords[0]][move.oldCoords[1]] = undefined;
        }

        for (let rank of board) {
            for (let square of rank) {
                if (square !== undefined && square.colour !== colour) {
                    let moves = square.getValidMoves(board, false);
                    for (let move of moves) {
                        if (board[move[0]][move[1]] !== undefined && board[move[0]][move[1]].constructor.name === 'King' && board[move[0]][move[1]].colour === colour) {
                            check = true;
                        }
                    }
                }
            }
        }
        console.log(check);
        return check;
    }
}