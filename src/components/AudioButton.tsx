import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  lang?: 'en-US' | 'el-GR';
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  lang = 'en-US',
  label,
  className = '',
  size = 'md',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85; // Slightly slower, crisp academic enunciation
      utterance.pitch = 1.0;

      // Try finding preferred voices if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const matchingVoice = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2 text-sm gap-1.5',
    lg: 'px-3 py-2 text-base gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <button
      onClick={playAudio}
      disabled={!isSupported || isPlaying}
      title={isSupported ? `Listen to pronunciation (${lang === 'el-GR' ? 'Greek' : 'English'})` : 'Audio not supported'}
      className={`inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 active:scale-95 ${
        isPlaying
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 shadow-sm'
      } ${sizeClasses} ${className}`}
      aria-label={`Listen to ${text}`}
    >
      {isPlaying ? (
        <Loader2 className={`${iconSizes} animate-spin text-white`} />
      ) : !isSupported ? (
        <VolumeX className={`${iconSizes} opacity-50`} />
      ) : (
        <Volume2 className={`${iconSizes} ${isPlaying ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
      )}
      {label && <span>{label}</span>}
    </button>
  );
};
