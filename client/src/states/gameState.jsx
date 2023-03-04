import { createSlice } from "@reduxjs/toolkit";

const gameState = {
    checkmate: false,
    end: null,
};

const gameSlice = createSlice({
    name: 'gameState',
    initialState: [],
    reducers: {
        updateGame: (state, action) => {
            switch (action.payload.type) {
                case 'checkmate':
                    state.checkmate = action.payload.newValue;
                    break;
                case 'end':
                    state.win = action.payload.newValue;
                    break;
            }
        }
    }
});
export const { updateGame } = gameSlice.actions;
export default gameSlice.reducer;