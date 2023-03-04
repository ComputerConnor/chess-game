export default function PromptingPawn({ sq, black, coordinates, updatePositions, setPrompted }) {
    function handlePrompt(coordinates, sq) {
        const rowIx = parseInt(coordinates.split('-')[0]);
        const squareIx = parseInt(coordinates.split('-')[1]);
        updatePositions(rowIx, squareIx, rowIx, squareIx, sq,);
        setPrompted(null);
    }
    return (
        <div className="popup">
            <div className="popup-square">
                <img
                    src={'./imgs/' + (black.includes(sq) ? 'black/b' : 'white/w') + sq.toUpperCase() + '.png'}
                    alt="Queen"
                    title="Queen"
                    onClick={() => handlePrompt(black.includes(sq) ? 'q' : 'Q', coordinates)}
                />
            </div>
            <div className="popup-square">
                <img
                    src={'./imgs/' + (black.includes(sq) ? 'black/b' : 'white/w') + sq.toUpperCase() + '.png'}
                    alt="Bishop"
                    title="Bishop"
                    onClick={() => handlePrompt(black.includes(sq) ? 'b' : 'B', coordinates)}
                />
            </div>
            <div className="popup-square">
                <img
                    src={'./imgs/' + (black.includes(sq) ? 'black/b' : 'white/w') + sq.toUpperCase() + '.png'}
                    alt="Rook"
                    title="Rook"
                    onClick={() => handlePrompt(black.includes(sq) ? 'r' : 'R', coordinates)}
                />
            </div>
            <div className="popup-square">
                <img
                    src={'./imgs/' + (black.includes(sq) ? 'black/b' : 'white/w') + sq.toUpperCase() + '.png'}
                    alt="Knight"
                    title="Knight"
                    onClick={() => handlePrompt(black.includes(sq) ? 'n' : 'N', coordinates)}
                />
            </div>
        </div>
    )
}
