import React, { useContext } from "react";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import "./style.css";

function prefixDigit(digit) {
  if (digit <= 9) return `0${digit}`;
  return `${digit}`;
}

export default function PlayerTimer() {
  const { duration, currentTime } = useContext(SoundPlayerContext);

  function mapTime(currentTime) {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - minutes * 60);
    return `${prefixDigit(minutes)}:${prefixDigit(seconds)}`;
  }

  function mapDurationToTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);
    return `${prefixDigit(minutes)}:${prefixDigit(seconds)}`;
  }

  return (
    <div className="player-timer">
      <span className="player-timer__start">{mapTime(currentTime)}</span>
      <span className="player-timer__end">{mapDurationToTime(duration)}</span>
    </div>
  );
}
