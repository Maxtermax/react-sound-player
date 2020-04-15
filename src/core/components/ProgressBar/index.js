import React, { useContext, useRef } from "react";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import "./style.css";

export default function ProgressBar() {
  const { progress, duration, setCurrentTime } = useContext(SoundPlayerContext);
  const barRef = useRef(null);
  function changePosition(event) {
    const { clientX } = event;
    const { clientWidth } = barRef.current;
    const percent = clientX / clientWidth;
    const currentTime = duration * percent;
    setCurrentTime(currentTime);
  }
  return (
    <div className="progress" ref={barRef} onClick={changePosition}>
      <div className="progress__fill" style={{ width: `${progress}%` }}>
        <div className="progress__fill__pointer"></div>
      </div>
    </div>
  );
}
