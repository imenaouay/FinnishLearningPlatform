import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, ChevronRight } from 'lucide-react';
import { getLevelsByDifficulty } from '../data/levels';

const Lessons: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const levels = getLevelsByDifficulty(selectedDifficulty);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Finnish Language Lessons</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master Finnish through our comprehensive curriculum. Choose your level and start learning today.
        </p>
      </header>

      <div className="flex justify-center space-x-4 mb-12">
        {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty as 'Beginner' | 'Intermediate' | 'Advanced')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedDifficulty === difficulty
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/level/${selectedDifficulty.toLowerCase()}/${level.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 rounded-full p-3 group-hover:bg-blue-100 transition-colors">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {level.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{level.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">{level.difficulty}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;