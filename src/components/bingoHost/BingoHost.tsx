import React, { useState, useEffect } from "react";
import { getBingoContents } from "../../services/bingoAPI";
import "./bingoHost.css";

function BingoHost() {
  const [bingoContents, setBingoContents] = useState<(string | number)[]>([]);
  const [usedContents, setUsedContents] = useState<(string | number)[]>([]);
  useEffect(() => {
    setBingoContents(getBingoContents().sort(() => Math.random() - 0.5));
  }, [setBingoContents]);
  return (
    <div className="used-content-container">
      <div className="latest-pick">{[...usedContents].pop()}</div>
      <div>
        <button
          className="button"
          onClick={() => {
            if (bingoContents && bingoContents.length > 0) {
              const item = bingoContents.shift();
              item && setUsedContents([...usedContents, item]);
            }
          }}
        >
          Get Number ({bingoContents.length})
        </button>
      </div>
      <div className="used-content-list">
        {usedContents.length > 0 &&
          usedContents.map((value) => <span>{value}</span>)}
      </div>
    </div>
  );
}

export default BingoHost;
