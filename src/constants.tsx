
import { Game, GameCategory, Difficulty } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    title: 'Sentence Auction',
    description: 'A fun game where students bid on correct and incorrect sentences using "play money".',
    category: GameCategory.GRAMMAR,
    difficulty: Difficulty.INTERMEDIATE,
    duration: '20-30 mins',
    groupSize: 'Groups of 3-4',
    materials: ['Printed sentence list', 'Play money (optional)', 'Gavel (optional)'],
    instructions: [
      'Divide students into teams and give each team a budget.',
      'Show sentences one by one. Some are correct, some have errors.',
      'Teams bid on sentences they believe are correct.',
      'The team with the most correct sentences at the end wins.'
    ],
    teacherTips: 'Encourage students to justify their bids by explaining why a sentence is correct or wrong.'
  },
  {
    id: '2',
    title: 'Word Chain',
    description: 'A quick-fire vocabulary game where the last letter of one word starts the next.',
    category: GameCategory.VOCABULARY,
    difficulty: Difficulty.BEGINNER,
    duration: '5-10 mins',
    groupSize: 'Whole Class',
    materials: ['None'],
    instructions: [
      'Start with a random word (e.g., "Apple").',
      'The next student must say a word starting with the last letter (e.g., "Elephant").',
      'Repeat until someone repeats a word or can\'t think of one.'
    ],
    teacherTips: 'Set a category like "Travel" or "Food" to make it more challenging.'
  },
  {
    id: '3',
    title: 'Desert Island Discs',
    description: 'A speaking activity focused on justification and conditional sentences.',
    category: GameCategory.SPEAKING,
    difficulty: Difficulty.ADVANCED,
    duration: '15-20 mins',
    groupSize: 'Pairs or Groups',
    materials: ['Paper', 'Pens'],
    instructions: [
      'Tell students they are stranded on a desert island.',
      'They can only bring 3 items from a list of 10.',
      'Students must debate and agree on the 3 items, explaining why.'
    ],
    teacherTips: 'Great for practicing second conditional: "If I brought a matches, I would build a fire."'
  }
];
