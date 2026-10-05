import React, { useState, useMemo, useEffect } from 'react';
import { GREEK_LETTERS } from './data/greekLetters';
import { GreekLetter, MathCategory } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { LetterCard } from './components/LetterCard';
import { CheatSheetTable } from './components/CheatSheetTable';
import { LetterModal } from './components/LetterModal';
import { MathView } from './components/MathView';
import { Sparkles, BookOpen, Volume2, Code, Compass } from 'lucide-react';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MathCategory | 'All'>('All');
  const [selectedLetter, setSelectedLetter] = useState<GreekLetter | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Dark mode state initialization with localStorage & system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Extract all unique math categories
  const allCategories: MathCategory[] = useMemo(() => {
    const set = new Set<MathCategory>();
    GREEK_LETTERS.forEach((l) => {
      l.categories.forEach((c) => set.add(c));
    });
    return Array.from(set);
  }, []);

  // Filtered letters based on search and category
  const filteredLetters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GREEK_LETTERS.filter((letter) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const matchesCategory =
          letter.categories.includes(selectedCategory) ||
          letter.usages.some((u) => u.category === selectedCategory);
        if (!matchesCategory) return false;
      }

      if (!q) return true;

      // Multi-attribute search
      const nameMatch = letter.name.toLowerCase().includes(q);
      const greekNameMatch = letter.greekName.toLowerCase().includes(q);
      const symbolMatch =
        letter.lower.symbol.includes(q) ||
        letter.upper.symbol.includes(q) ||
        letter.variants?.some((v) => v.symbol.includes(q));
      const latexMatch =
        letter.lower.latex.toLowerCase().includes(q) ||
        letter.upper.latex.toLowerCase().includes(q) ||
        letter.variants?.some((v) => v.latex.toLowerCase().includes(q));
      const phoneticMatch =
        letter.phonetics.englishPhonetic.toLowerCase().includes(q) ||
        letter.phonetics.englishIPA.toLowerCase().includes(q);
      const usageMatch = letter.usages.some(
        (u) =>
          u.title.toLowerCase().includes(q) ||
          u.explanation.toLowerCase().includes(q) ||
          u.symbolRole.toLowerCase().includes(q) ||
          u.latexFormula.toLowerCase().includes(q) ||
          (u.commonContext && u.commonContext.toLowerCase().includes(q))
      );

      return (
        nameMatch ||
        greekNameMatch ||
        symbolMatch ||
        latexMatch ||
        phoneticMatch ||
        usageMatch
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4 border border-indigo-200/60 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Interactive Mathematical Typography & Audio Reference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            The Greek Alphabet in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Mathematics</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            From Cauchy’s <MathView math="\varepsilon\text{-}\delta" className="mx-1" /> limits to Einstein’s curved spacetime <MathView math="\Gamma^k_{ij}" className="mx-1" /> and Riemann’s <MathView math="\zeta(s)" className="mx-1" />, explore the pronunciation, LaTeX code, and mathematical intuition behind every Greek symbol.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold font-serif text-indigo-600 dark:text-indigo-400">24</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Standard Letters</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">70+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Core Math Usages</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-200">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">LaTeX & KaTeX Ready</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">Dual</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">EN / EL Audio</div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={allCategories}
          totalResults={filteredLetters.length}
        />

        {/* View Mode Rendering */}
        {filteredLetters.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No matching Greek letters
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              We couldn't find any letters matching "{searchQuery}". Try searching by LaTeX command (like <code>\sigma</code>), English name, or concept (like <code>eigenvalue</code>).
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLetters.map((letter) => (
              <LetterCard
                key={letter.id}
                letter={letter}
                onSelect={(l) => setSelectedLetter(l)}
              />
            ))}
          </div>
        ) : (
          <CheatSheetTable
            letters={filteredLetters}
            onSelect={(l) => setSelectedLetter(l)}
          />
        )}
      </main>

      {/* Interactive Detail Modal */}
      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          allLetters={GREEK_LETTERS}
          onClose={() => setSelectedLetter(null)}
          onNavigate={(next) => setSelectedLetter(next)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 mt-16 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="font-serif font-bold text-indigo-600 dark:text-indigo-400 text-lg">Σ</span>
              <span className="font-bold text-slate-900 dark:text-white">Greek Letters in Mathematics</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Built with React, TypeScript, KaTeX, and Tailwind CSS. Deployable to Firebase Hosting.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Native Web Speech Audio</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-purple-500" />
              <span>KaTeX Math Rendering</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Standard Academic Conventions</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
