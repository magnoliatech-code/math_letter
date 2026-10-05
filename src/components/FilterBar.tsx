import React, { useRef, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { MathCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MathCategory | 'All';
  setSelectedCategory: (cat: MathCategory | 'All') => void;
  categories: MathCategory[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalResults,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Pressing "/" focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by letter name, symbol, LaTeX (e.g. \mu), concept (e.g. eigenvalue, limit)..."
          className="w-full pl-11 pr-20 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-sm transition"
        />
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-2">
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            selectedCategory === 'All'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          All (24)
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Search & Filter Indicator */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <Filter className="w-3.5 h-3.5" />
          <span>
            Found <strong>{totalResults}</strong> {totalResults === 1 ? 'letter' : 'letters'}
          </span>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline ml-1 font-medium"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
