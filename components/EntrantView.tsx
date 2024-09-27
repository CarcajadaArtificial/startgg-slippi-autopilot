import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import { sggEntrant } from "@/src/startgg/types.ts";
import { cn } from "cn";

export default function (entrant: sggEntrant & { reverse?: boolean }) {
  return (
    <div
      class={cn(
        "flex flex-col",
        entrant.reverse ? "items-end" : "items-start",
      )}
    >
      <Text noMargins type="small">
        <Code>{entrant.id}</Code>
      </Text>
      <Text>{entrant.participants[0].gamerTag}</Text>
    </div>
  );
}
