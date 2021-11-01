import React, { useState } from "react";
import "./App.css";
import BingoMap from "./components/bingoMap/BingoMap";

import BingoHost from "./components/bingoHost/BingoHost";

function App() {
  const [userType, setUserType] = useState<"host" | "player" | null>(null);
  return (
    <div className="App">
      {!userType && (
        <div>
          <span className="instruction-text">
            {" "}
            I am a{" "}
            <button className="host button" onClick={() => setUserType("host")}>
              Host
            </button>
            /
            <button
              className="player button"
              onClick={() => setUserType("player")}
            >
              Player
            </button>
          </span>
        </div>
      )}

      {userType === "host" && <BingoHost />}
      {userType === "player" && <BingoMap />}
    </div>
  );
}

export default App;
