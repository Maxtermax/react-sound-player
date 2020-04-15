import React, { useContext } from "react";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutline";
import ButtonRound from "@/core/components/Buttons/Round";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";

export default function TogglePlay(props) {
  const { tracks, progress, setPlaying } = useContext(SoundPlayerContext);
  const isPlaying = tracks.some((track) => track.isPlaying) && progress > 0;
  const isBuffering = tracks.some((track) => track.buffering);

  return (
    <ButtonRound
      {...props}
      onClick={() => setPlaying(!isPlaying)}
      disabled={isBuffering}
    >
      {
        <>
          {!isPlaying ? (
            <PlayCircleOutline></PlayCircleOutline>
          ) : (
            <PauseCircleOutline></PauseCircleOutline>
          )}
        </>
      }
    </ButtonRound>
  );
}
