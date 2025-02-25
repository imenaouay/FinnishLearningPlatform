import React from 'react';
import { Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  lang?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ text, lang = 'fi-FI' }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-blue-100 transition-colors"
      title="Listen to pronunciation"
    >
      <Volume2 className="h-5 w-5 text-blue-600" />
    </button>
  );
};

export default AudioPlayer;