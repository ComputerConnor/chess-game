import clickSquare from './clickSquare';
import PromptingPawn from './promptingPawn';

function horizonatlIndicatorDiv(ix) {
    return (
        <div className="horizontal-indicator">{'abcdefgh'.at(ix)}</div>
    );
};

function verticalIndicatorDiv(rows, rowIx) {
    return (<div className="vertical-indicator">{rowIx === 0 ? (rows.length) : rows.indexOf(rows.at(-1 * rowIx))}</div>);
};

function squareImageTag(sq, ix, black, piecesColor, setSelectSquarePosition) {
    return (<img
        src={'./imgs/' + (black.includes(sq) ? 'black/b' : 'white/w') + sq.toUpperCase() + '.png'}
        key={ix}
        alt={
            sq.toLowerCase() === 'p' ? 'pawn' :
                sq.toLowerCase() === 'n' ? 'knigth' :
                    sq.toLowerCase() === 'r' ? 'rook' :
                        sq.toLowerCase() === 'q' ? 'queen' :
                            sq.toLowerCase() === 'b' ? 'bishop' : 'king'
        }
        title={
            sq.toLowerCase() === 'p' ? 'pawn' :
                sq.toLowerCase() === 'n' ? 'knigth' :
                    sq.toLowerCase() === 'r' ? 'rook' :
                        sq.toLowerCase() === 'q' ? 'queen' :
                            sq.toLowerCase() === 'b' ? 'bishop' : 'king'
        }
        onClick={(e) => {
            if (piecesColor === e.target.parentElement.dataset.pieceColor) {
                setSelectSquarePosition(
                    e.target.parentElement.classList[1].split('-')[1]
                );
            }
        }}
    />);
};

function getSquares(
    row, rowIx, rows,
    isConnected, positionsState, fenState,
    selectSquarePosition,
    highlightedSquares, setHighlightedSquares, prompted, setPrompted,
    checkmate, setCheckmate, setError, setGameWinner, setSelectSquarePosition,
    updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
    socket,
) {
    const squares = row.map((sq, ix) => {
        return (<div
            key={ix}
            data-coordinates={`${rowIx}-${ix}`}
            data-piece-color={
                positionsState.black.includes(sq) ? 'black' : positionsState.white.includes(sq) ? 'white' : 'none'
            }
            className={
                (
                    rowIx % 2 === 0 ?
                        (ix % 2 === 0 ? 'square-brown' : 'square-ivory') :
                        (ix % 2 === 0 ? 'square-ivory' : 'square-brown')) + (' square-') + (positionsState.locations[rowIx][ix]
                            + (selectSquarePosition === positionsState.locations[rowIx][ix] ? ' square-shadow' : '')
                            + (highlightedSquares.includes(positionsState.locations[rowIx][ix]) && sq === "" ? 'highlighted1' : highlightedSquares.includes(positionsState.locations[rowIx][ix]) && sq !== "" ? 'highlighted2' : '')
                )
            }
            onClick={(e) => {
                clickSquare(
                    e.target, sq, e.target.dataset.coordinates,
                    positionsState, fenState, checkmate, socket, isConnected,
                    setHighlightedSquares, setPrompted, setError, setCheckmate, setGameWinner,
                    updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
                )
            }}
        >
            {(rowIx === 7
                ? (ix === 0 ?
                    (sq !== ""
                        ? (<>
                            {verticalIndicatorDiv(rows, rowIx)}
                            {horizonatlIndicatorDiv(ix)}
                            {squareImageTag(sq, ix, positionsState.black, positionsState.piecesColor, setSelectSquarePosition)}
                        </>)
                        : horizonatlIndicatorDiv(ix))
                    : (sq !== ""
                        ? (<> {horizonatlIndicatorDiv(ix)}{squareImageTag(sq, ix, positionsState.black, positionsState.piecesColor, setSelectSquarePosition)}</>)
                        : horizonatlIndicatorDiv(ix))
                )
                : (ix === 0 ?
                    (sq !== ""
                        ? (<>
                            {verticalIndicatorDiv(rows, rowIx)}
                            {squareImageTag(sq, ix, positionsState.black, positionsState.piecesColor, setSelectSquarePosition)}
                        </>)
                        : verticalIndicatorDiv(rows, rowIx)
                    )
                    : (sq !== "" ? (<>{squareImageTag(sq, ix, positionsState.black, positionsState.piecesColor, setSelectSquarePosition)}</>) : '')
                )
            )}
            {prompted && sq === "p" || sq === "P" && rowIx === 0 || rowIx === 7 && <PromptingPawn sq={sq} black={positionsState.black} coordinates={coordinates} updatePositions={updatePositions} setPrompted={setPrompted} socket={socket} />}
        </div>);
    });
    return squares;
};

export default function getRows(
    positionsState, fenState,
    isConnected, positionsState, fenState,
    selectSquarePosition,
    highlightedSquares, setHighlightedSquares, prompted, setPrompted,
    checkmate, setCheckmate, setError, setGameWinner, setSelectSquarePosition,
    updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
    socket,
) {
    const rows = chessboardState.map((row, rowIx, rows) => {
        return (
            <div className="row" key={rowIx}>
                {
                    getSquares(
                        row, rowIx, rows,
                        isConnected, positionsState, fenState,
                        selectSquarePosition,
                        highlightedSquares, setHighlightedSquares, prompted, setPrompted,
                        checkmate, setCheckmate, setError, setGameWinner, setSelectSquarePosition,
                        updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
                        socket,
                    )
                }
            </div>
        );
    });
    return rows;
};