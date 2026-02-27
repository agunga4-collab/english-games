
import React, { useState, useEffect, useMemo } from 'react';
import { Game, GameCategory, Difficulty, GameFilter } from './types';
import { INITIAL_GAMES } from './constants';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';
import AddGameModal from './components/AddGameModal';
import { generateGame } from './services/geminiService';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('teacher_vault_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });
  const [filter, setFilter] = useState<GameFilter>({ searchQuery: '' });
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiInput, setShowAiInput] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('teacher_vault_games', JSON.stringify(games));
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(filter.searchQuery?.toLowerCase() || '') ||
                          game.description.toLowerCase().includes(filter.searchQuery?.toLowerCase() || '');
      const matchesCategory = !filter.category || game.category === filter.category;
      const matchesDifficulty = !filter.difficulty || game.difficulty === filter.difficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [games, filter]);

  const handleGenerateGame = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const newGame = await generateGame(aiPrompt);
      setGames(prev => [newGame, ...prev]);
      setSelectedGame(newGame);
      setAiPrompt('');
      setShowAiInput(false);
    } catch (error) {
      console.error("Failed to generate game:", error);
      alert("Oops! Gemini couldn't generate a game right now. Please check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddCustomGame = (newGame: Game) => {
    setGames(prev => [newGame, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header & Hero */}
      <header className="bg-gradient-to-br from-indigo-700 to-violet-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Building Teacher Confidence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Engage & <span className="text-indigo-300">Play</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            A collaborative repository of classroom games designed to give your students more English exposure while making your teaching life easier.
          </p>

          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-grow w-full">
              <input 
                type="text"
                placeholder="Search for games (e.g. 'Past Tense', 'Vocabulary')..."
                className="w-full bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-2xl focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                value={filter.searchQuery}
                onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowAiInput(!showAiInput)}
                className="flex-1 sm:flex-none px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95s0 2.223.003 3.321c.003 1.098.817 1.969 1.884 2.103 1.067.134 3.033.242 3.033.242a1 1 0 01.883 1.103c-.035.49-.408.883-.897.897a22.28 22.28 0 01-3.02.003c-1.098-.003-1.969.817-2.103 1.884-.134 1.067-.242 3.033-.242 3.033a1 1 0 01-1.103.883 1.01 1.01 0 01-.897-.897s0-2.223-.003-3.321c-.003-1.098-.817-1.969-1.884-2.103-1.067-.134-3.033-.242-3.033-.242a1 1 0 01-.883-1.103c.035-.49.408-.883.897-.897a22.28 22.28 0 013.02-.003c1.098.003 1.969-.817 2.103-1.884.134-1.067.242-3.033.242-3.033a1 1 0 011.103-.883z" clipRule="evenodd"></path></svg>
                AI Magic
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex-1 sm:flex-none px-6 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Upload Game
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Tool Drawer */}
      {showAiInput && (
        <div className="max-w-4xl mx-auto w-full -mt-10 px-6 z-20 transition-all">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-indigo-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">✨</span>
                Gemini Game Generator
              </h3>
              <button onClick={() => setShowAiInput(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Tell Gemini what you're teaching, and it'll design a fun game for your classroom.</p>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Ex: 'A game for 10-year-olds to practice prepositions of place'..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateGame()}
              />
              <button 
                disabled={isGenerating || !aiPrompt.trim()}
                onClick={handleGenerateGame}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Thinking...
                  </>
                ) : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter(prev => ({ ...prev, category: undefined }))}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!filter.category ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              All Types
            </button>
            {Object.values(GameCategory).map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(prev => ({ ...prev, category: cat }))}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter.category === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select 
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFilter(prev => ({ ...prev, difficulty: e.target.value as Difficulty || undefined }))}
          >
            <option value="">All Difficulties</option>
            {Object.values(Difficulty).map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {filter.searchQuery ? `Searching for "${filter.searchQuery}"` : 'English Games Vault'}
            <span className="ml-3 text-sm font-medium text-slate-400">({filteredGames.length} activities)</span>
          </h2>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setSelectedGame} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full text-slate-300 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No games found</h3>
            <p className="text-slate-500">Try adjusting your filters, upload your own, or use AI magic!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-lg mb-2 flex items-center justify-center md:justify-start gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              Engage & Play
            </h4>
            <p className="text-sm">Empowering English teachers through creativity and play.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Resources</a>
            <a href="#" className="hover:text-white transition-colors" onClick={() => setIsAddModalOpen(true)}>Contribute</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-xs text-slate-500">
            © 2024 English Teacher Hub. Made with ❤️ for educators.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
      <AddGameModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCustomGame}
      />
    </div>
  );
};

export default App;
