import interfaces from "@/core/interfaces";
const { MockProvider } = interfaces;

export default class FakeTrackList extends MockProvider {
  constructor(token = "") {
    super();
    this.token = token;
  }

  fetchTracks() {
    return window
      .fetch(`${process.env.API_URL}/playlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY 
        },
      })
      .then((res) => {
        if (res.status !== 200) return Promise.reject(res);
        return res.json();
      });
    } 
}
