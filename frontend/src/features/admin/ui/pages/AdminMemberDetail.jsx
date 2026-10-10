import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import {
  Badge,
  Button,
  Card,
  ErrorState,
  Skeleton,
} from "../../../../components/ui";
import useAsync from "../../../../lib/hooks/useAsync";
import { buildAttendanceModel, toISODate } from "../../../user/utils/attendanceUtils";
import { fetchUserAttendance } from "../../../user/api/attendanceApi";
import { fetchAuthorizedUsers } from "../../api/adminApi";
import AttendanceStats from "../../../user/ui/components/dashboard/AttendanceStats";
import AttendanceHeatmap from "../../../user/ui/components/attendance/AttendanceHeatmap";
import AttendanceCalendar from "../../../user/ui/components/attendance/AttendanceCalendar";
import SelectedDateDetails from "../../../user/ui/components/attendance/SelectedDateDetails";

const AdminMemberDetail = () => {
  const { userId } = useParams();
  const location = useLocation();
  const initialUser = location.state?.user ?? null;
  const [selectedDate, setSelectedDate] = useState(() =>
    toISODate(new Date()),
  );

  const { status, data, error, refetch } = useAsync(async () => {
    let member = initialUser;
    if (!member) {
      const body = await fetchAuthorizedUsers({ limit: 100, skip: 0 });
      member =
        body?.data?.users?.find((item) => item._id === userId) ?? null;
    }
    const attendanceBody = await fetchUserAttendance(userId);
    return {
      member,
      records: attendanceBody?.data?.record ?? [],
    };
  }, [userId]);

  const model = useMemo(
    () => buildAttendanceModel(data?.records ?? []),
    [data],
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/admin/members">
            <Button variant="night" size="small">
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-ink">
              {data?.member?.name || "Member attendance"}
            </h1>
            <p className="text-xs text-muted">Member ID: {userId}</p>
          </div>
        </div>
        <Button variant="night" size="small" onClick={refetch}>
          <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {data?.member && (
        <Card variant="panel" padding="base" className="flex flex-wrap items-center gap-4">
          {data.member.profilePic?.url ? (
            <img
              src={data.member.profilePic.url}
              alt=""
              className="h-14 w-14 rounded-full object-cover ring-1 ring-volt/30"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-full bg-volt/15 text-lg font-semibold text-volt">
              {data.member.name?.[0]?.toUpperCase() || "G"}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">{data.member.name}</p>
            <p className="text-xs text-muted">
              +91 {data.member.phoneNumber} · Age {data.member.age}
            </p>
          </div>
          <Badge variant={data.member.isAuthorized ? "success" : "warning"}>
            {data.member.isAuthorized ? "Authorized" : "Pending"}
          </Badge>
          <Badge variant="info">
            <span className="capitalize">{data.member.role}</span>
          </Badge>
        </Card>
      )}

      {status === "loading" ? (
        <div className="space-y-6" aria-hidden="true">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      ) : status === "error" ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <>
          <AttendanceStats statistics={model.statistics} today={model.today} />

          <AttendanceHeatmap
            heatmap={model.heatmap}
            records={model.records}
            today={model.today}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AttendanceCalendar
                records={model.records}
                today={model.today}
                selectedKey={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
            <SelectedDateDetails
              dateKey={selectedDate}
              record={model.records.get(selectedDate) ?? null}
              today={model.today}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMemberDetail;
