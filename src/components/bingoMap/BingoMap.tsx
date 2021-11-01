import React, { useState, useEffect } from "react";
import BingoItem from "./bingoItem/BingoItem";
import BingEffect from "./bingoEffect/BingoEffect";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  initialBingo,
  setBingoItems,
  getSize,
  getlatestPickItem,
  getSelectedItems,
  getDiagonalBingoPatterns,
} from "../../reducer/bingo/bingoSlice";
import { getBingoMap } from "../../services/bingoAPI";
import "./bingoMap.css";

const config = {
  size: 5,
};

function BingoMap() {
  const [bingoCount, setBingoCount] = useState<number>(0);

  const [bingMapContent, setBingMapContent] = useState<(string | number)[]>([]);

  const size = useAppSelector(getSize);
  const selectedItems = useAppSelector(getSelectedItems);
  const latestPickItem = useAppSelector(getlatestPickItem);
  const diagonalBingoPatterns = useAppSelector(getDiagonalBingoPatterns);
  const dispatch = useAppDispatch();
  const getBingoPatterns = (latestPickItem: number) => {
    const xstart = Math.ceil(latestPickItem / size - 1) * size + 1;
    const ystart = latestPickItem - Math.ceil(latestPickItem / size - 1) * size;
    const binggoPatterns = [];

    let bingoNumber = xstart;
    let pattern = [bingoNumber];
    for (let i = 0; i < size - 1; i++) {
      pattern.push((bingoNumber += 1));
    }
    binggoPatterns.push(pattern);

    bingoNumber = ystart;
    pattern = [bingoNumber];
    for (let i = 0; i < size - 1; i++) {
      pattern.push((bingoNumber += size));
    }
    binggoPatterns.push(pattern);
    diagonalBingoPatterns.forEach((pattern) => {
      if (pattern.includes(latestPickItem)) {
        binggoPatterns.push(pattern);
      }
    });

    return binggoPatterns;
  };

  const checkBingo = (latestPickItem: number): void => {
    let count = 0;
    if (latestPickItem && selectedItems.length >= size) {
      const bingoPatterns = getBingoPatterns(latestPickItem);
      bingoPatterns.forEach((bingoPattern) => {
        const result = bingoPattern.filter((number) => {
          return selectedItems.includes(number);
        });
        if (result.length === size) {
          count++;
          console.log(result);
          dispatch(setBingoItems({ bingoItems: result }));
        }
      });
    }
    setBingoCount(bingoCount + count);
  };

  useEffect(() => {
    latestPickItem > 0 && checkBingo(latestPickItem);
  }, [latestPickItem]);

  useEffect(() => {
    bingMapContent &&
      bingMapContent.length > 0 &&
      dispatch(initialBingo({ size: 5, bingMapContent }));
  }, [bingMapContent]);

  useEffect(() => {
    setBingMapContent(getBingoMap(config.size));
  }, []);

  const renderBingoMap = (size: number, contents: (string | number)[]) => {
    let bingoNode = [];

    if (contents && contents.length > 0) {
      for (let i: number = 0; i < size; i++) {
        for (let j: number = 0; j < size; j++) {
          const id = i * size + j + 1;
          bingoNode.push(
            <BingoItem
              key={id.toString()}
              content={contents[id - 1].toString()}
              index={id}
              id={id}
            />
          );
        }
      }
    }
    return bingoNode;
  };
  return (
    <div className="bingo-container">
      <BingEffect count={bingoCount} />
      <div className="grid-container">
        {renderBingoMap(size, bingMapContent)}
      </div>
    </div>
  );
}

export default BingoMap;
