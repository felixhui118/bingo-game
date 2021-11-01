import React, { useState, useEffect } from "react";
import "./bingoEffect.css";

function BingEffect({ count }: { count: number }) {
  const [runEffect, setRunEffect] = useState<boolean>(false);
  const initEffect = () => {
    setRunEffect(true);
  };
  const resetEffect = () => {
    setRunEffect(false);
  };
  useEffect(() => {
    if (count > 0) {
      initEffect();
      setTimeout(() => {
        resetEffect();
      }, 1500);
    }
  }, [count]);
  return (
    <div>
      {runEffect && (
        <div className="bingo-effect-container ">
          <div className="text">
            <div className="animate-text">
              <span>B</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
              <span>O</span>
              {count > 0 && (
                <span className="bingo-count">
                  <span className="x">x</span> {count}
                </span>
              )}
            </div>
          </div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      )}
    </div>
  );
}

export default BingEffect;
