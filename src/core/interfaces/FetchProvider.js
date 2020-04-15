import { BASE_URL } from "@/core/services/DataProvider";

export default class FetchProvider {
  constructor(token = "") {
    this.token = token;
  }
  get() {
    return window
      .fetch(`${BASE_URL}/q/WqM5dTtc?token=${this.token}`, {
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
