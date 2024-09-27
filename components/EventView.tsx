import Text from "lunchbox/components/Text/index.tsx";
import { sggEvent } from "@/src/startgg/types.ts";
import { sggCompleteEvent } from "@/src/startgg/queries.ts";
import { makeSlug } from "@/src/utils.ts";
import EntrantView from "@/components/EntrantView.tsx";
import PhaseView from "@/components/PhaseView.tsx";

export default function (event: sggEvent & sggCompleteEvent) {
  return (
    <section class="flex flex-col gap-4">
      <div>
        <h1 id={makeSlug(event.name)}>
          <Text noMargins type="title">
            {event.name}
          </Text>
        </h1>
        <Text noMargins type="small">{event.id}</Text>
      </div>
      <div>
        <Text noMargins type="subheading">Participants</Text>
        <div class="flex flex-wrap gap-x-4 gap-y-6 mb-8 mt-2">
          {event.entrants.nodes.map(EntrantView)}
        </div>
      </div>
      {event.phases.map((phase) => <PhaseView phase={phase} event={event} />)}
    </section>
  );
}
