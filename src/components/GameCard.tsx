
import React from 'react';
import { Game, Difficulty, GameCategory } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.BEGINNER: return 'bg-emerald-100 text-emerald-700';
      case Difficulty.INTERMEDIATE: return 'bg-amber-100 text-amber-700';
      case Difficulty.ADVANCED: return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (cat: GameCategory) => {
    switch (cat) {
      case GameCategory.WARM_UP: return '🔥';
      case GameCategory.VOCABULARY: return '📚';
      case GameCategory.GRAMMAR: return '✏️';
      case GameCategory.SPEAKING: return '🗣️';
      case GameCategory.WRITING: return '📝';
      case GameCategory.LISTENING: return '🎧';
      default: return '🎮';
    }
  };

  return (
    <div 
      onClick={() => onClick(game)}
      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl" role="img" aria-label="category">
          {getCategoryIcon(game.category)}
        </span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getDifficultyColor(game.difficulty)}`}>
          {game.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {game.title}
      </h3>
      
      <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
        {game.description}
      </p>
      
      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {game.duration}
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {game.groupSize}
        </div>
      </div>
      
      {game.isAiGenerated && (
        <div className="mt-3 text-[10px] font-semibold text-indigo-400 flex items-center gap-1 uppercase tracking-widest">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95s0 2.223.003 3.321c.003 1.098.817 1.969 1.884 2.103 1.067.134 3.033.242 3.033.242a1 1 0 01.883 1.103c-.035.49-.408.883-.897.897a22.28 22.28 0 01-3.02.003c-1.098-.003-1.969.817-2.103 1.884-.134 1.067-.242 3.033-.242 3.033a1 1 0 01-1.103.883 1.01 1.01 0 01-.897-.897s0-2.223-.003-3.321c-.003-1.098-.817-1.969-1.884-2.103-1.067-.134-3.033-.242-3.033-.242a1 1 0 01-.883-1.103c.035-.49.408-.883.897-.897a22.28 22.28 0 013.02-.003c1.098.003 1.969-.817 2.103-1.884.134-1.067.242-3.033.242-3.033a1 1 0 011.103-.883z" clipRule="evenodd"></path></svg>
          AI Inspired
        </div>
      )}
    </div>
  );
};

export default GameCard;
