import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BingoState {
  size: number;
  mapContent: (string | number)[];
  latestPickItem: number;
  selectedItems: number[];
  diagonalBingoPatterns: number[][];
  bingoItems: number[];
}

const initialState: BingoState = {
  size: 5,
  mapContent: [],
  latestPickItem: 0,
  selectedItems: [],
  diagonalBingoPatterns: [],
  bingoItems: [],
};

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    setLatestPickItem: (state, action: PayloadAction<number>) => {
      state.latestPickItem = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<number>) => {
      state.selectedItems.push(action.payload);
    },
    setBingoItems: (
      state,
      action: PayloadAction<{
        bingoItems: number[];
      }>
    ) => {
      state.bingoItems = state.bingoItems.concat(
        state.bingoItems,
        action.payload.bingoItems
      );
    },
    initialBingo: (
      state,
      action: PayloadAction<{
        size: number;
        bingMapContent: (string | number)[];
      }>
    ) => {
      state.size = action.payload.size;
      state.mapContent = action.payload.bingMapContent;

      let itemIndex = 1;
      let pattern = [itemIndex];
      for (let i = 0; i < action.payload.size - 1; i++) {
        pattern.push((itemIndex += action.payload.size + 1));
      }
      state.diagonalBingoPatterns.push(pattern);

      itemIndex = action.payload.size;
      pattern = [itemIndex];
      for (let i = 0; i < action.payload.size - 1; i++) {
        pattern.push((itemIndex += action.payload.size - 1));
      }
      state.diagonalBingoPatterns.push(pattern);
    },
  },
  extraReducers: (builder) => {},
});

export const {
  initialBingo,
  setSelectedItems,
  setLatestPickItem,
  setBingoItems,
} = bingoSlice.actions;

export const getSize = (state: RootState) => state.bingo.size;
export const getSelectedItems = (state: RootState) => state.bingo.selectedItems;
export const getlatestPickItem = (state: RootState) =>
  state.bingo.latestPickItem;
export const getDiagonalBingoPatterns = (state: RootState) =>
  state.bingo.diagonalBingoPatterns;

export const getBingoItems = (state: RootState) => state.bingo.bingoItems;

export default bingoSlice.reducer;
