import interfaces from "../../../interfaces";
const { MockProvider } = interfaces;

module.exports = class RejectGetMethod extends MockProvider {
  fetchTracks() {
    return Promise.reject(new Error("MOCK"));
  }
};
