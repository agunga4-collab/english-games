
import React, { useState } from 'react';
import { Game, GameCategory, Difficulty } from '../types';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (game: Game) => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: GameCategory.WARM_UP,
    difficulty: Difficulty.BEGINNER,
    duration: '',
    groupSize: '',
    materials: [''],
    instructions: [''],
    teacherTips: ''
  });

  if (!isOpen) return null;

  const handleAddField = (field: 'materials' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveField = (field: 'materials' | 'instructions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (field: 'materials' | 'instructions', index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGame: Game = {
      ...formData,
      id: Math.random().toString(36).substring(2, 9),
      materials: formData.materials.filter(m => m.trim() !== ''),
      instructions: formData.instructions.filter(i => i.trim() !== ''),
    };
    onSave(newGame);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: GameCategory.WARM_UP,
      difficulty: Difficulty.BEGINNER,
      duration: '',
      groupSize: '',
      materials: [''],
      instructions: [''],
      teacherTips: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-auto flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-50/30">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">📤</span>
            Upload Your Game
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Game Title*</label>
              <input 
                required
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ex: Mystery Bag Vocabulary"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Short Description*</label>
              <textarea 
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                placeholder="Describe the main goal of the game..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as GameCategory })}
                >
                  {Object.values(GameCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Difficulty</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                >
                  {Object.values(Difficulty).map(diff => <option key={diff} value={diff}>{diff}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Duration</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Ex: 15-20 mins"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Group Size</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Ex: Whole class"
                  value={formData.groupSize}
                  onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-slate-700">Materials</label>
                <button type="button" onClick={() => handleAddField('materials')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">+ Add Material</button>
              </div>
              {formData.materials.map((m, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input 
                    type="text"
                    className="flex-grow px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                    placeholder={`Material ${i+1}`}
                    value={m}
                    onChange={e => handleFieldChange('materials', i, e.target.value)}
                  />
                  {formData.materials.length > 1 && (
                    <button type="button" onClick={() => handleRemoveField('materials', i)} className="text-slate-400 hover:text-rose-500">×</button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-slate-700">Step-by-Step Instructions</label>
                <button type="button" onClick={() => handleAddField('instructions')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">+ Add Step</button>
              </div>
              {formData.instructions.map((step, i) => (
                <div key={i} className="flex gap-2 mb-2 items-start">
                  <span className="mt-2 text-xs font-bold text-slate-400">{i+1}.</span>
                  <textarea 
                    className="flex-grow px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                    placeholder={`Instruction step ${i+1}`}
                    value={step}
                    onChange={e => handleFieldChange('instructions', i, e.target.value)}
                  />
                  {formData.instructions.length > 1 && (
                    <button type="button" onClick={() => handleRemoveField('instructions', i)} className="text-slate-400 hover:text-rose-500 mt-2">×</button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Teacher Tips</label>
              <textarea 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                placeholder="Pro-tips for making the game successful..."
                value={formData.teacherTips}
                onChange={e => setFormData({ ...formData, teacherTips: e.target.value })}
              />
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all"
          >
            Save & Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
