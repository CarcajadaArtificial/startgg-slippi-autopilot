import { isSetFinished } from "@/src/startgg.ts";
import type { iGame, iSet } from "@/src/startgg.ts";

interface iSetCard {
  set: iSet;
  isNext?: boolean;
}

const GameStock = (
  props: { characterId: string; amount: number; lost?: boolean },
) => {
  return (
    <div class="flex">
      {new Array(props.amount).fill(null)
        .map(() => (
          <div
            class={"w-6 h-6" + (props.lost ? " opacity-20" : "")}
            style={{
              backgroundImage:
                `url("/assets/images/stocks/lowdef/${props.characterId}.png")`,
            }}
          />
        ))}
    </div>
  );
};

const SetGameResults = (props: { game: iGame }) => {
  const scores = [props.game.entrant1Score, props.game.entrant2Score];
  const characterIds = props.game.selections.map((selection) =>
    selection.character.id
  );
  return (
    <div>
      <div class="grid grid-cols-2 gap-2 justify-items-center bg-cover bg-center">
        <div class="flex">
          <GameStock
            characterId={characterIds[0]}
            amount={4 - scores[0]}
            lost
          />
          <GameStock
            characterId={characterIds[0]}
            amount={scores[0]}
          />
        </div>
        <div class="flex">
          <GameStock
            characterId={characterIds[1]}
            amount={scores[1]}
          />
          <GameStock
            characterId={characterIds[1]}
            amount={4 - scores[1]}
            lost
          />
        </div>
      </div>
      <code class="text-xs text-center block">{props.game.stage.name}</code>
    </div>
  );
};

const SetStatusIndicator = (props: iSetCard) => (
  <code class="text-xs bg-light text-darker px-2 py-1 rounded">
    {props.isNext
      ? "Next"
      : props.set.state === 2
      ? "In Progress"
      : props.set.state === 3
      ? "Finished"
      : ""}
  </code>
);

export const SetFinished = (props: iSetCard) => {
  const { state, games, id, winnerId } = props.set;
  const entrants = props.set.slots.map((slot) => slot.entrant);

  return (
    <a
      class={"bg-darker hover:bg-dark p-4 rounded cursor-pointer block w-64" +
        (state === 3 ? " opacity-70" : "")}
      href={`/set/${id}`}
    >
      <div class="pb-2 mb-2 border-base border-b-2">
        <p
          class={"font-bold text-left" +
            (winnerId === entrants[0].id ? " text-xl text-light" : "")}
        >
          {entrants[0].name}
        </p>
        <code class="text-xs text-center block">vs</code>
        <p
          class={"font-bold text-right" +
            (winnerId === entrants[1].id ? " text-xl text-light" : "")}
        >
          {entrants[1].name}
        </p>
      </div>
      <div class="flex justify-center mb-4">
        <SetStatusIndicator {...props} />
      </div>
      <div class="flex flex-col align-center gap-4">
        {games ? games.map((game) => <SetGameResults game={game} />) : null}
      </div>
    </a>
  );
};

export const SetDefined = (props: iSetCard) => (
  <a
    class={"bg-darker hover:bg-dark p-4 rounded cursor-pointer block w-64" +
      (props.set.state === 3 ? " opacity-70" : "")}
    href={`/set/${props.set.id}`}
  >
    <div class="pb-2 mb-2 border-base border-b-2">
      <p class="font-bold text-left">
        {props.set.slots[0].entrant.name}
      </p>
      <code class="text-xs text-center block">vs</code>
      <p class="font-bold text-right">
        {props.set.slots[1].entrant.name}
      </p>
    </div>
    <div class="flex justify-center">
      <SetStatusIndicator {...props} />
    </div>
  </a>
);

export const SetUndefined = (props: iSetCard) => {
  const entrants = [props.set.slots[0].entrant, props.set.slots[1].entrant];
  return (
    <div class="bg-darker p-4 rounded cursor-not-allowed opacity-20 w-64">
      <div class="pb-2 mb-2 border-base border-b-2">
        {entrants[0] && entrants[0].name
          ? (
            <p class="font-bold text-left">
              {entrants[0].name}
            </p>
          )
          : null}
        <code class="text-xs text-center block">vs</code>
        <p class="font-bold text-right">
          {entrants[1] && entrants[1].name
            ? (
              <p class="font-bold text-left">
                {entrants[1].name}
              </p>
            )
            : null}
        </p>
      </div>
      <div class="flex justify-center">
        <SetStatusIndicator {...props} />
      </div>
    </div>
  );
};
