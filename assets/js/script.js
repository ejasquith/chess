import Board from './board.js';

document.addEventListener('DOMContentLoaded', function() {
    let board = Board.getInstance().array;
    initialiseHTML(board);
    for (let square of document.getElementsByClassName('square')) {
        square.addEventListener('click', squareClickHandler);
    }
});

function getAlgebraicCoords(file, rank) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[file] + (rank+1);
}

function initialiseHTML(board) {
    let boardTemp = board.reverse();
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
}

function displayValidMoves(moves) {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        square.style.backgroundColor = (squareCoords[0] % 2 === 0 ^ squareCoords[1] % 2 === 0) ? 
                    square.style.backgroundColor = '#ebd7b2' : square.style.backgroundColor = '#ac8561';
        // moves.includes(...) didn't work - possibly because two arrays with the same data inside aren't identical
        for (let move of moves) {
            if (squareCoords[0] === move[0] && squareCoords[1] === move[1]) {
                square.style.backgroundColor = (squareCoords[0] % 2 === 0 ^ squareCoords[1] % 2 === 0) ? 
                    square.style.backgroundColor = '#df7561' : square.style.backgroundColor = '#d26652';
            }
        }
    }
}

function squareClickHandler(event) {
    let file = event.currentTarget.getAttribute('data-file');
    let rank = event.currentTarget.getAttribute('data-rank');
    let piece = Board.getInstance().array[rank][file];
    if (piece !== undefined) {
        displayValidMoves(piece.getValidMoves(Board.getInstance().array));
    }
}