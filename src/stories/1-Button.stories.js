import React from "react";
import { action } from "@storybook/addon-actions";
import ToggleExpand from "@/core/components/Buttons/ToggleExpand";
import TogglePlay from "@/core/components/Buttons/TogglePlay";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import { SoundPlayer as SoundPlayerStore } from "@/core/stores";

export default {
  title: "Button",
  components: ToggleExpand,
};

export const Expand = () => (
  <SoundPlayerContext.Provider value={SoundPlayerStore}>
    <ToggleExpand onToggle={action("expand click!!!")}></ToggleExpand>
  </SoundPlayerContext.Provider>
);

export const Pause = () => (
  <SoundPlayerContext.Provider
    value={{
      ...SoundPlayerStore,
      progress: 1,
      tracks: [{ isPlaying: true }],
      setPlaying: action("pause button click!!!")
    }}
  >
    <TogglePlay></TogglePlay>
  </SoundPlayerContext.Provider>
);

export const Play = () => (
  <SoundPlayerContext.Provider
    value={{
      ...SoundPlayerStore,
      tracks: [],
      setPlaying: action("play button click!!!")
    }}
  >
    <TogglePlay></TogglePlay>
  </SoundPlayerContext.Provider>
);
