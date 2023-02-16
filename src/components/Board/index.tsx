import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { board, startGame } from "../../app/mineSlice";
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
    createMine(5, 5);
  }, []);

  const createMine = (rowCount: number, mineCount: number) => {
    dispatch(startGame({ rowCount: rowCount, mineCount: mineCount }));
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

      {gameStatus !== GAME_STATUS.PLAYING ? (
        <button
          className="bg-amber-500 px-4 py-2 text-white font-bold"
          onClick={() => {
            createMine(5, 5);
          }}
        >
          Play Again
        </button>
      ) : (
        [3, 5, 7].map((count) => (
          <button
            className="bg-amber-500 m-4 px-4 py-2 text-white font-bold"
            onClick={() => createMine(count, count)}
          >
            {count}X{count}
          </button>
        ))
      )}
    </div>
  );
}
export default Board;
