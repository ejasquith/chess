import Board from './board.js';
import Game from './game.js';

document.addEventListener('DOMContentLoaded', function() {
    startNewGame();

    document.getElementById('how-to-play-btn').addEventListener('click', function() {
        let modal = document.getElementById('how-to-play');
        if (modal.classList.contains('closed')) {
            modal.classList.remove('closed');
            modal.classList.add('open');

            let overlay = modal.parentElement;
            overlay.classList.remove('closed');
            overlay.classList.add('open');
        }
    });

    document.getElementById('close-htp-btn').addEventListener('click', function() {
        let modal = document.getElementById('how-to-play');
        if (modal.classList.contains('open')) {
            modal.classList.remove('open');
            modal.classList.add('closed');

            let overlay = modal.parentElement;
            overlay.classList.remove('open');
            overlay.classList.add('closed');
        }
    });

    document.getElementById('colour-btn').addEventListener('click', function() {
        let modal = document.getElementById('colour-modal');
        if (modal.classList.contains('closed')) {
            modal.classList.remove('closed');
            modal.classList.add('open');

            let overlay = modal.parentElement;
            overlay.classList.remove('closed');
            overlay.classList.add('open');
        }
    });

    document.getElementById('brown-btn').addEventListener('click', function() {
        Board.getInstance().lightColour = '#ebd7b2';
        Board.getInstance().darkColour = '#ac8561';

        clearHighlights();

        let modal = document.getElementById('colour-modal');
        if (modal.classList.contains('open')) {
            modal.classList.remove('open');
            modal.classList.add('closed');

            let overlay = modal.parentElement;
            overlay.classList.remove('open');
            overlay.classList.add('closed');
        }
    });
    document.getElementById('blue-btn').addEventListener('click', function() {
        Board.getInstance().lightColour = '#d4dee3';
        Board.getInstance().darkColour = '#7e95a9';

        clearHighlights();

        let modal = document.getElementById('colour-modal');
        if (modal.classList.contains('open')) {
            modal.classList.remove('open');
            modal.classList.add('closed');

            let overlay = modal.parentElement;
            overlay.classList.remove('open');
            overlay.classList.add('closed');
        }
    });
    document.getElementById('green-btn').addEventListener('click', function() {
        Board.getInstance().lightColour = '#ededd0';
        Board.getInstance().darkColour = '#779355';

        clearHighlights();

        let modal = document.getElementById('colour-modal');
        if (modal.classList.contains('open')) {
            modal.classList.remove('open');
            modal.classList.add('closed');

            let overlay = modal.parentElement;
            overlay.classList.remove('open');
            overlay.classList.add('closed');
        }
    });

    document.getElementById('restart-btn').addEventListener('click', startNewGame);
});

function startNewGame() {
    Board.getInstance().initialiseBoard();
    Game.resetInstance();
    let board = Board.getInstance().array;
    initialiseHTML(board.reverse());
    updateHistory();
}

function updateScore(result) {
    let whiteScore = parseFloat(document.getElementById('white-score').innerHTML);
    let blackScore = parseFloat(document.getElementById('black-score').innerHTML);

    switch (result.toLowerCase()) {
        case 'white':
            whiteScore++;
            break;
        case 'black':
            blackScore++;
            break;
        case 'draw':
            whiteScore += 0.5;
            blackScore += 0.5;
            break;
        default:
            throw 'Error: unrecognised value for game result';
    }

    document.getElementById('white-score').innerHTML = whiteScore;
    document.getElementById('black-score').innerHTML = blackScore;
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
                node.style.backgroundColor = Board.getInstance().lightColour : node.style.backgroundColor = Board.getInstance().darkColour;
            if (boardTemp[rank][file] !== undefined) {
                node.style.backgroundImage = `url(assets/images/${boardTemp[rank][file].constructor.name.toLowerCase()}-${boardTemp[rank][file].colour}.png)`;
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
            square.style.backgroundColor = Board.getInstance().lightColour : square.style.backgroundColor = Board.getInstance().darkColour;
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
    
    // logic for end of game
    if (checkmate) {    
        let colour = Game.getInstance().activePlayer === 'white' ? 'Black' : 'White';    
        alert(`${colour} wins by checkmate!`);
        updateScore(colour);
        startNewGame();
    } else if (Board.getInstance().hasNoValidMoves(Game.getInstance().activePlayer)) {
        alert('Draw by stalemate!');
        updateScore('draw');
        startNewGame();
    } else if (Game.getInstance().checkDrawBy50Moves()) {
        alert('Draw by 50 move rule!');
        updateScore('draw');
        startNewGame();
    } else if (Game.getInstance().checkDrawByThreefoldRepetition()) {
        alert('Draw by threefold repetition!');
        updateScore('draw');
        startNewGame();
    } else if (Board.getInstance().checkDrawByInsufficientMaterial()) {
        alert('Draw by insufficient material!');
        updateScore('draw');
        startNewGame();
    }
}