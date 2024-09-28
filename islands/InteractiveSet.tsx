import { useEffect, useState } from "preact/hooks";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Button from "lunchbox/components/Button/index.tsx";
import SetView from "@/components/SetView.tsx";
import { sggSet } from "@/src/startgg/types.ts";
import { ResReadTournamentSet } from "@/src/apiTypes.ts";

const fetchSetData = async (props: { set: sggSet; tournamentSlug: string }) =>
  await fetch("/api/db/tournamentSets/read", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      tournamentSlug: props.tournamentSlug,
      phaseId: String(props.set.phaseGroup.phase.id),
      setIdentifierCombo:
        `${props.set.phaseGroup.displayIdentifier}-${props.set.identifier}`,
    }),
  }).then(async (res) => {
    const data = (await res.json()) as ResReadTournamentSet;
    return data;
  });

export default function (props: { set: sggSet; tournamentSlug: string }) {
  const [set, setSet] = useState<sggSet>(props.set);
  const [setDBSettings, setSetDBSettings] = useState<
    ResReadTournamentSet | null
  >(null);

  useEffect(() => {
    async function useEffectFetch() {
      setSetDBSettings(await fetchSetData(props));
    }
    useEffectFetch();
  }, []);

  const bestOfUpdater = set.state === 3 || setDBSettings === null
    ? null
    : (
      <div class="flex justify-center items-center mt-1 gap-2">
        <Code>best of {setDBSettings.bestOf}</Code>,
        <Button
          type={setDBSettings.bestOf === 3 ? "panel" : "transparent"}
          padding="compact"
          onClick={async () => {
            setSetDBSettings(null);
            await fetch("/api/db/tournamentSets/update", {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify({
                tournamentSlug: props.tournamentSlug,
                phaseId: String(props.set.phaseGroup.phase.id),
                setIdentifierCombo:
                  `${props.set.phaseGroup.displayIdentifier}-${props.set.identifier}`,
                bestOf: setDBSettings.bestOf === 3 ? 5 : 3,
              }),
            });
            setSetDBSettings(await fetchSetData(props));
          }}
        >
          <Text noMargins type="small">
            Switch to {setDBSettings.bestOf === 3 ? 5 : 3}
          </Text>
        </Button>
      </div>
    );

  return (
    <div>
      <SetView {...set} />
      {bestOfUpdater}
    </div>
  );
}
