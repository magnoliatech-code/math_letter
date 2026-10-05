import React, { useEffect, useCallback } from 'react';
import { GreekLetter } from '../types';
import { MathView } from './MathView';
import { AudioButton } from './AudioButton';
import { CopyButton } from './CopyButton';
import { X, ArrowLeft, ArrowRight, BookOpen, History, Code2, ExternalLink } from 'lucide-react';

interface LetterModalProps {
  letter: GreekLetter;
  allLetters: GreekLetter[];
  onClose: () => void;
  onNavigate: (letter: GreekLetter) => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  letter,
  allLetters,
  onClose,
  onNavigate,
}) => {
  const currentIndex = allLetters.findIndex((l) => l.id === letter.id);
  const prevLetter = allLetters[(currentIndex - 1 + allLetters.length) % allLetters.length];
  const nextLetter = allLetters[(currentIndex + 1) % allLetters.length];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate(prevLetter);
      } else if (e.key === 'ArrowRight') {
        onNavigate(nextLetter);
      }
    },
    [onClose, onNavigate, prevLetter, nextLetter]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 sticky top-0 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              #{letter.order} of 24
            </span>
            <span className="text-sm font-serif text-slate-500 dark:text-slate-400">
              Greek: <strong className="font-semibold text-slate-800 dark:text-slate-200">{letter.greekName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Use ← → keys to navigate</span>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Title & Pronunciation Showcase */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {letter.name}
                </h2>
                <span className="text-2xl font-serif text-slate-400">{letter.greekName}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span>
                  Phonetic: <strong className="font-mono text-slate-800 dark:text-slate-200">{letter.phonetics.englishPhonetic}</strong>
                </span>
                <span>•</span>
                <span>
                  IPA: <code className="font-serif italic text-indigo-600 dark:text-indigo-400">{letter.phonetics.englishIPA}</code>
                </span>
                <span>•</span>
                <span>
                  Greek IPA: <code className="font-serif italic text-slate-500">{letter.phonetics.greekIPA}</code>
                </span>
              </div>

              {/* Pronunciation Audio Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <AudioButton
                  text={letter.speech.englishName}
                  lang="en-US"
                  label="Academic English Audio"
                  size="md"
                />
                <AudioButton
                  text={letter.speech.greekName}
                  lang="el-GR"
                  label="Modern Greek Audio"
                  size="md"
                />
              </div>
            </div>

            {/* Huge Glyph Box */}
            <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl px-6 py-4 self-start sm:self-auto">
              <div className="text-center">
                <div className="text-5xl font-serif text-slate-900 dark:text-slate-100">
                  {letter.upper.symbol}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Upper</div>
              </div>
              <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <div className="text-5xl font-serif text-indigo-600 dark:text-indigo-400">
                  {letter.lower.symbol}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Lower</div>
              </div>
              {letter.variants && letter.variants.length > 0 && (
                <>
                  <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
                  <div className="text-center">
                    <div className="text-5xl font-serif text-slate-600 dark:text-slate-300">
                      {letter.variants[0].symbol}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Variant</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* LaTeX Writing Guide */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>How to Write in LaTeX</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Lowercase */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Lowercase</div>
                  <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {letter.lower.latex}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-serif">{letter.lower.symbol}</span>
                  <CopyButton textToCopy={letter.lower.latex} label="Copy" size="sm" />
                </div>
              </div>

              {/* Uppercase */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Uppercase</div>
                  <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {letter.upper.latex}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-serif">{letter.upper.symbol}</span>
                  <CopyButton textToCopy={letter.upper.latex} label="Copy" size="sm" />
                </div>
              </div>

              {/* Variants */}
              {letter.variants?.map((v) => (
                <div
                  key={v.latex}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{v.name}</div>
                    <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {v.latex}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-serif">{v.symbol}</span>
                    <CopyButton textToCopy={v.latex} label="Copy" size="sm" />
                  </div>
                </div>
              ))}
            </div>
            {letter.upper.note && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                Note: {letter.upper.note}
              </p>
            )}
          </div>

          {/* Mathematical Usages Deep Dive */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Common Mathematical Usages</span>
              </div>
              <span className="text-xs text-slate-400">
                {letter.usages.length} curated {letter.usages.length === 1 ? 'application' : 'applications'}
              </span>
            </div>

            <div className="space-y-4">
              {letter.usages.map((usage, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {usage.title}
                      </h4>
                      {usage.wikiUrl && (
                        <a
                          href={usage.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800/60 transition"
                          title="Read article on Wikipedia"
                        >
                          <span>Wikipedia</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                      {usage.category}
                    </span>
                  </div>

                  {/* Rendered Math Formula Display */}
                  <div className="my-3 py-3 px-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-x-auto text-slate-900 dark:text-slate-100">
                    <MathView math={usage.latexFormula} block className="text-base sm:text-lg" />
                  </div>

                  <div className="space-y-1.5 mt-3 text-sm">
                    <div className="text-slate-700 dark:text-slate-300">
                      <strong className="font-semibold text-slate-900 dark:text-white">What it represents: </strong>
                      {usage.symbolRole}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {usage.explanation}
                    </p>
                    {usage.commonContext && (
                      <div className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                        <span className="font-medium">Context: </span>
                        {usage.commonContext}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical & Etymological Context */}
          {letter.historicalNote && (
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1.5">
                <History className="w-4 h-4" />
                <span>History & Etymology</span>
              </div>
              <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                {letter.historicalNote}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky bottom-0">
          <button
            onClick={() => onNavigate(prevLetter)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: {prevLetter.name} ({prevLetter.lower.symbol})</span>
          </button>

          <button
            onClick={() => onNavigate(nextLetter)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <span>Next: {nextLetter.name} ({nextLetter.lower.symbol})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
