import interfaces from "../../../interfaces";
const { MockProvider } = interfaces;

export default class RejectGetMethod extends MockProvider {
  fetchTracks() {
    return Promise.reject(new Error("MOCK"));
  }
};
