
export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  ALL = 'All Levels'
}

export enum GameCategory {
  WARM_UP = 'Warm-up',
  VOCABULARY = 'Vocabulary',
  GRAMMAR = 'Grammar',
  SPEAKING = 'Speaking',
  WRITING = 'Writing',
  LISTENING = 'Listening',
  ICE_BREAKER = 'Ice Breaker'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  difficulty: Difficulty;
  duration: string;
  groupSize: string;
  materials: string[];
  instructions: string[];
  teacherTips: string;
  isAiGenerated?: boolean;
}

export interface GameFilter {
  category?: GameCategory;
  difficulty?: Difficulty;
  searchQuery?: string;
}
