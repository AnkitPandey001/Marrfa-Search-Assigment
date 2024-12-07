import React from 'react';

interface SearchAndSortProps {
  searchQuery: string;
  sortOption: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  sortOption,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by title..."
        className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      />
      <select
        value={sortOption}
        onChange={onSortChange}
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      >
        <option value="none">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SearchAndSort;
