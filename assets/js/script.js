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
            // edit html, deal with captures
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

class Rook extends Piece {
    getValidMoves() {
        let moves = [];
        for (let rank = this.position.rank + 1; rank <= 7; rank++) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    moves.push([rank, this.position.file]);
                }
                break;
            } else {
                moves.push([rank, this.position.file]);
            }
        }
        for (let rank = this.position.rank - 1; rank >= 0; rank--) {
            if (board[rank][this.position.file] !== undefined) {
                if (board[rank][this.position.file].colour !== this.colour) {
                    moves.push([rank, this.position.file]);
                }
                break;
            } else {
                moves.push([rank, this.position.file]);
            }
        }

        for (let file = this.position.file + 1; file <= 7; file++) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    moves.push([this.position.rank, file]);
                }
                break;
            } else {
                moves.push([this.position.rank, file]);
            }
        }
        for (let file = this.position.file - 1; file >= 0; file--) {
            if (board[this.position.rank][file] !== undefined) {
                if (board[this.position.rank][file].colour !== this.colour) {
                    moves.push([this.position.rank, file]);
                }
                break;
            } else {
                moves.push([this.position.rank, file]);
            }
        }

        return moves;
    }
}

class Knight extends Piece {
    getValidMoves() {
        let rank = this.position.rank;
        let file = this.position.file;
        let moves = [];

        //how far the knight can move in x or y
        let offsets = [-2, -1, 1, 2];

        for (let offset of offsets) {
            for (let offset2 of offsets) {
                // must move 1 in one direction and 2 in other
                if (Math.abs(offset) === Math.abs(offset2)) {
                    continue;
                } else if (!((rank + offset > 7) || (rank + offset < 0) || (file + offset2 > 7) || (file + offset2 < 0))) {
                    if (board[rank + offset][file + offset2] !== undefined) {
                        if (board[rank + offset][file + offset2].colour !== this.colour) {
                            moves.push([rank + offset, file + offset2]);
                        }
                    } else {
                        moves.push([rank + offset, file + offset2]);
                    }
                }
            }
        }
        return moves;
    }
}

class Bishop extends Piece {
    getValidMoves() {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.file;
        while (rank < 7 && file < 7) {
            rank++;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank < 7 && file > 0) {
            rank++;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file < 7) {
            rank--;
            file++;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }

        rank = this.position.rank;
        file = this.position.file;
        while (rank > 0 && file > 0) {
            rank--;
            file--;
            if (board[rank][file] !== undefined) {
                if (board[rank][file].colour !== this.colour) {
                    moves.push([rank, file]);
                }
                break;
            } else {
                moves.push([rank, file]);
            }
        }
        return moves;
    }
}

class King extends Piece {
    getValidMoves() {
        let moves = [];
        let rank = this.position.rank;
        let file = this.position.rank;

        //ADD LOGIC FOR CHECKS
        if (board[rank + 1][file] === undefined || board[rank + 1][file].colour !== this.colour) {
            moves.push([rank + 1, file]);
        }
        if (board[rank + 1][file + 1] === undefined || board[rank + 1][file + 1].colour !== this.colour) {
            moves.push([rank + 1, file + 1]);
        }
        if (board[rank + 1][file - 1] === undefined || board[rank + 1][file - 1].colour !== this.colour) {
            moves.push([rank + 1, file - 1]);
        }
        if (board[rank - 1][file] === undefined || board[rank - 1][file].colour !== this.colour) {
            moves.push([rank - 1, file]);
        }
        if (board[rank - 1][file + 1] === undefined || board[rank - 1][file + 1].colour !== this.colour) {
            moves.push([rank - 1, file + 1]);
        }
        if (board[rank - 1][file - 1] === undefined || board[rank - 1][file - 1].colour !== this.colour) {
            moves.push([rank - 1, file - 1]);
        }
        if (board[rank][file + 1] === undefined || board[rank][file + 1].colour !== this.colour) {
            moves.push([rank, file + 1]);
        }
        if (board[rank][file - 1] === undefined || board[rank][file - 1].colour !== this.colour) {
            moves.push([rank, file - 1]);
        }

        if (!this.hasMoved) {
            if (board[rank][0] instanceof Rook && !board[rank][0].hasMoved) {
                moves.push([rank, file - 2]);
            }
            if (board[rank][7] instanceof Rook && !board[rank][7].hasMoved) {
                moves.push([rank, file + 2]);
            }
        }

        return moves;
    }
}

class Queen extends Piece {

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
        displayValidMoves(piece.getValidMoves());
    }
}