interface iGameStock {
  characterId: string;
  amount: number;
  lost?: boolean;
}

export default function (props: iGameStock) {
  return (
    <div class="flex">
      {new Array(props.amount).fill(null)
        .map(() => (
          <div
            class={"w-6 h-6" + (props.lost ? " opacity-20" : "")}
            style={{
              backgroundImage:
                `url("/assets/images/stocks/lowdef/${props.characterId}.png")`,
            }}
          />
        ))}
    </div>
  );
}
