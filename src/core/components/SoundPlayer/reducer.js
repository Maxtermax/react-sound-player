export function reducer(state, action) {
  switch (action.type) {
    case "SET_PROGRESS": {
      const result = { ...state };
      const { progress, duration, currentTime } = action.payload;
      result.progress = progress;
      result.duration = duration;
      result.currentTime = currentTime;
      return result;
    }
    case "SET_NEXT_TRACK": {
      const result = { ...state };
      const currentIndex = result.tracks
        .map((track) => track.selected)
        .indexOf(true);
      console.log({ currentIndex });
      if (
        currentIndex !== -1 &&
        result.tracks[currentIndex + 1] &&
        currentIndex <= result.tracks.length
      ) {
        result.tracks = result.tracks.map((track) => ({
          ...track,
          isPlaying: false,
          buffering: false,
        }));
        result.tracks = result.tracks.map((track) => {
          track.selected = false;
          return track;
        });
        if (result.tracks[currentIndex + 1]) {
          result.tracks[currentIndex + 1].selected = true;
        }
      }
      return result;
    }
    case "SET_PREV_TRACK": {
      const result = { ...state };
      const currentIndex = result.tracks
        .map((track) => track.selected)
        .indexOf(true);
      if (currentIndex > 0) {
        result.tracks = result.tracks.map((track) => ({
          ...track,
          isPlaying: false,
          buffering: false,
        }));
        result.tracks = result.tracks.map((track) => {
          track.selected = false;
          return track;
        });
        if (result.tracks[currentIndex - 1]) {
          result.tracks[currentIndex - 1].selected = true;
        }
      }
      return result;
    }
    case "SET_EXPAND":
      return { ...state, expand: action.payload };
    case "SORT_BY_SELECTED": {
      const result = { ...state };
      const selected = { ...result.tracks.find((track) => track.selected) };
      result.tracks = result.tracks.filter((track) => !track.selected);
      result.tracks.unshift(selected);
      return result;
    }
    case "SET_PLAYING": {
      const result = { ...state };
      result.tracks = result.tracks.map((track) => ({
        ...track,
        isPlaying: action.payload && track.selected,
      }));
      return result;
    }
    case "SET_BUFFERING": {
      const result = { ...state };
      result.tracks = result.tracks.map((track) => ({
        ...track,
        buffering: action.payload && track.selected,
      }));
      return result;
    }
    case "SET_SELECTED": {
      const result = { ...state };
      result.tracks = result.tracks.map((track) => ({
        ...track,
        selected: action.payload === track.id,
      }));
      return result;
    }
    default:
      return { ...state };
  }
}
