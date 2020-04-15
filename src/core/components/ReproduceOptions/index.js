import React, { useContext } from "react";
import ButtonTogglePlay from "@/core/components/Buttons/TogglePlay";
import ToggleExpandButton from "@/core/components/Buttons/ToggleExpand";
import ButtonRound from "@/core/components/Buttons/Round";
import FastRewind from "@material-ui/icons/FastRewind";
import FastForward from "@material-ui/icons/FastForward";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import "./style.css";

export default function ReproduceOptions() {
  const { setExpand, setPlaying, setPrevTrack, setNextTrack } = useContext(
    SoundPlayerContext
  );

  return (
    <div className="reproducer">
      <section className="options">
        <ButtonRound onClick={setPrevTrack} style={{ zoom: 0.5 }}>
          <FastRewind></FastRewind>
        </ButtonRound>
        <ButtonTogglePlay
          id="togglePlay"
          onToggle={setPlaying}
        ></ButtonTogglePlay>
        <ButtonRound onClick={setNextTrack} style={{ zoom: 0.5 }}>
          <FastForward></FastForward>
        </ButtonRound>
      </section>
      <ToggleExpandButton onToggle={setExpand}></ToggleExpandButton>
    </div>
  );
}
