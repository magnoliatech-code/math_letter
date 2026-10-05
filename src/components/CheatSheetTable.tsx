import React from 'react';
import { GreekLetter } from '../types';
import { AudioButton } from './AudioButton';
import { CopyButton } from './CopyButton';

interface CheatSheetTableProps {
  letters: GreekLetter[];
  onSelect: (letter: GreekLetter) => void;
}

export const CheatSheetTable: React.FC<CheatSheetTableProps> = ({ letters, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="py-3 px-4 w-12 text-center">#</th>
            <th className="py-3 px-4">Name & Audio</th>
            <th className="py-3 px-4 text-center">Lower (LaTeX)</th>
            <th className="py-3 px-4 text-center">Upper (LaTeX)</th>
            <th className="py-3 px-4">Variants</th>
            <th className="py-3 px-4">Primary Mathematical Meaning</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          {letters.map((letter) => (
            <tr
              key={letter.id}
              onClick={() => onSelect(letter)}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              {/* Order */}
              <td className="py-3.5 px-4 text-center text-xs font-mono text-slate-400">
                {letter.order}
              </td>

              {/* Name & Audio */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {letter.name}
                    </span>
                    <span className="text-xs text-slate-400 font-serif">
                      {letter.greekName} ({letter.phonetics.englishPhonetic})
                    </span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <AudioButton text={letter.speech.englishName} lang="en-US" size="sm" />
                  </div>
                </div>
              </td>

              {/* Lowercase */}
              <td className="py-3.5 px-4 text-center">
                <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xl font-serif text-indigo-600 dark:text-indigo-400">
                    {letter.lower.symbol}
                  </span>
                  <CopyButton textToCopy={letter.lower.latex} label={letter.lower.latex} size="sm" />
                </div>
              </td>

              {/* Uppercase */}
              <td className="py-3.5 px-4 text-center">
                <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xl font-serif text-slate-900 dark:text-slate-100">
                    {letter.upper.symbol}
                  </span>
                  <CopyButton textToCopy={letter.upper.latex} label={letter.upper.latex} size="sm" />
                </div>
              </td>

              {/* Variants */}
              <td className="py-3.5 px-4">
                {letter.variants && letter.variants.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {letter.variants.map((v) => (
                      <CopyButton
                        key={v.latex}
                        textToCopy={v.latex}
                        label={`${v.symbol} ${v.latex}`}
                        size="sm"
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs">—</span>
                )}
              </td>

              {/* Primary Mathematical Role */}
              <td className="py-3.5 px-4 max-w-xs">
                <div className="text-xs">
                  <strong className="text-slate-900 dark:text-slate-200">
                    {letter.usages[0]?.title}:
                  </strong>{' '}
                  <span className="text-slate-500 dark:text-slate-400 line-clamp-1">
                    {letter.usages[0]?.symbolRole}
                  </span>
                </div>
              </td>

              {/* Action */}
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(letter);
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-lg transition"
                >
                  Details →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
