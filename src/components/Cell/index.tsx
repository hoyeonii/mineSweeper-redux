import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { board, leftClick, rightClick } from "../../app/mineSlice";

interface CellI {
  rowIndex: number;
  colIndex: number;
  value: number;
}
function Cell({ rowIndex, colIndex, value }: CellI) {
  const dispatch = useAppDispatch();
  const { gameStatus } = useAppSelector(board);
  return (
    <span
      style={{
        border: "1px solid salmon",
        margin: "10px",
        backgroundColor: value >= 0 ? "white" : "gray",
      }}
      onClick={() => {
        if (value < 0) dispatch(leftClick({ rowIndex, colIndex, value }));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (value < 0) dispatch(rightClick({ rowIndex, colIndex, value }));
      }}
    >
      {value}
    </span>
  );
}

export default Cell;
