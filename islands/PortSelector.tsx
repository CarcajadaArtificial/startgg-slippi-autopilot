import { StateUpdater } from "preact/hooks";
import { cn } from "@/src/classnames.ts";

interface iPortSelection {
  selection: number;
  opponentSelection: number;
  updater: StateUpdater<number>;
  alignRight?: boolean;
}

const Port = (
  props: {
    updater: StateUpdater<number>;
    selected?: boolean;
    port: number;
    opponentPort: number;
  },
) => (
  <div
    class={cn(
      "rounded-full p-4 text-2xl w-16 text-center font-bold bg-darker border-8",
      props.selected
        ? null
        : props.opponentPort === props.port
        ? "opacity-20"
        : "opacity-40",
      props.port === 1
        ? "border-[#F15959]"
        : props.port === 2
        ? "border-[#6565FE]"
        : props.port === 3
        ? "border-[#FEBE3F]"
        : props.port === 4
        ? "border-[#4CE44C]"
        : "border-[#7F7F7F]",
    )}
    onClick={props.opponentPort === props.port
      ? undefined
      : () => props.updater(props.port)}
  >
    {props.port}
  </div>
);

export default function (props: iPortSelection) {
  const { selection, updater, alignRight, opponentSelection } = props;
  return (
    <div class={cn("flex flex-col", alignRight ? "items-end" : "items-start")}>
      <h3 class="text-2xl mb-4">Port Select</h3>
      <div class="flex gap-4 bg-lighter p-8 rounded">
        <Port
          port={1}
          opponentPort={opponentSelection}
          updater={updater}
          selected={selection === 1}
        />
        <Port
          port={2}
          opponentPort={opponentSelection}
          updater={updater}
          selected={selection === 2}
        />
        <Port
          port={3}
          opponentPort={opponentSelection}
          updater={updater}
          selected={selection === 3}
        />
        <Port
          port={4}
          opponentPort={opponentSelection}
          updater={updater}
          selected={selection === 4}
        />
      </div>
    </div>
  );
}
