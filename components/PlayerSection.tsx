import { cn } from "cn";
import type { iSet } from "@/src/startgg/mod.ts";
import type { ComponentChildren } from "preact";

export default function (
  props: {
    alignRight?: boolean;
    set: iSet;
    playerPort: number;
    children?: ComponentChildren;
  },
) {
  const { alignRight, set, playerPort, children } = props;

  const entrant = set.slots[alignRight ? 1 : 0].entrant;
  const arrow = alignRight ? "↘" : "↙";

  return (
    <div
      class={cn(
        "flex-1 p-8",
        playerPort >= 1 && playerPort <= 4
          ? `gradient${alignRight ? "-r" : ""}-${playerPort}`
          : null,
      )}
    >
      <div
        class={cn(
          "h-full flex flex-col justify-between",
          alignRight ? "text-right" : "text-left",
        )}
      >
        <div>
          <h1 class="text-4xl font-extrabold">
            {entrant.name}
          </h1>
          <code class="text-xs block mt-2 text-light">{entrant.id}</code>
        </div>
        {children}
        <div>
          <p class="text-9xl">{arrow}</p>
        </div>
      </div>
    </div>
  );
}
