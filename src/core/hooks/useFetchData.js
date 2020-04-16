import { useEffect } from "react";
import DataProvider from "@/core/services/DataProvider";
import { resolvePromise, logger, groupById, mapSelected } from "@/core/utils";

export function useFetchData({ setLoading, setData, setError, Provider }) {
  useEffect(() => {
    async function getData() {
      const DataFactory = DataProvider(Provider);
      const DataSource = new DataFactory("U83_TK_JKRiWJ-PFjVpeeQ");
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
  }, [setLoading, setData, setError, Provider]);
}
