import { useState } from "preact/hooks";
import Button from "lunchbox/components/Button/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import PortSelector from "./PortSelector.tsx";

export default function (props: { tournamentSetDbKey: string }) {
  const [player1Port, setPlayer1Port] = useState<number>(0);
  const [player2Port, setPlayer2Port] = useState<number>(0);

  return (
    <div>
      <div class="flex justify-between">
        <PortSelector
          selection={player1Port}
          updater={setPlayer1Port}
          opponentSelection={player2Port}
        />
        <PortSelector
          selection={player2Port}
          updater={setPlayer2Port}
          opponentSelection={player1Port}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-8">
        <Button
          padding="large"
          onClick={() => {
          }}
        >
          <Text noMargins type="subheading">Start Match</Text>
        </Button>
        <Text>
          Button check before pressing
        </Text>
      </div>
    </div>
  );
}
