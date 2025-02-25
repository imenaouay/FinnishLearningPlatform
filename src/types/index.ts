export interface User {
  id: string;
  email: string;
  progress: {
    level: number;
    points: number;
    completedLessons: string[];
  };
}

export interface Lesson {
  id: string;
  title: string;
  level: number;
  description: string;
  content: {
    vocabulary: Array<{ finnish: string; english: string }>;
    exercises: Array<{
      type: 'multiple-choice' | 'translation';
      question: string;
      options?: string[];
      correctAnswer: string;
    }>;
  };
}