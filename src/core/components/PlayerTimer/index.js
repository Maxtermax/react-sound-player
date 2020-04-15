import React, { useContext } from "react";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import { mapTime, mapDurationToTime } from "@/core/utils";
import "./style.css";

export default function PlayerTimer() {
  const { duration, currentTime } = useContext(SoundPlayerContext);
  return (
    <div className="player-timer">
      <span className="player-timer__start">{mapTime(currentTime)}</span>
      <span className="player-timer__end">{mapDurationToTime(duration)}</span>
    </div>
  );
}
