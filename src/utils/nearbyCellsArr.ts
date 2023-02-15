import {CODE} from "../constants";

const nearbyCellsArr = (
  rowIndex: number,
  colIndex: number,
  boardData: number[][]
) => {
  const aroundArr: number[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        rowIndex - 1 + i >= 0 &&
        colIndex - 1 + j >= 0 &&
        rowIndex - 1 + i < boardData.length &&
        colIndex - 1 + j < boardData[0].length
      ) {
        aroundArr.push(boardData[rowIndex - 1 + i][colIndex - 1 + j]);
      }
    }
  }

  return aroundArr;
};

export default nearbyCellsArr;
