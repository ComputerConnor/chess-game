// make a fen string from chess board current positions of pieces and from additional informations about possibilities of movement
export default function toFen({positions}, fenState) {
    // make array of fenState object values
    const fenStatisticsArray = Object.entries(fenState).map(([p, v]) => v);
    let whiteCastling = fenStatisticsArray[0];
    let blackCastling = fenStatisticsArray[1];
    let turn = fenStatisticsArray[2];
    let enPassant = fenStatisticsArray[3];
    let halfMoves = fenStatisticsArray[4];
    let fullMoves = fenStatisticsArray[5];
    let fenPartOne = '';
    for (let i = 0; i < positions.length; i++) {
        let fenFirstPartContent = [];
        for (let j = 0; j < positions[i].length; j++) {
            if (positions[i][j] === "") {
                if (typeof fenFirstPartContent[fenFirstPartContent.length - 1] === 'number') {
                    fenFirstPartContent[fenFirstPartContent.length - 1] = fenFirstPartContent[fenFirstPartContent.length - 1] + 1
                } else {
                    fenFirstPartContent.push(1);
                }
            } else {
                fenFirstPartContent.push(positions[i][j]);
            }
        }
        if (i === 7) fenPartOne += fenFirstPartContent.join('');
        else fenPartOne += fenFirstPartContent.join('') + '/';
    }
    return (fenPartOne + ' ' + turn + ' ' + whiteCastling + blackCastling + ' ' + enPassant + ' ' + halfMoves + ' ' + fullMoves);
}