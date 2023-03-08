import axios from 'axios';
import locationToPosition from './locationToPosition';
import movePieceImgToNewPosition from './movePiece';
import toFen from './toFen';
import { verifyCookie } from '../../generalOperations/cookiesOperations';

export default async function clickSquare(
    clickedSquareElement, sq, coordinates,
    positionsState, fenState, checkmate, socket, isConnected,
    setHighlightedSquares, setPrompted, setError, setCheckmate, setGameWinner,
    updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
) {
    // check the network connectivity or make my own funciton to show to user that he's offline
    if (!isConnected) {
        // show something went wrong check you internet connectivity 
        setError('check your internet then re-try');
        setTimeout(() => {
            setError(null);
        }, 3000);
        return;
    } else {
        setError(null);
    }
    const { piecesColor, black, white, computer } = positionsState;
    const turn = fenState.turn === 'w' ? 'white' : 'black';
    if (checkmate || turn !== piecesColor || sq === "" && !moveInfo.firstMoveIsMade) return;
    if (!computer && !verifyCookie('userId') || !verifyCookie('code')) {
        setError('something went wrong!');
        setTimeout(() => {
            setError(null);
        }, 3000);
        setOperationsAllowed(false);
    }
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
            } catch (err) {
                // show something went wrong popup
                setError('check your internet then re-try');
                setTimeout(() => {
                    setError(null);
                }, 3000);
                return;
            }
            setHighlightedSquares(allowedMoves[positionsState.locations[rowIx][squareIx].toUpperCase()]);
        }
        updateMoveInfoFn({
            firstMoveIsMade: true,
            piece: clickedSquareElement.children.length > 2 ?
                clickedSquareElement.children[2].title : clickedSquareElement.children.length === 1 ? clickedSquareElement.children[0].title : null,
            location: positionsState.locations[rowIx][squareIx],
            pieceLetter: sq,
        });
    } else if (moveInfo.firstMoveIsMade) {
        // move piece update positions state then update fen
        if (!allowedMoves.includes(positionsState.locations[rowIx][squareIx].toUpperCase())) return;
        else if (sq === "") {
            // move clicked sq (square) Element img in first click to second clicked sq and update positions state
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx, moveInfo.pieceLetter, updatePositions,);
            positionsState[oldRowIx][oldSquareIx] = '';
            positionsState[newRowIx][newSquareIx] = moveInfo.pieceLetter;
            if (!computer) socket.emit('move', moveInfor.location, rowIx, squareIx, moveInfo.pieceLetter,);
            // update fen based on the move
            if (moveInfo.piece === 'king' || moveInfo.piece === 'rook') {
                // update fen to remove the possibility of castling
                if (piecesColor === 'white') {
                    // change KQ to ""
                    updatePartFn('whiteCastling', "");
                    fenState.whiteCastling = "";
                    if (!computer) socket.emit('fen', "whiteCastling", "");
                }
                if (piecesColor === 'black') {
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                    fenState.blackCastling = "";
                    if (!computer) socket.emit('fen', "blackCastling", "");
                }
            }
        } else {
            movePieceImgToNewPosition(clickedSquareElement, oldRowIx, oldSquareIx, newRowIx, newSquareIx, moveInfo.pieceLetter, updatePositions,);
            positionsState[oldRowIx][oldSquareIx] = '';
            positionsState[newRowIx][newSquareIx] = moveInfo.pieceLetter;
            if (!computer) socket.emit('moveAndRemove', moveInfor.location, rowIx, squareIx, moveInfo.pieceLetter,);
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
                    fenState.whiteCastling = "";
                    if (!computer) socket.emit('fen', "whiteCastling", "");
                }
                if (piecesColor === 'black') {
                    // change kq to ""
                    updatePartFn('blackCastling', "");
                    fenState.blackCastling = ""
                    if (!computer) socket.emit('fen', "blackCastling", "");
                }
            }
        }

        // handle pawn prompting
        if (moveInfo.piece === "pawn" && piecesColor === "white" && rowIx === 0 || rowIx === 7) {
            // append popup of four pieces the pawn can be prompted to
            // in the clicked square element and add to each piece in the popup
            // click event that convert the pawn in the square to the clicked piece 
            // then update chess board state
            setPrompted(true);
        }

        // handle castling
        if (moveInfo.piece === 'king' && moveInfo.location === 'e1' || moveInfo.location === 'e8') {
            if (square === 'c1' || square === 'c8') {
                if (piecesColor === 'white') {
                    // move rook img from a1 to d1 and update chessboardstate
                    movePieceImgToNewPosition(clickedSquareElement, 7, 0, 7, 3, moveInfo.pieceLetter, updatePositions,);
                    positionsState[7][0] = '';
                    positionsState[7][3] = moveInfo.pieceLetter;
                    if (!computer) socket.emit('move', "a1", 7, 3, "R",);
                    updatePartFn('whiteCastling', "");
                    fenState.whiteCastling = "";
                    if (!computer) socket.emit('fen', "whiteCastling", "");
                }
                if (piecesColor === 'black') {
                    // move rook img from a8 to d8 and update chessboardstate
                    movePieceImgToNewPosition(clickedSquareElement, 0, 0, 0, 3, moveInfo.pieceLetter, updatePositions,);
                    positionsState[0][0] = '';
                    positionsState[0][3] = moveInfo.pieceLetter;
                    if (!computer) socket.emit('move', "a8", 0, 3, "r",);
                    updatePartFn('blackCastling', "");
                    fenState.blackCastling = "";
                    if (!computer) socket.emit('fen', "blackCastling", "");
                }
            } else if (square === 'g1' || square === 'g8') {
                if (piecesColor === 'white') {
                    movePieceImgToNewPosition(clickedSquareElement, 7, 7, 7, 5, moveInfo.pieceLetter, updatePositions,);
                    positionsState[7][7] = '';
                    positionsState[7][5] = moveInfo.pieceLetter;
                    if (!computer) socket.emit('move', "h1", 7, 5, "R",);
                    updatePartFn('whiteCastling', "");
                    fenState.whiteCastling = "";
                    if (!computer) socket.emit('fen', "whiteCastling", "");
                }
                if (piecesColor === 'black') {
                    movePieceImgToNewPosition(clickedSquareElement, 0, 7, 0, 5, moveInfo.pieceLetter, updatePositions,);
                    positionsState[0][7] = '';
                    positionsState[0][5] = moveInfo.pieceLetter;
                    if (!computer) socket.emit('move', "h8", 0, 5, "r",);
                    updatePartFn('blackCastling', "");
                    fenState.blackCastling = "";
                    if (!computer) socket.emit('fen', "blackCastling", "");
                }
            }
        }

        // handle enpassant
        if (moveInfo.piece === 'pawn') {
            if ((rowIx === 3 || rowIx === 4) && ('abcdefgh'.split('').map(e => e + 2).includes(moveInfo.location) || 'abcdefgh'.split('').map(e => e + 7).includes(moveInfo.location))) {
                let enPassantRowIx = null;
                if (piecesColor === 'white') {
                    const { rowIx, squareIx } = locationToPosition(location, positionsState.locations);
                    enPassantRowIx = rowIx + 1;
                    updatePartFn('enPassant', positionsState.locations[enPassantRowIx][squareIx]);
                    fenState.enPassant = positionsState.locations[enPassantRowIx][squareIx];
                    if (!computer) socket.emit('fen', "enPassant", positionsState.locations[enPassantRowIx][squareIx]);
                } else if (piecesColor === 'black') {
                    const { rowIx, squareIx } = locationToPosition(location, positionsState.locations);
                    enPassantRowIx = rowIx - 1;
                    updatePartFn('enPassant', positionsState.locations[enPassantRowIx][squareIx]);
                    fenState.enPassant = positionsState.locations[enPassantRowIx][squareIx];
                    if (!computer) socket.emit('fen', "enPassant", positionsState.locations[enPassantRowIx][squareIx]);
                }
            }
            const enPassant = fenState.enPassant;
            if (location === enPassant) {
                const { rowIx, squareIx } = locationToPosition(location, positionsState.locations);
                removePieceFn(rowIx, squareIx);
                positionsState.positions[rowIx][squareIx] = '';
                if (!computer) socket.emit('removePiece', rowIx, squareIx)
                updatePartFn('enPassant', "");
                fenState.enPassant = "";
                if (!computer) socket.emit('fen', "enPassant", "");
            }
        }

        // reset movement to no square is clicked to be moved
        updateMoveInfoFn({
            firstMoveIsMade: false,
            piece: null,
            location: null,
            pieceLetter: null,
        });

        // add one to halfMoves because one player has moved
        updatePartFn('halfMoves', fenState.halfMoves + 1);
        fenState.halfMoves += 1;
        if (!computer) socket.emit('halfMoves', fenState.halfMoves + 1);
        // add one to fullMoves because two players has moved
        if (piecesColor === 'black') {
            updatePartFn('fullMoves', fenState.fullMoves + 1);
            fenState.fullMoves += 1;
        }
        if (!computer) socket.emit('fullMoves', fenState.halfMoves + 1);

        // check if it's checkmate
        const fen = toFen(positionsState, fenState);
        try {
            const isCheckmate = await axios.post('/checkmate', {
                useCredentials: true,
                body: { fen },
                Headers: { "Content-Type": "application/json" }
            });
            if (isCheckmate) {
                setGameWinner(piecesColor);
                setCheckmate(true);
                if (!computer) {
                    socket.emit('checkmate', code, userId);
                }
            }
        } catch (err) {
            setError('check your internet connectivity');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }
}
// after the second move take the states before updating and the updates made on them and do it on these passed copies of states not on the actual states using hooks and the move that has been made by second click and use them to get the computer move after it's move detect if fen must be updated or promoting or castling can be done by it

// after each move by each player update the stored fen in the cookies and in the first render of game page check the fen and other information about a game if a game is stored in cookies

// situations where the player move to other page and get back to game page or refresh the page or end the game or game ended by other player or the player or opponent lose his connection to the internet or try to enter a game witht the code that is used before to enter the game or when create a game and leave the game page or when he do that and try to enter his own code to join the game