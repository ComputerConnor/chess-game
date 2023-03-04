import { createSlice } from "@reduxjs/toolkit";
// fen string components
const fenState = {
    whiteCastling: "KQ",
    blackCastling: "kq",
    turn: "w",
    enPassant: "-",
    halfMoves: 0,
    fullMoves: 1,
};

const fenSlice = createSlice({
    name: 'fenState',
    initialState: fenState,
    reducers: {
        updatePart: (state, action) => {
            state[action.payload.property] = action.payload.newValue
        }
    }
});

export const { updatePart } = fenSlice.actions;
export default fenSlice.reducer;