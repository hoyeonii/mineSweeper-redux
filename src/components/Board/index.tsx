import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { board, leftClick, playAgain, resize } from "../../app/mineSlice";
import { CODE, GAME_STATUS } from "../../constants";

function Board() {
  const {
    boardData,
    boardSize: { rowCount, colCount, mineCount },
    openedCellCount,
    gameStatus,
  } = useAppSelector(board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    createMine();
  }, [rowCount]);

  const createMine = () => {
    const flatBoardArr = Array(rowCount * colCount)
      .fill(CODE.NORMAL)
      .fill(CODE.MINE, -mineCount)
      .sort(() => 0.5 - Math.random());

    const shuffledArr = [];
    while (flatBoardArr.length)
      shuffledArr.push(flatBoardArr.splice(0, colCount));

    dispatch(resize(shuffledArr));
  };

  return (
    <div>
      Board{rowCount}
      {colCount}/{openedCellCount}
      {rowCount * colCount - mineCount} more cell to go
      {gameStatus}
      {gameStatus !== GAME_STATUS.PLAYING && (
        <button
          onClick={() => {
            dispatch(playAgain());
            createMine();
          }}
        >
          Play Again
        </button>
      )}
      {boardData.map((row, rowIdx) => (
        <div>
          {row.map((val, colIdx) => (
            <Cell rowIndex={rowIdx} colIndex={colIdx} value={val} />
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
