import { sggSet } from "./types.ts";

export const isSetDefined = (set: sggSet) =>
  set.slots[0].entrant && set.slots[1].entrant;

export const isSetUnstarted = (set: sggSet) =>
  set.state === 1 && isSetDefined(set);

export const isSetPlaying = (set: sggSet) =>
  set.state === 2 && isSetDefined(set);

export const isSetFinished = (set: sggSet) =>
  set.state === 3 && isSetDefined(set);
