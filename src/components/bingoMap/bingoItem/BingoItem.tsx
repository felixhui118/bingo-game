import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  setLatestPickItem,
  setSelectedItems,
  getBingoItems,
} from "../../../reducer/bingo/bingoSlice";

function BingoItem({
  content,
  id,
  index,
}: {
  content: string;
  id: number;
  index: number;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const bingoItems = useAppSelector(getBingoItems);

  const dispatch = useAppDispatch();
  const onClickhandler = (latestPickItem: number): void => {
    if (!isSelected) {
      setIsSelected(true);
      dispatch(setSelectedItems(latestPickItem));
      dispatch(setLatestPickItem(latestPickItem));
    }
  };
  return (
    <div
      className={`grid ${isSelected ? "selected" : ""} ${
        bingoItems.includes(index) ? "bingo" : ""
      }`}
      onClick={() => onClickhandler(index)}
    >
      <div>{content}</div>
    </div>
  );
}

export default BingoItem;
