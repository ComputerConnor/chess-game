import clickSquare from './clickSquare';

function horizonatlIndicatorDiv(ix) { 
    return (
        <div className="horizontal-indicator">{'abcdefgh'.at(ix)}</div>
    );
};

function verticalIndicatorDiv(rows, rowIx){ 
    return (<div className="vertical-indicator">{rowIx === 0 ? (rows.length) : rows.indexOf(rows.at(-1 * rowIx))}</div>);
};

function squareImageTag(sq,ix, black, piecesColor, setSelectSquarePosition){
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
            if(piecesColor===e.target.parentElement.dataset.pieceColor) {
                setSelectSquarePosition(
                    e.target.parentElement.classList[1].split('-')[1]
                );
            }
        }}
    />);
};

function getSquares(
    row, rowIx, rows, black, white,
    chessboardState, boardPositions, selectSquarePosition, highlightedSquares, fenState, setHighlightedSquares, setSelectSquarePosition, piecesColor, socket
) {
    const squares = row.map((sq, ix) => {
        return (<div
            key={ix}
            data-coordinates={`${rowIx}-${ix}`}
            data-piece-color={
                black.includes(sq) ? 'black' : white.includes(sq) ? 'white' : 'none'
            }
            className={
                (
                    rowIx % 2 === 0 ?
                        (ix % 2 === 0 ? 'square-brown' : 'square-ivory') :
                        (ix % 2 === 0 ? 'square-ivory' : 'square-brown')) + (' square-') + (boardPositions[rowIx][ix]
                            + (selectSquarePosition === boardPositions[rowIx][ix] ? ' square-shadow' : '')
                            + (highlightedSquares.includes(boardPositions[rowIx][ix]) && sq === "" ? 'highlighted1' : highlightedSquares.includes(boardPositions[rowIx][ix]) && sq !== "" ? 'highlighted2' : '')
                ) 
            }
            onClick={(e) => {
                clickSquare(
                    socket,
                    e.target,
                    e.target.dataset.coordinates,
                    sq,
                    boardPositions[rowIx][ix],
                    chessboardState,
                    boardPositions,
                    fenState,
                    setHighlightedSquares
                )
            }}
        >
            {(rowIx === 7
                ? (ix === 0 ?
                    (sq !== ""
                        ? (<>
                            {verticalIndicatorDiv(rows, rowIx)}
                            {horizonatlIndicatorDiv(ix)}
                            {squareImageTag(sq,ix, black, piecesColor, setSelectSquarePosition)}
                        </>)
                        : horizonatlIndicatorDiv(ix))
                    : (sq !== ""
                        ? (<> {horizonatlIndicatorDiv(ix)}{squareImageTag(sq,ix, black, piecesColor, setSelectSquarePosition)}</>)
                        : horizonatlIndicatorDiv(ix))
                )
                : (ix === 0 ?
                    (sq !== ""
                        ? (<>
                            {verticalIndicatorDiv(rows, rowIx)}
                            {squareImageTag(sq,ix, black, piecesColor, setSelectSquarePosition)}
                        </>)
                        : verticalIndicatorDiv(rows, rowIx)
                    )
                    : (sq !== "" ? (<>{squareImageTag(sq,ix, black, piecesColor, setSelectSquarePosition)}</>) : '')
                )
            )}
        </div>);
    });
    return squares;
};

export default function getRows(
    black, white, chessboardState, boardPositions,
    selectSquarePosition, highlightedSquares,
    whiteCastling, blackCastling, turn, enPassant, halfMoves, fullMoves, setHighlightedSquares, setSelectSquarePosition, piecesColor,
    socket
) {
    const rows = chessboardState.map((row, rowIx, rows) => {
        return (
            <div className="row" key={rowIx}>
                {
                    getSquares(
                        row, rowIx, rows, black, white,
                        chessboardState, boardPositions, selectSquarePosition, highlightedSquares, whiteCastling, blackCastling, turn, enPassant, halfMoves, fullMoves, setHighlightedSquares, setSelectSquarePosition, piecesColor, socket
                    )
                }
            </div>
        );
    });
    return rows;
};