import React, { useReducer } from "react";
import PlayerControls from "@/core/components/PlayerControls";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import { SoundPlayer as SoundPlayerStore } from "@/core/stores";
import TracksList from "@/core/components/TracksList";
import { reducer } from "./reducer";
import "./style.css";
import { useScrollTrack } from "@/core/hooks/useScrollTrack";

export default function SoundPlayer(props) {
  const { data } = props;
  const { albums, tracks } = data;
  const [state, dispacher] = useReducer(reducer, {
    ...SoundPlayerStore,
    albums,
    tracks,
  });

  useScrollTrack(state);

  function playTrack(id, play) {
    const $audio = document.querySelector(`[data-id='${id}']`);
    if ($audio) {
      if (play) return $audio.play();
      $audio.pause();
    }
  }

  function setTimeTrack(id, time) {
    const $audio = document.querySelector(`[data-id='${id}']`);
    if ($audio) $audio.currentTime = time;
  }

  return (
    <div className="container">
      <SoundPlayerContext.Provider
        value={{
          ...state,
          expand: state.expand,
          setTime(event) {
            const { target } = event;
            const { currentTime, duration } = target;
            const payload = {
              progress: (currentTime / duration) * 100,
              duration,
              currentTime,
            };
            dispacher({ type: "SET_PROGRESS", payload });
          },
          setCurrentTime(currentTime) {
            const track = state.tracks.find((item) => item.selected);
            setTimeTrack(track.id, currentTime);
          },
          setExpand: (payload) => {
            dispacher({ type: "SET_EXPAND", payload });
          },
          setBuffering(payload) {
            dispacher({ type: "SET_BUFFERING", payload });
          },
          setSelected: (payload) => {
            dispacher({ type: "SET_SELECTED", payload });
          },
          setPlaying: (payload) => {
            dispacher({ type: "SET_PLAYING", payload });
            if (payload) {
              const track = state.tracks.find((item) => item.selected);
              const anySelected = !track;
              if (anySelected) {
                const [firstTrack] = tracks;
                dispacher({ type: "SET_SELECTED", payload: firstTrack.id });
                return playTrack(firstTrack.id, payload);
              }
              return playTrack(track.id, payload);
            }
            const track = state.tracks.find((item) => item.selected);
            if (track) playTrack(track.id, payload);
          },
        }}
      >
        <>
          <TracksList></TracksList>
          <PlayerControls></PlayerControls>
        </>
      </SoundPlayerContext.Provider>
    </div>
  );
}
