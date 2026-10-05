import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label,
  size = 'sm',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs gap-1.5' : 'px-3 py-1.5 text-sm gap-2';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      onClick={handleCopy}
      title={`Copy "${textToCopy}" to clipboard`}
      className={`inline-flex items-center font-mono rounded-md transition-all duration-200 active:scale-95 border ${
        copied
          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700'
      } ${sizeClasses} ${className}`}
      aria-label={`Copy ${textToCopy}`}
    >
      {copied ? (
        <Check className={`${iconSize} text-emerald-600 dark:text-emerald-400`} />
      ) : (
        <Copy className={`${iconSize} opacity-60 group-hover:opacity-100`} />
      )}
      <span>{label || textToCopy}</span>
      {copied && (
        <span className="text-[10px] font-sans font-medium text-emerald-600 dark:text-emerald-400 ml-0.5">
          Copied!
        </span>
      )}
    </button>
  );
};
