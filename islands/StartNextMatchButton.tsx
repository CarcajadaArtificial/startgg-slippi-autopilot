import Button from "lunchbox/components/Button/index.tsx";
import SetView from "@/components/SetView.tsx";
import { sggSet } from "@/src/startgg/types.ts";

export default function (set: sggSet) {
  return (
    <div class="flex flex-col items-center gap-4">
      <SetView {...set} />
      <Button
        onClick={async () => {
          await fetch("/api/startgg/startSet", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
              setId: set.id,
            }),
          });
          window.location.reload();
        }}
      >
        Start This Set
      </Button>
    </div>
  );
}
