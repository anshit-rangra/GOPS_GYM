import { FiZap } from "react-icons/fi";
import { Card } from "../../../../../components/ui";

const MotivationCard = ({ streak }) => (
  <Card variant="panel" padding="base" className="flex h-full flex-col">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-volt/10 text-volt">
      <FiZap className="h-5 w-5" aria-hidden="true" />
    </span>

    <blockquote className="mt-4 flex-1 text-lg font-semibold leading-snug text-ink">
      &ldquo;Consistency beats intensity. Show up and keep building.&rdquo;
    </blockquote>

    <p className="mt-3 text-sm text-muted">
      You&apos;re on a{" "}
      <span className="font-semibold text-volt">{streak}-day streak</span> —
      don&apos;t break the chain.
    </p>
  </Card>
);

export default MotivationCard;
