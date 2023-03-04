import axios from 'axios';
import movePieceImgToNewPosition from './movePiece';

export default async function clickSquare(
    socket, isConnected, location, piecesColor,
    clickedSquareElement, coordinates, squareInBoard, positionsState, fenState, setHighlightedSquares
) {
    // check the network connectivity or make my own funciton to show to user that he's offline
    if (!isConnected) {
        // show something went wrong check you internet connectivity then return
        return;
    }
    if (checkmate || turn !== piecesColor || sq === "" && !moveInfo.firstMoveIsMade) return;
    const rowIx = parseInt(coordinates.split('-')[0]);
    const squareIx = parseInt(coordinates.split('-')[1]);
    const pieceColor = sq.toUpperCase() === sq ? 'white' : 'black';
    let allowedMoves = [];
    if (!moveInfo.firstMoveIsMade || (moveInfor.firstMoveIsMade && piecesColor === pieceColor)) {
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
            position: location,
            pieceLetter: sq,
        });
    } else if (moveInfo.firstMoveIsMade) {
        if (allowedMoves.includes(square.toLowerCase())) return;
        else if (sq === "") {
            // move clicked sq (square) Element img in first click to second clicked sq
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx, moveInfo.pieceLetter,);
            // update fen based on the move
            if (moveInfo.piece === 'king' || moveInfo.piece === 'rook') {
                // update fen to remove the possibility of castling
                if (piecesColor === 'white') {
                    // change KQ to ""
                    updatePartFn('whiteCastling', "");
                }
                if (piecesColor === 'black') {
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                }
            }
            socket.emit('moved', moveInfor.position, square, fen, code, userId);
        } else {
            // move clicked sq (square) Element img in first click to second clicked sq then update chess board state positions after 1100 milliseconds
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx, moveInfo.pieceLetter,);
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
                if (piecesColor === 'white') {
                    // change KQ to ""
                    updatePartFn('whiteCastling', "");
                }
                if (piecesColor === 'black') {
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                }
            }
            if (isComputer) {
                try {
                    const computerMove = await axios.post('/computerMove', {
                        useCredentials: true,
                        body: {
                            fen
                        }
                    });
                } catch (err) {
                    // show something went wrong and prevent him from making further moves
                }
            } else {
                // if the game is against an opponent not computer send to the opponent
                socket.emit('moved', moveInfor.position, square, fen, code, userId);
            }
        }
        if (moveInfo.piece === "pawn" && piecesColor === "white" && rowIx === 0 || rowIx === 7) {
            // append popup of four pieces the pawn can be prompted to
            // in the clicked square element and add to each piece in the popup
            // click event that convert the pawn in the square to the clicked piece 
            // then update chess board state
            setPrompted(true);
        }
        if (moveInfo.piece === 'king' && moveInfo.position === 'e1' || moveInfo.position === 'e8') {
            if (square === 'c1' || square === 'c8') {
                if (piecesColor === 'white') {
                    // move rook img from a1 to d1 and update chessboardstate
                    movePieceImgToNewPosition(clickedSquareElement, 7, 0, 7, 3, moveInfo.pieceLetter,);
                    updatePartFn('whiteCastling', "");
                }
                if (piecesColor === 'black') {
                    // move rook img from a8 to d8 and update chessboardstate
                    movePieceImgToNewPosition(clickedSquareElement, 0, 0, 0, 3, moveInfo.pieceLetter,);
                    updatePartFn('blackCastling', "");
                }
                if (isComputer) {
                    try {
                        const computerMove = await axios.post('/computerMove', {
                            useCredentials: true,
                            body: {
                                fen
                            }
                        });
                    } catch (err) {
                        // show something went wrong and prevent him from making further moves
                    }
                } else {
                    if (piecesColor === 'white') {
                        socket.emit('moved', 'a1', 'd1', fen, code, userId);
                    }
                    if (piecesColor === 'black') {
                        socket.emit('moved', 'a8', 'd8', fen, code, userId);
                    }
                }
            } else if (square === 'g1' || square === 'g8') {
                // update fen string
                if (piecesColor === 'white') {
                    movePieceImgToNewPosition(clickedSquareElement, 7, 7, 7, 5, moveInfo.pieceLetter,);
                    updatePartFn('whiteCastling', "");
                }
                if (piecesColor === 'black') {
                    movePieceImgToNewPosition(clickedSquareElement, 0, 7, 0, 5, moveInfo.pieceLetter,);
                    updatePartFn('blackCastling', "");
                }
                if (isComputer) {
                    try {
                        const computerMove = await axios.post('/computerMove', {
                            useCredentials: true,
                            body: {
                                fen
                            }
                        });
                    } catch (err) {
                        // show something went wrong and prevent him from making further moves
                    }
                } else {
                    if (piecesColor === 'white') {
                        socket.emit('moved', 'h1', 'f1', fen, code, userId);
                    }
                    if (piecesColor === 'black') {
                        socket.emit('moved', 'h8', 'f8', fen, code, userId);
                    }
                }
            }
        }
        // handle enpassant
        if (moveInfo.piece === 'pawn') {
            if ((rowIx === 3 || rowIx === 4) && ('abcdefgh'.split('').map(e => e + 2).includes(moveInfo.position) || 'abcdefgh'.split('').map(e => e + 7).includes(moveInfo.position))) {
                updatePartFn('enPassant', moveInfo.position);
            }
            const enPassant = fenState.enPassant;
            if (location === enPassant) {

            }
        }
        updateMoveInfoFn({
            firstMoveIsMade: false,
            piece: null,
            position: null,
            pieceLetter: null,
        });
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
        if (isCheckmate) {
            setCheckmate(true);
            setGameWinner(piecesColor);
        }
    } catch (err) {
        // show something went wrong popup
    }
    // update fen half and full moves

    // if the game is between two , send new chessboardState and piece that has moved to other player 
    // recieve it then detect what piece has moved and change an img position of the moved piece then change its chessboardstate

}