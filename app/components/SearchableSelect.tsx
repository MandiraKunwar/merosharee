"use client";

import { useState, useRef, useEffect } from "react";
import { DP, dpList as defaultDpList } from "@/app/data/dpList";

interface SearchableSelectProps {
  value: DP | null;
  onChange: (dp: DP | null) => void;
  dpList?: DP[];
}

export default function SearchableSelect({
  value,
  onChange,
  dpList = defaultDpList,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 30);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  const filteredList = dpList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full text-left select-none">
      {/* Selector Box */}
      <button
        type="button"
        suppressHydrationWarning={true}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[35px] bg-white border border-[#d0d7de] px-2.5 flex items-center justify-between text-[13.5px] outline-none cursor-pointer ${
          isOpen ? "rounded-t-[3px]" : "rounded-[3px]"
        }`}
        style={{
          fontFamily:
            "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
        }}
      >
        <span className={value ? "text-[#151B1E]" : "text-[#929ba8]"}>
          {value ? value.name : "Select your DP"}
        </span>
        {/* Gray chevron arrow */}
        <svg
          className="w-3.5 h-3.5 text-[#727d8e] shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu Popup - attached seamlessly with -mt-[1px] */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 z-50 -mt-[1px] bg-white border border-[#d0d7de] rounded-b-[3px] shadow-lg overflow-hidden"
          style={{
            fontFamily:
              "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
          }}
        >
          {/* Search Box Input - Light border with no blue outline */}
          <div className="p-1.5 bg-white border-b border-[#e5e7eb]">
            <input
              ref={searchInputRef}
              type="text"
              suppressHydrationWarning={true}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[30px] bg-white border border-[#d0d7de] focus:border-[#b0b7be] rounded-[2px] px-2 text-[13px] text-[#151B1E] outline-none shadow-none"
              autoComplete="off"
            />
          </div>

          {/* DP List */}
          <ul className="max-h-[210px] overflow-y-auto text-[13px] text-[#151B1E] py-1 bg-white">
            {filteredList.length > 0 ? (
              filteredList.map((item, index) => {
                const isSelected = value?.code === item.code;
                return (
                  <li
                    key={item.code || index}
                    onClick={() => {
                      onChange(item);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1.5 cursor-pointer font-normal uppercase transition-colors ${
                      isSelected
                        ? "bg-[#5194f6] text-white font-medium"
                        : "hover:bg-[#5194f6] hover:text-white"
                    }`}
                  >
                    {item.name}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-[#8e98a8] text-center italic bg-white">
                No DP found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}