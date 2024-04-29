import type { iGame, iSet } from "@/src/startgg.ts";

interface iSetCard {
  set: iSet;
  isNext?: boolean;
}

const SetGameResults = (props: { game: iGame }) => (
  <div>
  </div>
);

const SetStatusIndicator = (props: iSetCard) =>
  props.isNext || props.set.state === 2 || props.set.state === 3
    ? (
      <code class="text-xs bg-light text-darker px-2 py-1 rounded">
        {props.set.state === 2
          ? "In Progress"
          : props.set.state === 3
          ? "Finished"
          : "Next"}
      </code>
    )
    : null;

const SetNotStarted = (props: iSetCard) => (
  <a
    class="bg-darker hover:bg-dark p-4 rounded cursor-pointer block w-64"
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
    {props.set.games
      ? props.set.games.map((game) => <SetGameResults game={game} />)
      : null}
  </a>
);

const SetUndefined = (props: iSetCard) => (
  <div class="bg-darker p-4 rounded cursor-not-allowed opacity-50">
    <p></p>
  </div>
);

export default function (props: iSetCard) {
  const { set } = props;

  return (
    <div>
      {set.slots[0].entrant && set.slots[1].entrant
        ? <SetNotStarted {...props} />
        : <SetUndefined {...props} />}
      <code class="ml-4 text-xs opacity-50">{props.set.id}</code>
    </div>
  );
}
