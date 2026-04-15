"use client";

import { useState } from "react";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = "검색어를 입력하세요" }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="mb-4">
      <input
        className="w-full border rounded p-2"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          onSearch(v);
        }}
      />
    </div>
  );
}
