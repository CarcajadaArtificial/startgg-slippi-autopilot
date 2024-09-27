import Text from "lunchbox/components/Text/index.tsx";
import { sggEvent, sggPhase } from "@/src/startgg/types.ts";
import { sggSetNodes } from "@/src/startgg/queries.ts";
import { makeSlug } from "@/src/utils.ts";
import SetView from "@/components/SetView.tsx";

export default function (
  props: { phase: sggPhase & sggSetNodes; event: sggEvent },
) {
  return (
    <div>
      <h2 id={`${makeSlug(props.event.name)}-${makeSlug(props.phase.name)}`}>
        <Text noMargins type="heading">{props.phase.name}</Text>
      </h2>
      <Text noMargins type="small">{props.phase.id}</Text>
      {props.phase.sets.nodes.map(SetView)}
    </div>
  );
}
