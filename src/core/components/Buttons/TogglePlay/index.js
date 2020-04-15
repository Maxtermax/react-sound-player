import React, { useReducer } from "react";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutline";
import ButtonRound from "@/core/components/Buttons/Round";

function reducer(state, action) {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    default:
      return { ...state };
  }
}

export default function TogglePlay({ onToggle, ...rest }) {
  const [state, dispatch] = useReducer(reducer, { isPlaying: false });

  return (
    <ButtonRound
      {...rest}
      onClick={() => {
        dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" });
        if (onToggle) onToggle(!state.isPlaying);
      }}
    >
      {
        <>
          {!state.isPlaying ? (
            <PlayCircleOutline></PlayCircleOutline>
          ) : (
            <PauseCircleOutline></PauseCircleOutline>
          )}
        </>
      }
    </ButtonRound>
  );
}
