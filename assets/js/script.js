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

document.addEventListener('DOMContentLoaded', function() {
    initialiseBoard();
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

    for (let rank = 0; rank < 8; rank++) {
        let rankArray = [];
        let colour = (rank <= 1) ? 'white' : 'black';

        for (let file = 0; file < 8; file++) {
            let html='';
            if (rank === 0 || rank === 7) {
                // switch block for piece type
                rankArray.push({piece: 'piece', colour: colour});
                html = `<div class="square piece-${colour}" data-file="${file}" data-rank="${rank}">piece</div>`
            } else if (rank === 1 || rank === 6) {
                rankArray.push(new Pawn(colour, {file: file, rank: rank}));
                html = `<div class="square pawn-${colour}" data-file="${file}" data-rank="${rank}">pawn ${colour}</div>`
            } else {
                rankArray.push();
                html = `<div class="square" data-file="${file}" data-rank="${rank}"></div>`
            }

            document.getElementById('board').innerHTML += html;
        }
        board.push(rankArray);
    }

    return board;
}

function squareClickHandler(event) {
    console.log('square handler called');
    let file = event.currentTarget.getAttribute('data-file');
    let rank = event.currentTarget.getAttribute('data-rank');
    console.log(`You clicked ${getCoords(parseInt(file), parseInt(rank))}`);
}