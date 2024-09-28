import { ComponentChildren } from "preact";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Panel from "lunchbox/components/Panel/index.tsx";
import { sggSet } from "@/src/startgg/types.ts";
import { cn } from "cn";
import EntrantView from "@/components/EntrantView.tsx";

export default function (set: sggSet & { children?: ComponentChildren }) {
  return (
    <Panel
      class={cn(
        "rounded pt-2 pb-1 px-2 w-96",
        set.state === 3
          ? "opacity-50"
          : set.state === 2
          ? "border border-1"
          : null,
      )}
    >
      <Text noMargins type="small" class="text-center mb-2">
        <Code>
          Group {set.phaseGroup.displayIdentifier}-{set.identifier}
          {", "}
          {set.fullRoundText}
        </Code>
        <br />
      </Text>
      <Text></Text>
      <div class="flex items-start gap-2">
        <Text noMargins style={{ lineBreak: "anywhere" }} class="flex-1">
          {set.slots[0].entrant
            ? <EntrantView {...set.slots[0].entrant} />
            : "-"}
        </Text>
        <Text noMargins type="small">v.s.</Text>
        <Text
          noMargins
          style={{ lineBreak: "anywhere" }}
          class="text-right flex-1"
        >
          {set.slots[1].entrant
            ? <EntrantView {...set.slots[1].entrant} reverse />
            : "-"}
        </Text>
      </div>
      {set.children}
    </Panel>
  );
}
