export function Dropdown<T extends string>(props: {
  label: string;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <select onChange={(e) => props.onChange(e.target.value as T)}>
      {props.options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
