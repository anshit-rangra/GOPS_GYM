import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiMaximize,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { Button, Card } from "../../../../components/ui";
import { getRoleHome } from "../../../../lib/auth/roles";

const FEATURES = [
  {
    icon: FiMaximize,
    title: "QR check-in",
    description:
      "Scan the gym's entrance QR code and your visit is verified and logged by the server.",
  },
  {
    icon: FiBarChart2,
    title: "Attendance heatmap",
    description:
      "A GitHub-style 60-day grid makes your consistency impossible to ignore.",
  },
  {
    icon: FiCheckCircle,
    title: "Streaks & stats",
    description:
      "Track your attendance rate, current streak and total visits from real data.",
  },
  {
    icon: FiShield,
    title: "Admin approvals",
    description:
      "Admins review and authorize new members before they can check in.",
  },
];

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="app-shell theme-dark min-h-screen bg-night text-ink">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-on-volt">
            <FiTrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base font-bold tracking-tight">
            GOPS<span className="text-volt">GYM</span>
          </span>
        </div>
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link to={getRoleHome(user)}>
              <Button variant="accent" size="small">
                Go to dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="night" size="small">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="accent" size="small">
                  Join now
                </Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <section className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-volt/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-volt">
              <FiActivity className="h-3.5 w-3.5" aria-hidden="true" />
              Gym attendance, tracked
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Show up.
              <span className="block text-volt">Track every rep.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted">
              GOPS GYM keeps your membership, check-ins and consistency in one
              place. Scan in at the door and watch your streak grow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={isAuthenticated ? getRoleHome(user) : "/auth/register"}>
                <Button variant="accent" size="large">
                  {isAuthenticated ? "Open dashboard" : "Start your journey"}
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="night" size="large">
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>

          <Card variant="panel" padding="base" className="relative overflow-hidden">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-volt/10 blur-3xl"
            />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Last 60 days
            </p>
            <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1.5">
              {Array.from({ length: 140 }).map((_, index) => {
                const level = [0, 1, 2, 3][ (index * 7) % 4 ];
                const classes = [
                  "bg-panel-2",
                  "bg-volt/25",
                  "bg-volt/60",
                  "bg-volt",
                ][level];
                return (
                  <span
                    key={index}
                    aria-hidden="true"
                    className={`h-4 w-4 rounded-[4px] ${classes}`}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">
                Your consistency, visualised
              </p>
              <span className="rounded-full bg-volt/12 px-2.5 py-1 text-[11px] font-medium text-volt">
                Real check-ins
              </span>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} variant="panel" padding="base" className="h-full">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-volt/10 text-volt">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-sm font-semibold text-ink">{title}</h2>
              <p className="mt-1 text-xs text-muted">{description}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
