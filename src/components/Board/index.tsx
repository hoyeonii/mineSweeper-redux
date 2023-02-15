import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { board, leftClick, startGame } from "../../app/mineSlice";
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

    dispatch(startGame(shuffledArr));
  };

  return (
    <div>
      <h1
        className="text-4xl font-bold underline m-2"
        style={{ color: gameStatus === GAME_STATUS.WIN ? "orange" : "black" }}
      >
        {gameStatus}
      </h1>
      <span className="text-xl">
        {openedCellCount}/ {rowCount * colCount - mineCount}
      </span>
      <br />

      <div
        className="mx-auto my-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rowCount},1fr)`,
          gridGap: "10px",
          width: "fit-content",
        }}
      >
        {boardData.flat().map((cell, i) => (
          <Cell
            rowIndex={Math.floor(i / rowCount)}
            colIndex={i % rowCount}
            value={cell}
          />
        ))}
      </div>

      {gameStatus !== GAME_STATUS.PLAYING && (
        <button
          className="bg-amber-500 px-4 py-2 text-white font-bold"
          onClick={() => {
            createMine();
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
export default Board;
