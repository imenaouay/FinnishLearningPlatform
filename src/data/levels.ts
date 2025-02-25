export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  examples?: { finnish: string; english: string }[];
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    description: "Learn basic greetings, self-introduction phrases, and polite expressions.",
    difficulty: "Beginner",
    examples: [
      { finnish: "Hei", english: "Hi" },
      { finnish: "Moi", english: "Hi (informal)" },
      { finnish: "Hyvää huomenta", english: "Good morning" },
      { finnish: "Kiitos", english: "Thank you" },
      { finnish: "Ole hyvä", english: "You're welcome" }
    ]
  },
  {
    id: 2,
    title: "Family & Relationships",
    description: "Vocabulary for family members and phrases to talk about relationships.",
    difficulty: "Beginner",
    examples: [
      { finnish: "äiti", english: "mother" },
      { finnish: "isä", english: "father" },
      { finnish: "veli", english: "brother" },
      { finnish: "sisko", english: "sister" },
      { finnish: "perhe", english: "family" }
    ]
  },
  {
    id: 3,
    title: "Numbers & Counting",
    description: "Cardinal and ordinal numbers; practice counting and simple math expressions in Finnish.",
    difficulty: "Beginner",
    examples: [
      { finnish: "yksi", english: "one" },
      { finnish: "kaksi", english: "two" },
      { finnish: "kolme", english: "three" },
      { finnish: "neljä", english: "four" },
      { finnish: "viisi", english: "five" }
    ]
  },
  {
    id: 4,
    title: "Colors & Shapes",
    description: "Learn color names and basic shapes plus descriptive adjectives.",
    difficulty: "Beginner",
    examples: [
      { finnish: "punainen", english: "red" },
      { finnish: "sininen", english: "blue" },
      { finnish: "vihreä", english: "green" },
      { finnish: "ympyrä", english: "circle" },
      { finnish: "neliö", english: "square" }
    ]
  },
  {
    id: 5,
    title: "Time & Dates",
    description: "Telling time, days of the week, months, seasons, and how to say dates.",
    difficulty: "Beginner",
    examples: [
      { finnish: "maanantai", english: "Monday" },
      { finnish: "tiistai", english: "Tuesday" },
      { finnish: "kesä", english: "summer" },
      { finnish: "talvi", english: "winter" },
      { finnish: "kello", english: "clock" }
    ]
  },
  // First set of Intermediate levels
  {
    id: 21,
    title: "Animals & Pets",
    description: "Common animals and pets, including names, sounds, and basic behaviors.",
    difficulty: "Intermediate",
    examples: [
      { finnish: "koira", english: "dog" },
      { finnish: "kissa", english: "cat" },
      { finnish: "lintu", english: "bird" },
      { finnish: "kala", english: "fish" }
    ]
  },
  // First set of Advanced levels
  {
    id: 41,
    title: "Idioms & Expressions",
    description: "Common Finnish idioms, proverbs, and culturally unique expressions.",
    difficulty: "Advanced",
    examples: [
      { finnish: "Parempi myöhään kuin ei milloinkaan", english: "Better late than never" },
      { finnish: "Ei kannata mennä merta edemmäs kalaan", english: "Don't go fishing beyond the sea (meaning: what you're looking for might be closer than you think)" }
    ]
  }
  // Add remaining levels with appropriate difficulty levels...
];

export const getLevelsByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
  return levels.filter(level => level.difficulty === difficulty);
};

export const getDifficultyForLevel = (levelId: number) => {
  const level = levels.find(l => l.id === levelId);
  return level?.difficulty || 'Beginner';
};