import { useCallback, useEffect, useMemo, useState } from "react";
import { getApiErrorMessage } from "../../../lib/api/errors";
import { fetchMyAttendance } from "../api/attendanceApi";
import { buildAttendanceModel, toISODate } from "../utils/attendanceUtils";

const useAttendance = () => {
  const [rawRecords, setRawRecords] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const body = await fetchMyAttendance();
        if (!active) return;
        setRawRecords(body?.data?.record ?? []);
        setStatus("ready");
      } catch (err) {
        if (!active) return;
        setError(getApiErrorMessage(err));
        setStatus("error");
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const refetch = useCallback(async () => {
    setStatus("loading");
    setError(null);
    setReloadKey((key) => key + 1);
  }, []);

  const model = useMemo(() => buildAttendanceModel(rawRecords), [rawRecords]);

  const todayKey = toISODate(model.today);
  const hasCheckedInToday = Boolean(model.records.get(todayKey)?.attended);

  return {
    ...model,
    status,
    loading: status === "loading",
    error,
    refetch,
    rawRecords,
    hasCheckedInToday,
  };
};

export default useAttendance;
