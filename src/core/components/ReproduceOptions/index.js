import React, { useContext } from "react";
import ButtonTogglePlay from "@/core/components/Buttons/TogglePlay";
import ToggleExpandButton from "@/core/components/Buttons/ToggleExpand";
import ButtonRound from "@/core/components/Buttons/Round";
import FastRewind from "@material-ui/icons/FastRewind";
import FastForward from "@material-ui/icons/FastForward";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import "./style.css";

export default function ReproduceOptions() {
  const { setExpand, setSelected, tracks = [] } = useContext(
    SoundPlayerContext
  );

  function setNextTrack(tracks = []) {
    const currentPlaying = tracks.map((track) => track.isPlaying).indexOf(true);
    const canPlayNext = currentPlaying !== -1 && tracks[currentPlaying + 1];
    if (canPlayNext) {
      const nextTrack = tracks[currentPlaying + 1].id;
      return setSelected(nextTrack);
    }
    if (currentPlaying === -1) {
      const [firstTrack] = tracks;
      return setSelected(firstTrack.id);
    }
  }

  function setPrevTrack(tracks = []) {
    const currentPlaying = tracks.map((track) => track.isPlaying).indexOf(true);
    const canPlayPrev = currentPlaying !== -1 && tracks[currentPlaying - 1];
    if (canPlayPrev) {
      const prevTrack = tracks[currentPlaying - 1].id;
      setSelected(prevTrack);
    }
  }

  return (
    <div className="reproducer">
      <section className="options">
        <ButtonRound onClick={() => setPrevTrack(tracks)} style={{ zoom: 0.5 }}>
          <FastRewind></FastRewind>
        </ButtonRound>
        <ButtonTogglePlay></ButtonTogglePlay>
        <ButtonRound onClick={() => setNextTrack(tracks)} style={{ zoom: 0.5 }}>
          <FastForward></FastForward>
        </ButtonRound>
      </section>
      <ToggleExpandButton onToggle={setExpand}></ToggleExpandButton>
    </div>
  );
}
