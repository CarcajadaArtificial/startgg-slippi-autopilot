import { sggEvent } from "@/src/startgg/types.ts";
import { sggCompleteEvent } from "@/src/startgg/queries.ts";

export const makeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export const getSetsFromCompleteEvent = (event: sggEvent & sggCompleteEvent) =>
  event.phases.flat().map((phase) => phase.sets.nodes).flat();
