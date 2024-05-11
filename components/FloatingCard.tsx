import { ComponentChildren } from "preact";
import { cn } from "cn";

export default function (
  props: { children: ComponentChildren; bottom?: boolean },
) {
  return (
    <div
      class={cn(
        "text-center absolute bg-darker p-4 rounded border-2 border-lighter",
        props.bottom ? "bottom-16 w-96" : "top-24 w-56",
      )}
      style={{
        left: props.bottom ? "calc(50% - 192px)" : "calc(50% - 112px)",
      }}
    >
      {props.children}
    </div>
  );
}
