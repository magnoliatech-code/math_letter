import React from 'react';
import { GreekLetter } from '../types';
import { MathView } from './MathView';
import { AudioButton } from './AudioButton';
import { CopyButton } from './CopyButton';
import { ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

interface LetterCardProps {
  letter: GreekLetter;
  onSelect: (letter: GreekLetter) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(letter)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              #{letter.order}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-serif">
              {letter.greekName}
            </span>
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <AudioButton text={letter.speech.englishName} lang="en-US" size="sm" />
            <AudioButton text={letter.speech.greekName} lang="el-GR" size="sm" label="EL" />
          </div>
        </div>

        {/* Letter Glyphs & Name */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              {letter.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              {letter.phonetics.englishPhonetic} • <span className="font-serif italic">{letter.phonetics.englishIPA}</span>
            </p>
          </div>

          {/* Large Symbols */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-4xl font-serif text-indigo-900 dark:text-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <span>{letter.upper.symbol}</span>
              <span className="text-indigo-600 dark:text-indigo-400">{letter.lower.symbol}</span>
            </div>
            {letter.variants && letter.variants.length > 0 && (
              <div className="flex items-center justify-end gap-1.5 mt-1 text-sm font-serif text-slate-400 dark:text-slate-500">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">var:</span>
                {letter.variants.map((v) => (
                  <span key={v.latex} title={v.name} className="hover:text-indigo-500">
                    {v.symbol}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LaTeX Quick Copy Chips */}
        <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            LaTeX Commands
          </div>
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            <CopyButton textToCopy={letter.lower.latex} label={letter.lower.latex} size="sm" />
            <CopyButton textToCopy={letter.upper.latex} label={letter.upper.latex} size="sm" />
            {letter.variants?.map((v) => (
              <CopyButton key={v.latex} textToCopy={v.latex} label={v.latex} size="sm" />
            ))}
          </div>
        </div>

        {/* Primary Usages Teaser */}
        <div className="space-y-2 mb-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Key Mathematical Usages</span>
            <span className="text-[10px] text-slate-400 font-normal">({letter.usages.length})</span>
          </div>
          {letter.usages.slice(0, 2).map((usage, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-1 gap-1">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {usage.title}
                  </span>
                  {usage.wikiUrl && (
                    <a
                      href={usage.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-0.5 rounded transition-colors flex-shrink-0"
                      title="Open Wikipedia article"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium flex-shrink-0">
                  {usage.category.split(' ')[0]}
                </span>
              </div>
              <div className="py-1 text-center bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800/60 my-1 overflow-x-hidden">
                <MathView math={usage.latexFormula} className="text-xs text-slate-700 dark:text-slate-200" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {usage.symbolRole}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer & Card Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
          <span>Explore details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{letter.categories[0]}</span>
        </div>
      </div>
    </div>
  );
};
