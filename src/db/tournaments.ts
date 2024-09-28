/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();

export interface dbTournament {
  slug: string;
}

export async function createTournament(slug: string) {
  const tournamentKey = slug.split("/");

  const atomicOp = kv.atomic()
    .check({ key: tournamentKey, versionstamp: null })
    .set(tournamentKey, { slug: slug });

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create tournament");
}

export function readTournamentList() {
  return kv.list<dbTournament>({ prefix: ["tournament"] });
}

export interface dbTournamentSetKeys {
  tournamentSlug: string;
  setIdentifierCombo: string;
  phaseId: string;
}

export interface dbTournamentSetValues {
  bestOf?: 3 | 5;
  entrant1Port?: 1 | 2 | 3 | 4;
  entrant2Port?: 1 | 2 | 3 | 4;
}

export interface dbReadTournamnetSets extends dbTournamentSetKeys {}

export function readTournamentSet(props: dbReadTournamnetSets) {
  const tournamentSetKey = [
    "set",
    ...props.tournamentSlug.split("/"),
    props.phaseId,
    props.setIdentifierCombo,
  ];
  return kv.get<dbTournamentSetValues>(tournamentSetKey);
}
export interface dbCreateTournamentSet
  extends dbTournamentSetKeys, dbTournamentSetValues {}

export async function createTournamentSet(
  props: dbCreateTournamentSet,
) {
  const tournamentSetKey = [
    "set",
    ...props.tournamentSlug.split("/"),
    props.phaseId,
    props.setIdentifierCombo,
  ];

  const atomicOp = kv.atomic()
    .check({ key: tournamentSetKey, versionstamp: null })
    .set(tournamentSetKey, {
      bestOf: props.bestOf,
      entrant1Port: props.entrant1Port,
      entrant2Port: props.entrant2Port,
    });

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create tournament set");
}

export interface dbUpdateTournamentSet
  extends dbTournamentSetKeys, dbTournamentSetValues {}

export async function updateTournamentSet(props: dbUpdateTournamentSet) {
  const {
    tournamentSlug,
    setIdentifierCombo,
    phaseId,
    ...valuesToUpdate
  } = props;

  const tournamentSetKey = [
    "set",
    ...tournamentSlug.split("/"),
    phaseId,
    setIdentifierCombo,
  ];

  const res = await kv.get<dbTournamentSetValues>(tournamentSetKey);
  if (res.value === null) {
    throw new Error("Tournament set does not exist");
  }

  const existingValue = res.value;

  const updatedValue: dbTournamentSetValues = {
    ...existingValue,
    ...valuesToUpdate,
  };

  const atomicOp = kv.atomic()
    .check(res)
    .set(tournamentSetKey, updatedValue);

  const commitRes = await atomicOp.commit();
  if (!commitRes.ok) throw new Error("Failed to update tournament set");
}
