import React, { useContext } from "react";
import ReproduceOptions from "@/core/components/ReproduceOptions";
import ProgressBar from "@/core/components/ProgressBar";
import PlayerTimer from "@/core/components/PlayerTimer";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import "./style.css";

export default function PlayerControls() {
  const { progress } = useContext(SoundPlayerContext);
  return (
    <div className="container-controls">
      <div className="controls__options">
        <section className="options__reproduce">
          <ReproduceOptions></ReproduceOptions>
        </section>
      </div>
      <PlayerTimer></PlayerTimer>
      {!!progress && <ProgressBar></ProgressBar>}
    </div>
  );
}
