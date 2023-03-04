import { createSlice } from "@reduxjs/toolkit";
// board positions using number vertically and letters horizontally
function chessBoardPositions(){
    const array = [];
    const arr = 'abcdefgh'.split('').map((ele, ix) => {
        const arr = [];
        for (let i = 1; i < 9; i++) { 
            arr.push(ele + i) }; 
            return arr
    });
    for(let i = 0; i<8;i++){
        array.push([]);
        for(let j = 0; j<8;j++){                
            array[i].push(arr[j][i]);
        };
    };
    return array.reverse();
};

const chessboardState = {
    positions: [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ],
    black: ["r", "n", "b", "q", "k", "p"],
    white: ["R", "N", "B", "Q", "K", "P"],
    locations: chessBoardPositions(),
    moveInfo: {
        firstMoveIsMade: false,
        piece: null,
        position: null,
    },
    piecesColor: 'white',
};

const positionsSlice = createSlice({
    name: 'chessboardState',
    initialState: chessboardState,
    reducers: {
        movePiece: (state, {payload}) => {
            const piece = state.positions[payload.oldRowIx][payload.oldSquareIx];
            state.positions[payload.oldRowIx][payload.oldSquareIx] = '';
            state.positions[payload.newRowIx][payload.newSquareIx] = piece;
        },
        updateMoveInfo: (state, { payload }) => {
            state.moveInfo = payload.moveInfo
        },
        updatePiecesColor: (state, { payload }) => {
            state.piecesColor = payload;
        }
    },
});
export const { movePiece, updateMoveInfo, updatePiecesColor } = positionsSlice.actions;
export default positionsSlice.reducer;