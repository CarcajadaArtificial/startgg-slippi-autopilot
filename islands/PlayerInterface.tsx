import { useState } from "preact/hooks";
import { cn } from "cn";
import type { iSet } from "@/src/startgg/mod.ts";
import PortSelector from "./PortSelector.tsx";

function PlayerSection(props: { alignRight?: boolean; set: iSet }) {
  const [player1Port, setPlayer1Port] = useState<number>(0);
  const [player2Port, setPlayer2Port] = useState<number>(0);
  const { alignRight, set } = props;
  const entrant = set.slots[alignRight ? 1 : 0].entrant;
  const arrow = alignRight ? "↘" : "↙";

  return (
    <div class="flex-1 p-8">
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
        <PortSelector
          selection={alignRight ? player2Port : player1Port}
          updater={alignRight ? setPlayer2Port : setPlayer1Port}
          alignRight={alignRight}
        />
        <div>
          <p class="text-9xl">{arrow}</p>
        </div>
      </div>
    </div>
  );
}

export default function (props: { set: iSet }) {
  return (
    <div>
      <div class="flex" style={{ height: "100dvh" }}>
        <PlayerSection set={props.set} />
        <div class="bg-light w-1"></div>
        <PlayerSection set={props.set} alignRight />
      </div>
    </div>
  );
}
