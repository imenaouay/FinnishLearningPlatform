import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { levels } from '../data/levels';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import AudioPlayer from '../components/AudioPlayer';
import SpeechRecognition from '../components/SpeechRecognition';

const LevelPage: React.FC = () => {
  const { difficulty, levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState<{ completed: boolean; points: number } | null>(null);
  const [spokenText, setSpokenText] = useState<string>('');
  const level = levels.find(l => l.id === Number(levelId));
  
  const nextLevel = levels.find(l => l.id === (Number(levelId) + 1));
  const prevLevel = levels.find(l => l.id === (Number(levelId) - 1));

  useEffect(() => {
    if (user && level) {
      fetchProgress();
    }
  }, [user, level]);

  const fetchProgress = async () => {
    if (!user || !level) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('completed, points')
        .eq('user_id', user.id)
        .eq('level_id', level.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
        return;
      }

      setProgress(data || { completed: false, points: 0 });
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleStartLearning = async () => {
    if (!user) {
      toast.error('Please log in to track your progress');
      navigate('/login');
      return;
    }

    if (!level) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          level_id: level.id,
          points: (progress?.points || 0) + 10,
          completed: true
        }, {
          onConflict: 'user_id,level_id'
        });

      if (error) throw error;

      toast.success('Progress saved!');
      await fetchProgress();
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    }
  };

  const handleSpeechResult = (transcript: string) => {
    setSpokenText(transcript);
    // Compare with expected phrases and provide feedback
    if (level?.examples) {
      const matchingPhrase = level.examples.find(
        ex => ex.finnish.toLowerCase() === transcript.toLowerCase()
      );
      if (matchingPhrase) {
        toast.custom((t) => (
          <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <p className="font-medium">Excellent pronunciation!</p>
            </div>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
              <p className="font-medium">Keep practicing!</p>
            </div>
          </div>
        ));
      }
    }
  };

  if (!level) {
    return <div>Level not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{level.title}</h1>
            <div className="inline-block px-3 py-1 bg-blue-500 rounded-full text-sm">
              {difficulty}
            </div>
          </div>
          <p className="text-blue-100">{level.description}</p>
          
          <div className="flex items-center space-x-4 mt-6">
            {progress?.completed && (
              <div className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium">
                Completed! ({progress.points} points)
              </div>
            )}
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Vocabulary</h3>
              <p className="text-sm text-gray-600">Learn essential words and phrases</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <MessageCircle className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Practice</h3>
              <p className="text-sm text-gray-600">Interactive exercises and quizzes</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <GraduationCap className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Progress</h3>
              <p className="text-sm text-gray-600">Track your learning journey</p>
            </div>
          </div>

          {level.examples && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Key Phrases</h2>
              <div className="grid gap-4">
                {level.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-blue-600">{example.finnish}</p>
                        <AudioPlayer text={example.finnish} />
                      </div>
                      <SpeechRecognition onResult={handleSpeechResult} />
                    </div>
                    <p className="text-gray-600 text-sm">{example.english}</p>
                  </div>
                ))}
              </div>
              {spokenText && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Your pronunciation:</p>
                  <p className="font-medium text-blue-600">{spokenText}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <div className="flex space-x-4">
              {prevLevel && (
                <button
                  onClick={() => navigate(`/level/${difficulty?.toLowerCase()}/${prevLevel.id}`)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous Level</span>
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              {progress?.completed ? (
                <button 
                  onClick={() => navigate(`/review/${difficulty}/${levelId}`)}
                  className="btn-primary py-3 px-8 text-lg font-semibold"
                >
                  Review Level
                </button>
              ) : (
                <button 
                  onClick={handleStartLearning}
                  className="btn-primary py-3 px-8 text-lg font-semibold"
                >
                  Start Learning
                </button>
              )}
            </div>

            <div className="flex space-x-4">
              {nextLevel && (
                <button
                  onClick={() => navigate(`/level/${difficulty?.toLowerCase()}/${nextLevel.id}`)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <span>Next Level</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;