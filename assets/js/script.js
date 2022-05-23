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
        if (board[this.position.file+1][this.position.rank+1] !== undefined) {
            moves.push([this.position.file+1, this.position.rank+1])
        }
        if (board[this.position.file-1][this.position.rank-1] !== undefined) {
            moves.push([this.position.file-1, this.position.rank-1])
        }

        return moves;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    initialiseBoard();
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
                rankArray.push({piece: 'pawn', colour: colour});
                html = `<div class="square pawn-${colour}" data-file="${file}" data-rank="${rank}">pawn</div>`
            } else {
                rankArray.push();
                html = `<div class="square" data-file="${file}" data-rank="${rank}"></div>`
            }

            document.getElementById('board').innerHTML += html;
        }
        board.push(rankArray);
    }
}