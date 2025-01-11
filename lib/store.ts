import { create } from 'zustand'
import { saveToFile, loadFromFile, exportToPDF } from './fileUtils'

export interface DecisionState {
  problemStatement: string
  criteria: { id: string; name: string; weight: number }[]
  options: { id: string; name: string; scores: { [criteriaId: string]: number } }[]
  setProblemStatement: (statement: string) => void
  addCriterion: (name: string) => void
  updateCriterionWeight: (id: string, weight: number) => void
  addOption: (name: string) => void
  updateOptionScore: (optionId: string, criterionId: string, score: number) => void
  saveDecision: () => void
  loadDecision: (file: File) => Promise<void>
  exportToPDF: () => void
}

export const useDecisionStore = create<DecisionState>((set, get) => ({
  problemStatement: '',
  criteria: [],
  options: [],
  setProblemStatement: (statement) => set({ problemStatement: statement }),
  addCriterion: (name) =>
    set((state) => ({
      criteria: [...state.criteria, { id: Date.now().toString(), name, weight: 0 }],
    })),
  updateCriterionWeight: (id, weight) =>
    set((state) => ({
      criteria: state.criteria.map((c) => (c.id === id ? { ...c, weight } : c)),
    })),
  addOption: (name) =>
    set((state) => ({
      options: [...state.options, { id: Date.now().toString(), name, scores: {} }],
    })),
  updateOptionScore: (optionId, criterionId, score) =>
    set((state) => ({
      options: state.options.map((o) =>
        o.id === optionId ? { ...o, scores: { ...o.scores, [criterionId]: score } } : o
      ),
    })),
  saveDecision: () => {
    const state = get();
    const data = {
      problemStatement: state.problemStatement,
      criteria: state.criteria,
      options: state.options,
    };
    saveToFile(data, 'decision.json');
  },
  loadDecision: async (file: File) => {
    try {
      const data = await loadFromFile(file);
      set({
        problemStatement: data.problemStatement,
        criteria: data.criteria,
        options: data.options,
      });
    } catch (error) {
      console.error('Error loading decision:', error);
      throw error;
    }
  },
  exportToPDF: () => {
    const state = get();
    exportToPDF(state);
  },
}))

