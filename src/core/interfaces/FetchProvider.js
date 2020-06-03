export default class FetchProvider {
  constructor(token = "") {
    this.token = token;
  }
  fetchTracks() {
    return window
      .fetch(`${process.env.API_URL}/q/WqM5dTtc?token=${this.token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status !== 200) return Promise.reject(res);
        return res.json();
      });
  }
}
