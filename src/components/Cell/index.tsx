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

  return (
    <button
      className="w-8 h-8"
      style={{
        backgroundColor: value >= 0 ? "orange" : "white",
        color: "white",
      }}
      onClick={() => {
        if (value < 0) dispatch(leftClick({ rowIndex, colIndex, value }));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (value < 0) dispatch(rightClick({ rowIndex, colIndex, value }));
      }}
    >
      {(value === -2 || value === -3) && "🚩"}
      {value === 8 && "💣"}
      {![-2, -3, 8].includes(value) && value}
    </button>
  );
}

export default Cell;
