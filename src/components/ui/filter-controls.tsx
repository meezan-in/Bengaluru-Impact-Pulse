import React from "react";

export type DealType = "Asset Leasing" | "Invoice Discounting";

interface FilterControlsProps {
  activeFilter: DealType | "All";
  onFilterChange: (filter: DealType | "All") => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
}

const FILTERS: (DealType | "All")[] = [
  "All",
  "Asset Leasing",
  "Invoice Discounting",
];
const SORT_OPTIONS = [
  { value: "funding-desc", label: "Funding: High to Low" },
  { value: "funding-asc", label: "Funding: Low to High" },
  { value: "name-az", label: "Name (A-Z)" },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Filter Toggle Group */}
      <div className="flex gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full font-medium transition-colors border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => onFilterChange(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>
      {/* Sort Dropdown */}
      <div>
        <label htmlFor="sort-select" className="sr-only">
          Sort by
        </label>
        <select
          id="sort-select"
          className="px-4 py-2 rounded-full border border-muted-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
