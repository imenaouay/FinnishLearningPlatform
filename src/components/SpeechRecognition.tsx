import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface SpeechRecognitionProps {
  onResult: (transcript: string) => void;
  lang?: string;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({ onResult, lang = 'fi-FI' }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    setRecognition(recognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`inline-flex items-center justify-center p-2 rounded-full transition-colors ${
        isListening ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-blue-100'
      }`}
      title={isListening ? 'Stop recording' : 'Start recording'}
    >
      {isListening ? (
        <MicOff className="h-5 w-5 text-red-600" />
      ) : (
        <Mic className="h-5 w-5 text-blue-600" />
      )}
    </button>
  );
};

export default SpeechRecognition;