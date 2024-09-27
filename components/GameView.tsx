import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import { sggGame } from "@/src/startgg/types.ts";
import GameStock from "@/components/GameStock.tsx";

export default function (game: sggGame) {
  const scores = [game.entrant1Score, game.entrant2Score];
  const characterIds = game.selections.map((selection) =>
    selection.character.id
  );
  return (
    <div>
      <div class="flex items-center">
        <div class="flex flex-1">
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
        <Text noMargins type="small">
          <Code class="text-center">{game.stage.name}</Code>
        </Text>
        <div class="flex flex-1 justify-end">
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
    </div>
  );
}
