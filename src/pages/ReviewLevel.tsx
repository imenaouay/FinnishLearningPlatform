import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Check, X, RefreshCw } from 'lucide-react';
import { levels } from '../data/levels';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import AudioPlayer from '../components/AudioPlayer';
import SpeechRecognition from '../components/SpeechRecognition';

const ReviewLevel: React.FC = () => {
  const { difficulty, levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  
  const level = levels.find(l => l.id === Number(levelId));
  const examples = level?.examples || [];

  useEffect(() => {
    if (!user || !level) {
      navigate('/lessons');
    }
  }, [user, level, navigate]);

  const handleSpeechResult = (transcript: string) => {
    setSpokenText(transcript);
    const currentExample = examples[currentIndex];
    
    if (currentExample) {
      const isCorrect = transcript.toLowerCase() === currentExample.finnish.toLowerCase();
      setShowAnswer(true);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        toast.custom((t) => (
          <div className="bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-600" />
              <p className="font-medium">Excellent pronunciation!</p>
            </div>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div className="bg-red-100 border border-red-200 text-red-800 px-6 py-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <X className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium">Keep practicing!</p>
                <p className="text-sm mt-1">Correct: {currentExample.finnish}</p>
              </div>
            </div>
          </div>
        ));
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < examples.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setSpokenText('');
    } else {
      // Review completed
      updateProgress();
    }
  };

  const updateProgress = async () => {
    if (!user || !level) return;

    try {
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('points')
        .eq('user_id', user.id)
        .eq('level_id', level.id)
        .single();

      const newPoints = score * 10; // 10 points per correct answer
      const finalPoints = Math.max(existingProgress?.points || 0, newPoints);

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          level_id: level.id,
          points: finalPoints,
          completed: true
        }, {
          onConflict: 'user_id,level_id'
        });

      if (error) throw error;

      toast.success(`Review completed! Score: ${score}/${examples.length}`);
      navigate(`/level/${difficulty}/${levelId}`);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress');
    }
  };

  if (!level || !examples.length) {
    return <div>Level not found</div>;
  }

  const currentExample = examples[currentIndex];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Reviewing: {level.title}</h1>
            <div className="text-lg font-semibold">
              Progress: {currentIndex + 1}/{examples.length}
            </div>
          </div>
          <p className="text-purple-100">Practice your pronunciation and vocabulary</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold">Current Word</h2>
              </div>
              <div className="text-lg font-medium text-purple-600">
                Score: {score}/{currentIndex + 1}
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-purple-900 mb-2">
                    {currentExample.finnish}
                  </p>
                  <p className="text-gray-600">{currentExample.english}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <AudioPlayer text={currentExample.finnish} />
                  <SpeechRecognition onResult={handleSpeechResult} />
                </div>
              </div>

              {spokenText && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-100">
                  <p className="text-sm text-gray-600 mb-1">Your pronunciation:</p>
                  <p className="font-medium text-purple-600">{spokenText}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(`/level/${difficulty}/${levelId}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Exit Review</span>
            </button>

            <button
              onClick={handleNext}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {currentIndex < examples.length - 1 ? 'Next Word' : 'Finish Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLevel;