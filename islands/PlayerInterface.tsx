import { useState } from "preact/hooks";
import { cn } from "cn";
import type { iSet } from "@/src/startgg/mod.ts";
import PortSelector from "./PortSelector.tsx";
import PlayerSection from "@/components/PlayerSection.tsx";
import FloatingCard from "@/components/FloatingCard.tsx";

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
          >
            <PortSelector
              selection={player1Port}
              updater={setPlayer1Port}
              opponentSelection={player2Port}
            />
          </PlayerSection>
          <div class="bg-lighter w-0.5"></div>
          <PlayerSection
            set={props.set}
            playerPort={player2Port}
            alignRight
          >
            <PortSelector
              selection={player2Port}
              updater={setPlayer2Port}
              opponentSelection={player1Port}
            />
          </PlayerSection>
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
            onClick={async () => {
              await fetch("/api/slippi/cleanDirectory", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({}),
              }).then(async (res) => {
                console.log(await res.json());
              });
              setMatchPhase("waiting");
            }}
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
    setTimeout(async () => {
      await fetch("/api/slippi/getCurrentGame", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({}),
      }).then(async (res) => {
        const data = await res.json();
        if (data.gameInProgress) {
          setMatchPhase("playing");
        }
      });
      rerenderComponent(renderTimes + 1);
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
  } else if (matchPhase === "playing") {
    return <>Match currently being played</>;
  } else {
    return <>Unkown phase</>;
  }
}
