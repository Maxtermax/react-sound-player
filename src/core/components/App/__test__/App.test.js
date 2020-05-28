import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import App from "../";
import { act } from "react-dom/test-utils";
import interfaces from "../../../interfaces";
const { MockProvider } = interfaces;
class RejectGetMethod extends MockProvider {
  fetchTracks() {
    return Promise.reject(new Error("MOCK"));
  }
}
class FakeTrackList extends MockProvider {
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
}
describe("<App/>", () => {
  let wrapper;
  it("render app with mock provider, simulating an error message", async () => {
    await act(async () => {
      wrapper = mount(<App Provider={RejectGetMethod} />);
    });
    expect(wrapper.find('[data-test="loading"]')).toExist();
    await act(async () => wrapper.update());
    // console.log(wrapper.debug());
    expect(wrapper.find('[data-test="error-message"]')).toExist();
  });

  it("render app with mock provider, provide a fake track list", async () => {
    await act(async () => {
      wrapper = mount(<App Provider={FakeTrackList} />);
    });
    expect(wrapper.find('[data-test="loading"]')).toExist();
    await act(async () => wrapper.update());
    // console.log(wrapper.debug());
    expect(wrapper.find("li")).toExist();
  });

  it("render app with mock provider, test the expand button", async () => {
    await act(async () => {
      wrapper = mount(<App Provider={FakeTrackList} />);
    });
    expect(wrapper.find('[data-test="loading"]')).toExist();
    await act(async () => wrapper.update());
    expect(wrapper.find('[data-test="icon-close"]')).toExist();
    wrapper.find('button[data-test="btn-toggle-expand"]').simulate("click");
    expect(wrapper.find('[data-test="icon-open"]')).toExist();
  });
});
