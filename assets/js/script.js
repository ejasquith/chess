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
        // undefined means either array location is empty (ie no piece), or doesn't exist
        // do need to check for out of bounds index here
        // actually probably don't - if pawn is on 8th/1st rank, that means it has promoted and is no longer pawn
        if (this.position.rank + 1 <= 7 && board[this.position.rank+1][this.position.file] === undefined) {
            moves.push([this.position.rank+1, this.position.file]);
        }
        // no need to check index here as it can only ever be true when pawn is on second/seventh rank
        if (!this.hasMoved && board[this.position.rank+2][this.position.file] === undefined) {
            moves.push([this.position.rank+2, this.position.file]);
        }
        // doesn't need to check if index out of bounds, because out of bounds values return undefined
        // would return error when checking piece colour, if the condition didn't fail and
        // skip over second condition when returned undefined
        if (board[this.position.rank+1][this.position.file+1] !== undefined 
            && board[this.position.rank+1][this.position.file+1].colour !== this.colour) {
            console.log(board[this.position.rank+1][this.position.file+1])
            moves.push([this.position.rank+1, this.position.file+1])
        }
        if (board[this.position.rank-1][this.position.file-1] !== undefined
            && board[this.position.rank-1][this.position.file-1].colour !== this.colour) {
            moves.push([this.position.rank-1, this.position.file-1])
        }

        return moves;
    }
}

let board;

document.addEventListener('DOMContentLoaded', function() {
    board = initialiseBoard();
    for (let square of document.getElementsByClassName('square')) {
        square.addEventListener('click', squareClickHandler);
    }
});

function getCoords(file, rank) {
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
                html = `<div class="square piece-${colour}" data-file="${file}" data-rank="${rank}">piece</div>`;
            } else if (rank === 1 || rank === 6) {
                let pawn = new Pawn(colour, {file: file, rank: rank});
                rankArray.push(pawn);
                html = `<div class="square pawn-${pawn.colour}" data-file="${pawn.position.file}" data-rank="${pawn.position.rank}">pawn ${colour}</div>`;
            } else {
                rankArray.push();
                html = `<div class="square" data-file="${file}" data-rank="${rank}"></div>`;
            }
            document.getElementById('board').innerHTML += html;
        }
        board.push(rankArray);
    }
    board.reverse();
    return board;
}

function displayValidMoves(moves) {
    let squares = document.getElementsByClassName('square');
    console.log(squares);
    for (let square of squares) {
        let squareCoords = [parseInt(square.getAttribute('data-rank')), parseInt(square.getAttribute('data-file'))];
        for (let move of moves) {
            if (squareCoords[0] === move[0] && squareCoords[1] === move[1]) {
                console.log('move found');
                square.style['background-color'] = 'red';
            }
        }
        // if (moves.includes([parseInt(squares[i].getAttribute('data-rank')), parseInt(squares[i].getAttribute('data-file'))])) {
        //     console.log('move found');
        //     square.style['background-color'] = 'red';
        // }
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