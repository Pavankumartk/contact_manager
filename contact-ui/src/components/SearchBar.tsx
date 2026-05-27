'use client';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="neu-input"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", marginBottom: 20 }}
    />
  );
}