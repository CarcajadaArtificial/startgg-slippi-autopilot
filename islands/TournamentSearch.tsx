import { useState } from "preact/hooks";
import Input from "lunchbox/components/Input/index.tsx";
import Button from "lunchbox/components/Button/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import { sggTournament } from "@/src/startgg/types.ts";
import { ResSearchTournaments } from "@/src/apiTypes.ts";
import {
  handleInteraction,
  handleKeyboard,
  Key,
} from "lunchbox/src/handlers.ts";

const SearchResults = (props: sggTournament) => (
  <div class="flex items-center mt-2">
    <div class="py-2 flex-1">
      <Text noMargins>{props.name}</Text>
      <Text noMargins type="small">
        {props.id} <Code>{props.slug}</Code>
      </Text>
    </div>
    <Button
      onClick={async () =>
        await fetch("/api/db/tournaments/create", {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({ slug: props.slug }),
        })}
    >
      Add
    </Button>
  </div>
);

export default function () {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<sggTournament[]>(
    [],
  );

  const fetchSearchResults = async () =>
    await fetch("/api/startgg/searchTournaments", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ name: searchValue }),
    }).then(async (res) => {
      const data = (await res.json()) as ResSearchTournaments;
      setSearchResults(data.results);
    });

  return (
    <div>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Input
          label="Search"
          type="search"
          value={searchValue}
          onchange={(ev: Event) =>
            setSearchValue((ev.target as HTMLInputElement).value)}
          onkeyup={handleKeyboard([{
            keys: [Key.Enter],
            except: [],
            cb: fetchSearchResults,
          }])}
        />
        <Button
          type="panel"
          {...handleInteraction(fetchSearchResults)}
        >
          Search
        </Button>
      </div>
      <div class="flex flex-col">{searchResults.map(SearchResults)}</div>
    </div>
  );
}
