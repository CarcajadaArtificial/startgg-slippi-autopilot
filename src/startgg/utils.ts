import { iSet } from "./types.ts";

export const isSetDefined = (set: iSet) =>
  set.slots[0].entrant && set.slots[1].entrant;

export const isSetUnstarted = (set: iSet) =>
  set.state === 1 && isSetDefined(set);

export const isSetPlaying = (set: iSet) => set.state === 2 && isSetDefined(set);

export const isSetFinished = (set: iSet) =>
  set.state === 3 && isSetDefined(set);
