import Board from './board.js';
import Game from './game.js';

document.addEventListener('DOMContentLoaded', function() {
    let board = Board.getInstance().array;
    initialiseHTML(board.reverse());
});

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

function updateHistory() {
    let historyArea = document.getElementById('game-history');
    historyArea.innerHTML = Game.getInstance().generateHistoryString();

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
    let game = Game.getInstance();

    clearHighlights();

    if (board.selectedPiece === undefined) {
        // if no piece selected, select new piece and display its moves if it is the right colour
        if (board.array[rank][file] !== undefined && board.array[rank][file].colour === game.activePlayer) {
            board.selectedPiece = board.array[rank][file];
            if (board.selectedPiece !== undefined && board.selectedPiece.getValidMoves(board.array).length !== 0) {
                displayValidMoves(board.selectedPiece.getValidMoves(board.array));
            } else {
                board.selectedPiece = undefined;
            }
        }
    } else {
        // if piece is selected, and it has valid moves, and is the right colour:
        if (board.selectedPiece.getValidMoves(board.array).length !== 0 && board.selectedPiece.colour === game.activePlayer) {
            // check if clicked square is in its valid moves
            let found = false;
            for (let move of board.selectedPiece.getValidMoves(board.array)) {
                if (rank === move[0] && file === move[1]) {
                    // if it is, move the piece, deselect it, and update HTML:
                    board.selectedPiece.move(file, rank, afterMove);                    
                    found = true;
                    break;
                }
            }
            // if it wasn't:
            if (!found) {
                // select the piece that was clicked on (or undefined if it was an empty square)
                board.selectedPiece = board.array[rank][file];
                // if the new piece doesn't have any moves, or if it's the wrong colour, deselect it
                if (board.selectedPiece !== undefined && (board.selectedPiece.getValidMoves(board.array).length === 0 || board.selectedPiece.colour !== game.activePlayer)) {
                    board.selectedPiece = undefined;
                // if it does, display those moves
                } else if (board.selectedPiece !== undefined) {
                    displayValidMoves(board.selectedPiece.getValidMoves(board.array));
                }
            }
        }
        // if the previously selected piece had no valid moves, select new piece if it is the right colour
        else if (board.array[rank][file].colour === game.activePlayer) {
            board.selectedPiece = board.array[rank][file];
        }
    }
}

function afterMove(checkmate) {
    Board.getInstance().selectedPiece = undefined;
    initialiseHTML(Board.getInstance().array);
    updateHistory();
    
    if (checkmate) {    
        let colour = Game.getInstance().activePlayer === 'white' ? 'Black' : 'White';    
        alert(`${colour} wins by checkmate!`);
        Board.resetInstance();
        Game.resetInstance();
        document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));
    } else if (Board.getInstance().hasNoValidMoves(Game.getInstance().activePlayer)) {
        alert('Draw by stalemate!');
        Board.resetInstance();
        Game.resetInstance();
        document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));
    }
}