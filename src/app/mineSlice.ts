import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk, store } from "./store";
import { CODE, GAME_STATUS } from "../constants";
import nearbyCellsArr from "../utils/nearbyCellsArr";

// export interface CounterState {
//   value: number;
//   status: "idle" | "loading" | "failed";
// }

const initialState = {
  boardData: [] as number[][],
  boardSize: { rowCount: 5, colCount: 5, mineCount: 5 },
  gameStatus: GAME_STATUS.PLAYING,
  openedCellCount: 0,
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    leftClick: (state, action) => {
      if ([GAME_STATUS.WIN, GAME_STATUS.LOST].includes(state.gameStatus))
        return;

      const openCell = (rowIndex: number, colIndex: number) => {
        const mineCountArroundCell = nearbyCellsArr(
          rowIndex,
          colIndex,
          state.boardData
        ).filter((el) => [CODE.FLAG_MINE, CODE.MINE].includes(el)).length;

        state.boardData[rowIndex][colIndex] = mineCountArroundCell;
        state.openedCellCount += 1;

        if (mineCountArroundCell === 0) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (
                rowIndex - 1 + i >= 0 &&
                colIndex - 1 + j >= 0 &&
                rowIndex - 1 + i < state.boardData.length &&
                colIndex - 1 + j < state.boardData[0].length
              ) {
                if (state.boardData[rowIndex - 1 + i][colIndex - 1 + j] < 0) {
                  openCell(rowIndex - 1 + i, colIndex - 1 + j);
                }
              }
            }
          }
        }
      };

      if (action.payload.value === CODE.NORMAL) {
        openCell(action.payload.rowIndex, action.payload.colIndex);

        if (
          state.openedCellCount ===
          state.boardSize.rowCount * state.boardSize.colCount -
            state.boardSize.mineCount
        ) {
          state.gameStatus = GAME_STATUS.WIN;
        }
      }

      if (action.payload.value === CODE.MINE) {
        state.boardData[action.payload.rowIndex][action.payload.colIndex] = 8;
        state.gameStatus = GAME_STATUS.LOST;
      }

      //check if the player won
    },

    rightClick: (state, action) => {
      if ([CODE.NORMAL, CODE.MINE].includes(action.payload.value)) {
        state.boardData[action.payload.rowIndex][action.payload.colIndex] =
          action.payload.value === CODE.NORMAL ? CODE.FLAG : CODE.FLAG_MINE;
      } else {
        state.boardData[action.payload.rowIndex][action.payload.colIndex] =
          action.payload.value === CODE.FLAG ? CODE.NORMAL : CODE.MINE;
      }
    },

    playAgain: (state) => {
      state.gameStatus = GAME_STATUS.PLAYING;
    },

    resize: (state, action) => {
      state.boardData = action.payload;
    },
  },
});

export const { leftClick, rightClick, playAgain, resize } = mineSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const board = (state: RootState) => state.minesweeper;

export default mineSlice.reducer;
