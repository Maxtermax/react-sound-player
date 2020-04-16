import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import SoundPlayer from "@/core/components/SoundPlayer";
import PlaceCenter from "@/core/components/PlaceCenter";
import ErrorMessage from "@/core/components/ErrorMessage";
import "@/core/theme.css";
import "./style.css";
import { useFetchData } from "@/core/hooks/useFetchData";
import interfaces from "@/core/interfaces";
const { FetchProvider } = interfaces;

function App({ Provider = FetchProvider }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useFetchData({ setLoading, setData, setError, Provider });

  if (error) return <ErrorMessage data-test="error-message"></ErrorMessage>;

  if (loading) {
    return (
      <PlaceCenter data-test="loading">
        <CircularProgress></CircularProgress>
      </PlaceCenter>
    );
  }

  return (
    <main>
      <SoundPlayer data={data}></SoundPlayer>
    </main>
  );
}

export default App;
