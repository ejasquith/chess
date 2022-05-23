class Piece {
    constructor(colour, position) {
        this.colour = colour;
        this.position = position;
        this.hasMoved = false;
    }
    
    getValidMoves() {

    }
    move(file, rank) {
        if (this.getValidMoves().includes([file, rank])) {
            this.position.file = file;
            this.position.rank = rank;
            // edit html
        }
    }
}

class Pawn extends Piece {
    getValidMoves() {
        let moves = [];
        let sign = this.colour === 'white' ? 1 : -1;
        // undefined means either array location is empty (ie no piece), or doesn't exist
        // do need to check for out of bounds index here
        // actually probably don't - if pawn is on 8th/1st rank, that means it has promoted and is no longer pawn
        if (this.position.rank + sign <= 7 && board[this.position.rank+sign][this.position.file] === undefined) {
            moves.push([this.position.rank+sign, this.position.file]);
        }
        // no need to check index here as it can only ever be true when pawn is on second/seventh rank
        if (!this.hasMoved && board[this.position.rank+2*sign][this.position.file] === undefined) {
            moves.push([this.position.rank+2*sign, this.position.file]);
        }
        // doesn't need to check if index out of bounds, because out of bounds values return undefined
        // would return error when checking piece colour, if the condition didn't fail and
        // skip over second condition when returned undefined
        if (board[this.position.rank+sign][this.position.file+sign] !== undefined 
            && board[this.position.rank+sign][this.position.file+sign].colour !== this.colour) {
                moves.push([this.position.rank+sign, this.position.file+sign])
        }
        if (board[this.position.rank-sign][this.position.file-sign] !== undefined
            && board[this.position.rank-sign][this.position.file-sign].colour !== this.colour) {
                moves.push([this.position.rank-sign, this.position.file-sign])
        }

        return moves;
    }
}

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
            let html = '';
            if (rank === 0 || rank === 7) {
                // switch block for piece type
                rankArray.push({piece: 'piece', colour: colour});
                // html = `<div class="square-container"><div class="square piece-${colour}" data-file="${file}" data-rank="${rank}">piece</div></div>`;
                html = `<div class="square piece-${colour}" data-file="${file}" data-rank="${rank}">piece</div>`;
            } else if (rank === 1 || rank === 6) {
                let pawn = new Pawn(colour, {file: file, rank: rank});
                rankArray.push(pawn);
                html = `<div class="square-container"><div class="square pawn-${pawn.colour}" data-file="${pawn.position.file}" data-rank="${pawn.position.rank}">pawn ${colour}</div></div>`;
            } else {
                rankArray.push();
                html = `<div class="square-container"><div class="square" data-file="${file}" data-rank="${rank}"></div></div>`;
            }
            document.getElementById('board').innerHTML += html;
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
        square.parentElement.style['background-color'] = 'rgba(0,0,0,0)';
    }
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        // moves.includes(...) didn't work - possibly because two arrays with the same data inside aren't identical
        for (let move of moves) {
            if (squareCoords[0] === move[0] && squareCoords[1] === move[1]) {
                square.parentElement.style['background-color'] = 'rgba(255, 0, 0, 0.5)';
            }
        }
    }
}

function squareClickHandler(event) {
    let file = event.currentTarget.getAttribute('data-file');
    let rank = event.currentTarget.getAttribute('data-rank');
    let piece = board[rank][file];
    if (piece instanceof Pawn) {
        displayValidMoves(piece.getValidMoves());
    }
}