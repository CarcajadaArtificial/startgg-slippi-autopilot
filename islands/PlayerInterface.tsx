import { StateUpdater, useState } from "preact/hooks";
import { ComponentChildren } from "preact";
import { cn } from "cn";
import type { iSet } from "@/src/startgg/mod.ts";
import PortSelector from "./PortSelector.tsx";

function PlayerSection(
  props: {
    alignRight?: boolean;
    set: iSet;
    playerPort: number;
    opponentPort: number;
    setPlayerPort: StateUpdater<number>;
  },
) {
  const { alignRight, set, playerPort, setPlayerPort, opponentPort } = props;

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
        <PortSelector
          selection={playerPort}
          updater={setPlayerPort}
          alignRight={alignRight}
          opponentSelection={opponentPort}
        />
        <div>
          <p class="text-9xl">{arrow}</p>
        </div>
      </div>
    </div>
  );
}

const FloatingCard = (
  props: { children: ComponentChildren; bottom?: boolean },
) => (
  <div
    class={cn(
      "text-center absolute bg-darker p-4 rounded border-2 border-lighter",
      props.bottom ? "bottom-16 w-96" : "top-24 w-56",
    )}
    style={{
      left: props.bottom ? "calc(50% - 192px)" : "calc(50% - 112px)",
    }}
  >
    {props.children}
  </div>
);

type iMatchFaces = "selection" | "waiting" | "playing" | "confirm";

export default function (props: { set: iSet }) {
  const { fullRoundText, identifier, phaseGroup } = props.set;
  const [renderTimes, rerenderComponent] = useState<number>(0);

  const [player1Port, setPlayer1Port] = useState<number>(0);
  const [player2Port, setPlayer2Port] = useState<number>(0);
  const [matchPhase, setMatchPhase] = useState<iMatchFaces>("selection");

  const enabledStartButton = player1Port !== 0 && player2Port !== 0;

  if (matchPhase === "selection") {
    return (
      <div>
        <FloatingCard>
          <p class="text-lg font-bold">{fullRoundText}</p>
          <code class="text-xs block mt-2 text-light">
            {phaseGroup.phase.name}
            <br />Match {identifier}
          </code>
        </FloatingCard>
        <div class="flex" style={{ height: "100dvh" }}>
          <PlayerSection
            set={props.set}
            playerPort={player1Port}
            setPlayerPort={setPlayer1Port}
            opponentPort={player2Port}
          />
          <div class="bg-lighter w-0.5"></div>
          <PlayerSection
            set={props.set}
            playerPort={player2Port}
            setPlayerPort={setPlayer2Port}
            opponentPort={player1Port}
            alignRight
          />
        </div>
        <FloatingCard bottom>
          <p class="text-2xl font-extrabold">
            {phaseGroup.phase.name === "Round Robin"
              ? "Best of 3"
              : "Best of 5"}
          </p>
          {enabledStartButton
            ? null
            : (
              <code class="text-xs block mt-2 text-light">
                Both players must select a port before starting a match.
              </code>
            )}
          <button
            class={cn(
              "text-xl bg-light text-darker font-extrabold px-4 py-2 mt-4 rounded border-4 border-lighter",
              enabledStartButton ? null : "opacity-50 cursor-not-allowed",
            )}
            disabled={!enabledStartButton}
            onClick={() => setMatchPhase("waiting")}
          >
            Start Tournament Match
          </button>
          {enabledStartButton
            ? (
              <code class="text-xs block mt-2 text-light">
                Games after pressing this button will be reported to start.gg
              </code>
            )
            : null}
        </FloatingCard>
      </div>
    );
  } else if (matchPhase === "waiting") {
    setTimeout(() => {
      // rerenderComponent(renderTimes + 1);
    }, 1000);

    return (
      <div
        style={{ height: "100dvh" }}
        class="flex flex-col justify-center items-center gap-8"
      >
        <p class="text-6xl">Good Luck!</p>
        <code class="text-3xl text-light">Waiting for the game to start.</code>
        <span class="loader"></span>
      </div>
    );
  } else {
    return <>Unkown phase</>;
  }
}
