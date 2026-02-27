
import React from 'react';
import { Game } from '../types';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start bg-indigo-50/30">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded uppercase tracking-wider">
                {game.category}
              </span>
              <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                {game.difficulty}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{game.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="space-y-8">
            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Overview</h4>
              <p className="text-slate-700 leading-relaxed">{game.description}</p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Materials</h4>
                <ul className="space-y-2">
                  {game.materials.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Setup</h4>
                <p className="text-slate-700 text-sm">
                  <strong>Duration:</strong> {game.duration}<br/>
                  <strong>Group:</strong> {game.groupSize}
                </p>
              </section>
            </div>

            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Instructions</h4>
              <ol className="space-y-4">
                {game.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h4 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"></path></svg>
                Teacher Tip
              </h4>
              <p className="text-amber-900 text-sm italic leading-relaxed">
                "{game.teacherTips}"
              </p>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
