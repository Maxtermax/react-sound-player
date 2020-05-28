import interfaces from "../../../interfaces";
const { MockProvider } = interfaces;

module.exports = class FakeTrackList extends MockProvider {
  fetchTracks() {
    return Promise.resolve({
      albums: [
        {
          id: 1,
          name: "Mock album",
        },
      ],
      tracks: [
        {
          id: 1,
          album: 1,
          name: "Mockt track",
        },
      ],
    });
  }
};
