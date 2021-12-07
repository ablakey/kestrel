export function Slider(props: {
  value: number;
  label: string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>{props.label}</span>
      <input
        type="range"
        value={props.value}
        min={props.min ?? 0.0}
        max={props.max ?? 1.0}
        step={props.step ?? 0.1}
        onChange={(e) => props.onChange(e.target.valueAsNumber)}
      />
      <span>{props.value}</span>
    </div>
  );
}
