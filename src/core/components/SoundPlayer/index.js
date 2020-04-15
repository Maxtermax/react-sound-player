import React, { useReducer } from "react";
import PlayerControls from "@/core/components/PlayerControls";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import TracksList from "@/core/components/TracksList";
import { reducer } from "./reducer";
import "./style.css";

const albums = {
  1: {
    name: "Currents",
    cover: "https://i.imgur.com/WZXn6E7.jpg",
    id: 1,
  },
  2: {
    name: "Pop Food",
    cover: "https://f4.bcbits.com/img/a1853711793_5.jpg",
    id: 2,
  },
};

const tracks = [
  {
    album: 1,
    id: 1,
    name: "The Less I Know the Better",
    src: "/The Less I Know The Better_PvM79DJ2PmM.mp3",
    selected: false,
  },
  {
    album: 1,
    id: 2,
    name: "Let It Happen",
    src: "/Tame Impala - Let It Happen (Official Audio)_-ed6UeDp1ek.mp3",
    selected: false,
  },
  {
    id: 3,
    album: 2,
    name: "Buttercup",
    src: "/Buttercup_e2qG5uwDCW4.mp3",
    selected: false,
  },
];

export default function SoundPlayer() {
  const [state, dispacher] = useReducer(reducer, {
    expand: false,
    tracks,
    albums,
    progress: 0,
    duration: 0,
    currentTime: 0,
  });

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
          setPrevTrack: () => {
            if (window.interval) {
              window.clearInterval(window.interval);
              window.interval = null;
            }
            dispacher({ type: "SET_PLAYING", payload: false });
            dispacher({ type: "SET_PREV_TRACK" });
            dispacher({ type: "SET_BUFFERING", payload: true });
            dispacher({ type: "SORT_BY_SELECTED" });
            window.interval = setTimeout(() => {
              dispacher({ type: "SET_BUFFERING", payload: false });
              dispacher({ type: "SET_PLAYING", payload: true });
            }, 4000);
          },
          setNextTrack: () => {
            if (window.interval) {
              window.clearInterval(window.interval);
              window.interval = null;
            }
            dispacher({ type: "SET_PLAYING", payload: false });
            dispacher({ type: "SET_NEXT_TRACK" });
            dispacher({ type: "SET_BUFFERING", payload: true });
            // dispacher({ type: "SORT_BY_SELECTED" });
            window.interval = setTimeout(() => {
              dispacher({ type: "SET_BUFFERING", payload: false });
              dispacher({ type: "SET_PLAYING", payload: true });
            }, 4000);
          },
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
            const track = state.tracks.find((item) => item.selected);
            if (track) dispacher({ type: "SORT_BY_SELECTED" });
          },
          setBuffering(payload) {
            dispacher({ type: "SET_BUFFERING", payload });
          },
          setSelected: (payload) => {
            dispacher({ type: "SET_SELECTED", payload });
          },
          setPlaying: (payload) => {
            const $togglePlay = document.getElementById("togglePlay");
            if ($togglePlay) {
              $togglePlay.click();
            }
            dispacher({ type: "SET_PLAYING", payload });
            if (payload) {
              const track = state.tracks.find((item) => item.selected);
              const notFound = !track;
              if (notFound) {
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
