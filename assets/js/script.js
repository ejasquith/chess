import Pawn from './pawn.js';
import Rook from './rook.js';
import Knight from './knight.js';
import Bishop from './bishop.js';
import Queen from './queen.js';
import King from './king.js';

// global variable - need to figure out a solution without this
let board;

document.addEventListener('DOMContentLoaded', function() {
    board = initialiseBoard();
    for (let square of document.getElementsByClassName('square')) {
        square.addEventListener('click', squareClickHandler);
    }
});

function getAlgebraicCoords(file, rank) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[file] + (rank+1);
}

function initialiseBoard() {
    let board = [];
    let html = [];

    for (let rank = 7; rank >= 0; rank--) {
        let rankArray = [];
        let colour = (rank <= 1) ? 'white' : 'black';

        for (let file = 0; file < 8; file++) {
            let node = document.createElement('div');
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
                node.classList.add('square');
                node.setAttribute('data-file', file);
                node.setAttribute('data-rank', rank);
                node.style.backgroundImage = `url(../assets/images/${piece.constructor.name.toLowerCase()}-${colour}.png)`
            } else if (rank === 1 || rank === 6) {
                let pawn = new Pawn(colour, {file: file, rank: rank});
                rankArray.push(pawn);
                node.classList.add('square');
                node.setAttribute('data-file', file);
                node.setAttribute('data-rank', rank);
                node.style.backgroundImage = `url(../assets/images/pawn-${colour}.png)`;
            } else {
                rankArray.push();
                node.classList.add('square');
                node.setAttribute('data-file', file);
                node.setAttribute('data-rank', rank);
            }

            if (rank % 2 === 0 ^ file % 2 === 0) {
                node.style.backgroundColor = 'white';
            } else {
                node.style.backgroundColor = '#333';
            }   

            // container.appendChild(node);
            document.getElementById('board').appendChild(node);
        }
        board.push(rankArray);
    }
    // reverse order of ranks in board - rank arrays themselves untouched
    board.reverse();
    return board;
}

function displayValidMoves(moves) {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        if (squareCoords[0] % 2 === 0 ^ squareCoords[1] % 2 === 0) {
            square.style.backgroundColor = 'white';
        } else {
            square.style.backgroundColor = '#333';
        }   
        // moves.includes(...) didn't work - possibly because two arrays with the same data inside aren't identical
        for (let move of moves) {
            if (squareCoords[0] === move[0] && squareCoords[1] === move[1]) {
                square.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            }
        }
    }
}

function squareClickHandler(event) {
    let file = event.currentTarget.getAttribute('data-file');
    let rank = event.currentTarget.getAttribute('data-rank');
    let piece = board[rank][file];
    if (piece !== undefined) {
        displayValidMoves(piece.getValidMoves(board));
    }
}