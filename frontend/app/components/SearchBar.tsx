'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search contacts..." 
}: SearchBarProps) {
  return (
    <div className="relative w-full flex">
      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="neo-input w-full pl-4 pr-14 py-4 text-lg"
      />

      {/* Search icon on the right */}
      <Search
        className="absolute !right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        size={22}
      />
    </div>
  );
}