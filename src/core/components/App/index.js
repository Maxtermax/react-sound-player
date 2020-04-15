import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import SoundPlayer from "@/core/components/SoundPlayer";
import PlaceCenter from "@/core/components/PlaceCenter";
import DataProvider from "@/core/services/DataProvider";
import { resolvePromise, logger, groupById, mapSelected } from "@/core/utils";
import "@/core/theme.css";
import "./style.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      const DataSource = new DataProvider("U83_TK_JKRiWJ-PFjVpeeQ");
      setLoading(true);
      const { ok, error, result } = await resolvePromise(DataSource.get());
      if (ok) {
        const { albums = [], tracks = [] } = result;
        setData({
          albums: groupById(albums),
          tracks: mapSelected(tracks),
        });

        return setLoading(false);
      }
      logger(error);
      setError(true);
      return setLoading(false);
    }
    getData();
  }, []);

  if (loading)
    return (
      <PlaceCenter>
        <CircularProgress></CircularProgress>
      </PlaceCenter>
    );

  return (
    <main>
      <SoundPlayer data={data}></SoundPlayer>
    </main>
  );
}

export default App;
