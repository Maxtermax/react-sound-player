import { useEffect } from "react";
export function useScrollTrack(state) {
  useEffect(() => {
    if (!state.expand) {
      const track = state.tracks.find((item) => item.selected);
      if (track) {
        const $track = document.querySelector(`[data-track='${track.id}']`);
        if ($track) {
          setTimeout(() => $track.scrollIntoView({ behavior: "smooth" }), 400);
        }
      }
    }
  }, [state.expand, state.tracks]);
}
