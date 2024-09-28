import { useEffect, useState } from "preact/hooks";
import Loader from "lunchbox/components/Loader/index.tsx";
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

  if (setDBSettings === null) {
    return <Loader loaded={false} />;
  }

  return (
    <div>
      <SetView {...set} />
      <div class="flex justify-center mt-1">
        <Button
          type={setDBSettings.bestOf === 3 ? "transparent" : "panel"}
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
          Change to best of {setDBSettings.bestOf === 3 ? 5 : 3}
        </Button>
      </div>
    </div>
  );
}
