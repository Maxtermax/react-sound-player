import React from "react";
import App from "@/core/components/App";
import FakeTrackList from "@/core/components/App/__test__/FakeTrackList";
import RejectGetMethod from "@/core/components/App/__test__/RejectGetMethod";

export default {
  title: "App",
  component: App,
};

export const DisplayMockList = () => <App Provider={FakeTrackList} />;
export const ErrorMessage = () => <App Provider={RejectGetMethod} />;
