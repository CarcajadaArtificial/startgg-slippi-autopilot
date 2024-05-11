import { SlippiGame } from "slippi";

// const game = new SlippiGame("../", { processOnTheFly: true });

export const mapGameFiles = (cb: (gameFile: Deno.DirEntry) => void) => {
  for (const gameFile of Deno.readDirSync(`./slippi/cyntiha`)) {
    cb(gameFile);
  }
};

export const gameInProgress = () => {
  const gameFiles: Deno.DirEntry[] = [];
  mapGameFiles((gameFile) => gameFiles.push(gameFile));
  if (gameFiles.length === 1) {
    const slpGame = new SlippiGame(
      `./slippi/cyntiha/${gameFiles[0].name}`,
      { processOnTheFly: true },
    );
    return slpGame.getGameEnd() === null;
  }
  return false;
};

export const getLastGameFile = (processOnTheFly: boolean) => {
  for (const gameFile of Deno.readDirSync(`./slippi/cyntiha`)) {
    return new SlippiGame(`../${gameFile.name}`, { processOnTheFly });
  }
};
