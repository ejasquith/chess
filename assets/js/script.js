import Board from './board.js';

document.addEventListener('DOMContentLoaded', function() {
    let board = Board.getInstance().array;
    initialiseHTML(board.reverse());
});

function getAlgebraicCoords(file, rank) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[file] + (rank+1);
}

function initialiseHTML(boardTemp) {
    document.getElementById('board').innerHTML = '';
    for (let rank = 7; rank >= 0; rank--) { 
        for (let file = 0; file < 8; file++) {
            let node = document.createElement('div');
            node.classList.add('square');
            node.setAttribute('data-file', file);
            node.setAttribute('data-rank', rank);
            node.style.backgroundColor = (rank % 2 === 0 ^ file % 2 === 0) ? 
                node.style.backgroundColor = '#ebd7b2' : node.style.backgroundColor = '#ac8561';
            if (boardTemp[rank][file] !== undefined) {
                node.style.backgroundImage = `url(../assets/images/${boardTemp[rank][file].constructor.name.toLowerCase()}-${boardTemp[rank][file].colour}.png)`;
            }
            document.getElementById('board').appendChild(node);
        }
    }
    for (let square of document.getElementsByClassName('square')) {
        square.addEventListener('click', squareClickHandler);
    }
}

function displayValidMoves(moves) {
    let squares = document.getElementsByClassName('square');
    clearHighlights();
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        // moves.includes(...) didn't work - possibly because two arrays with the same data inside aren't identical
        for (let move of moves) {
            if (squareCoords[0] === move[0] && squareCoords[1] === move[1]) {
                square.style.backgroundColor = (squareCoords[0] % 2 === 0 ^ squareCoords[1] % 2 === 0) ? 
                    square.style.backgroundColor = '#df7561' : square.style.backgroundColor = '#d26652';
            }
        }
    }
}

function clearHighlights() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        square.style.backgroundColor = (squareCoords[0] % 2 === 0 ^ squareCoords[1] % 2 === 0) ? 
            square.style.backgroundColor = '#ebd7b2' : square.style.backgroundColor = '#ac8561';
    }
}

function squareClickHandler(event) {
    let file = parseInt(event.currentTarget.getAttribute('data-file'));
    let rank = parseInt(event.currentTarget.getAttribute('data-rank'));
    let board = Board.getInstance();

    clearHighlights();
    
    if (board.selectedPiece === undefined) {
        // if no piece selected, select new piece and display its moves
        if (board.array[rank][file] !== undefined) {
            board.selectedPiece = board.array[rank][file];
            if (board.selectedPiece !== undefined && board.selectedPiece.getValidMoves(board.array).length !== 0) {
                displayValidMoves(board.selectedPiece.getValidMoves(board.array));
            } else {
                board.selectedPiece = undefined;
            }
        }
    } else {
        // if piece is selected, and it has valid moves:
        if (board.selectedPiece.getValidMoves(board.array).length !== 0) {
            // check if clicked square is in its valid moves
            let found = false;
            for (let move of board.selectedPiece.getValidMoves(board.array)) {
                if (rank === move[0] && file === move[1]) {
                    // if it is, move the piece, deselect it, and update HTML:
                    board.selectedPiece.move(file, rank);
                    board.selectedPiece = undefined;
                    initialiseHTML(board.array);
                    found = true;
                    break;
                }
            }
            // if it wasn't:
            if (!found) {
                // select the piece that was clicked on (or undefined if it was an empty square)
                board.selectedPiece = board.array[rank][file];
                // if the new piece doesn't have any moves, deselect it
                if (board.selectedPiece !== undefined && board.selectedPiece.getValidMoves(board.array).length === 0) {
                    board.selectedPiece = undefined;
                // if it does, display those moves
                } else if (board.selectedPiece !== undefined) {
                    displayValidMoves(board.selectedPiece.getValidMoves(board.array));
                }
            }
        }
        // if the previously selected piece had no valid moves, select new piece
        else {
            board.selectedPiece = board.array[rank][file];
        }
    }
}