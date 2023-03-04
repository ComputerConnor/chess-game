import axios from 'axios';
import movePieceImgToNewPosition from './movePiece';

export default async function clickSquare(
    socket,
    clickedSquareElement, coordinates, squareInBoard, positionsState, fenState, setHighlightedSquares
) {
    // check the network connectivity using isConnected or make my own funciton to show to user that
    // he's offline then check:
    if (checkmate || turn !== piecesColor || sq === "" && !moveInfo.firstMoveIsMade) return;
    const rowIx = parseInt(coordinates.split('-')[0]);
    const squareIx = parseInt(coordinates.split('-')[1]);
    const pieceColor = sq.toUpperCase() === sq ? 'white' : 'black';
    let allowedMoves = [];
    if (!moveInfo.firstMoveIsMade || (moveInfor.firstMoveIsMade && piecesColor=== pieceColor)) {
        if (!moveInfo.firstMoveIsMade && black.includes(sq) && piecesColor === "white") return;
        if (!moveInfo.firstMoveIsMade && white.includes(sq) && piecesColor === "black") return;
        else {
            try {
                const fen = toFen(positionsState, fenState);
                allowedMoves = await axios.post('/allowedMoves', {
                    useCredentials: true,
                    body: {
                        fen, squareInBoard
                    },
                    Headers: {
                       "Content-Type": "application/json"
                    }
                });
                setHighlightedSquares(allowedMoves[square.toUpperCase()]);
            } catch (err) {
                // show something went wrong popup
            }
        }
        updateMoveInfoFn({
            firstMoveIsMade: true,
            piece: clickedSquareElement.children.length > 2 ? 
                clickedSquareElement.children[2].title : clickedSquareElement.children.length === 1 ? clickedSquareElement.children[0].title : null,
            position: location
        })
    } else if (moveInfo.firstMoveIsMade) {
        if (allowedMoves.includes(square.toLowerCase())) return;
        else if (sq === "") {
            // move clicked sq (square) Element img in first click to second clicked sq
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx,);
            // update fen based on the move
            if (moveInfo.piece === 'king' || moveInfo.piece === 'rook') {
                // update fen to remove the possibility of castling
                if(piecesColor==='white'){
                    // change KQ to ""
                    updatePartFn('whiteCastling', "");
                }
                if(piecesColor==='black'){
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                }
            }
            socket.emit('moved', moveInfor.position, square, fen, code, userId);
        } else {
            // move clicked sq (square) Element img in first click to second clicked sq then update chess board state positions after 1100 milliseconds
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx,);
            // remove previous img after 1000 milliseconds from moving the img to new position
            if (clickedSquareElement.children.length === 3) {
                setTimeout(() => {
                    clickedSquareElement.children[2].remove();
                }, 1000);
            } else if (clickedSquareElement.children.length === 1) {
                setTimeout(() => {
                    clickedSquareElement.children[0].remove();
                }, 1000);
            }
            // update fen to prevent castling if the king or rook has moved
            if (moveInfo.piece === 'king' || moveInfo.piece === 'rook') {
                // update fen to remove the possibility of moving
                if(piecesColor==='white'){
                    // change KQ to ""
                    updatePartFn('whiteCastling', "");
                }
                if(piecesColor==='black'){
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                }
            }
            if (isComputer) {
                try {

                } catch (err) {
                    // show that something went wrong and he must check he's connectivity but the piece 
                    // has already moved in the board
                    // so when he make move don't store that in cookies the current positions of the 
                    // board but the positions before this error happens which is before the last move so when he refresh the page you get the positions before one move and he can 
                    // of avoid all of this none and don't run the function or any part of it before checking the network connectivity
                }
            } else {
                // if the game is against an opponent not computer send to the opponent
                socket.emit('moved', moveInfor.position, square, fen, code, userId);
            }
        }
        if (moveInfo.piece === "pawn" && piecesColor === "white" && rowIx === 0) {
            // append popup of four pieces the pawn can be prompted to
            // in the clicked square element and add to each piece in the popup
            // click event that convert the pawn in the square to the clicked piece 
            // update chess board state
            // update fen
        } else if (moveInfo.piece === "pawn" && piecesColor === "black" && rowIx === 7) {
             // append popup of four pieces the pawn can be prompted to
            // in the clicked square element and add to each piece in the popup
            // click event that convert the pawn in the square to the clicked piece by changing its src, alt and title
            // update chess board state
            // update fen
        }
        if(moveInfo.piece==='king' && moveInfo.position==='e1'){
            if (square === 'c1') {
                // move rook img from a1 to d1
                // update chessboardstate
                // update fen string
                if(piecesColor==='white'){
                        // change KQ to ""
                }
                if(piecesColor==='black'){
                        // change kq to ""
                }
                socket.emit('moved', 'a1', 'd1', fen, code, userId);
            } else if (square === 'g1') {
                // move rook img from h1 to f1
                // update chessboardstate
                // update fen string
                if(piecesColor==='white'){
                    // change KQ to ""
                }
                if(piecesColor==='black'){
                    // change kq to ""
                }
                socket.emit('moved', 'h1', 'f1', fen, code, userId);
            }
        }
        // handle enpassant
    }
    // check if it's checkmate
    try {
        const isCheckmate = await axios.post('/checkmate', {
            useCredentials: true,
            body: {
                fen
            },
            Headers: {
                "Content-Type": "application/json"
            }
        });
        if(isCheckmate){
            setCheckmate(true);
            setGameWinner(piecesColor);
        }
    } catch (err) {
        // show something went wrong popup
    }

    // if the game is between two , send new chessboardState and piece that has moved to other player 
    // recieve it then detect what piece has moved and change an img position of the moved piece then change its chessboardstate
    
}