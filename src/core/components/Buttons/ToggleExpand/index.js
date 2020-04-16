import React, { useReducer } from "react";
import ButtonRound from "@/core/components/Buttons/Round";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, display: true };
    case "CLOSE":
      return { ...state, display: false };
    default:
      return { ...state };
  }
}

export default function ToggleExpand({ onToggle }) {
  const [state, dispatch] = useReducer(reducer, { display: false });
  return (
    <ButtonRound
      data-test="btn-toggle-expand"
      onClick={() => {
        if (onToggle) onToggle(!state.display);
        dispatch({ type: state.display ? "CLOSE" : "OPEN" });
      }}
      style={{ zoom: 0.5 }}
    >
      {state.display ? (
        <ExpandMore data-test="icon-open"></ExpandMore>
      ) : (
        <ExpandLess data-test="icon-close"></ExpandLess>
      )}
    </ButtonRound>
  );
}
