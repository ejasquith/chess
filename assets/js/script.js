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
        if (board[this.position.file][this.position.rank+1] === undefined) {
            moves.push([this.position.file, this.position.rank+1]);
        }
        if (!this.hasMoved && board[this.position.file][this.position.rank+2] === undefined) {
            moves.push([this.position.file, this.position.rank+2]);
        }
        if (board[this.position.file+1][this.position.rank+1] !== undefined 
            && board[this.position.file+1][this.position.rank+1].colour !== this.colour) {
            moves.push([this.position.file+1, this.position.rank+1])
        }
        if (board[this.position.file-1][this.position.rank-1] !== undefined
            && board[this.position.file-1][this.position.rank-1].colour !== this.colour) {
            moves.push([this.position.file-1, this.position.rank-1])
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
            if (rank === 0 || rank === 7) {
                // switch block for piece type
                rankArray.push({piece: 'piece', colour: colour});
                html.push(`<div class="square piece-${colour}" data-file="${file}" data-rank="${rank}">piece</div>`);
            } else if (rank === 1 || rank === 6) {
                let pawn = new Pawn(colour, {file: file, rank: rank});
                rankArray.push(pawn);
                html.push(`<div class="square pawn-${pawn.colour}" data-file="${pawn.position.file}" data-rank="${pawn.position.rank}">pawn ${colour}</div>`);
            } else {
                rankArray.push();
                html.push(`<div class="square" data-file="${file}" data-rank="${rank}"></div>`);
            }
        }
        board.push(rankArray);
    }
    for (let node of html) {
        document.getElementById('board').innerHTML += node;
    }
    return board;
}

function squareClickHandler(event) {
    console.log('square handler called');
    let file = event.currentTarget.getAttribute('data-file');
    let rank = event.currentTarget.getAttribute('data-rank');
    console.log(`You clicked ${getCoords(parseInt(file), parseInt(rank))}`);
    let piece = board[7-rank][file];
    console.log(piece);
}