import React, { useContext, useRef, useState } from "react";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import { mapTime } from "@/core/utils";
import "./style.css";

export default function ProgressBar() {
  const [time, setTime] = useState(0);
  const { progress, duration, setCurrentTime } = useContext(SoundPlayerContext);
  const barRef = useRef(null);
  function changePosition(event) {
    const { clientX } = event;
    const { clientWidth } = barRef.current;
    const percent = clientX / clientWidth;
    const currentTime = duration * percent;
    setCurrentTime(currentTime);
  }

  function calculateCurrentTime(event) {
    const { clientX } = event;
    const { clientWidth } = barRef.current;
    const percent = clientX / clientWidth;
    return duration * percent;
  }

  return (
    <div
      className="progress"
      title={mapTime(time)}
      onMouseMove={(e) => setTime(calculateCurrentTime(e))}
      ref={barRef}
      onClick={changePosition}
    >
      <div className="progress__fill" style={{ width: `${progress}%` }}>
        <div className="progress__fill__pointer"></div>
      </div>
    </div>
  );
}
