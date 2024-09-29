import { create } from 'zustand';

interface PokemonState {
  selectedPokemon: string | null;
  setSelectedPokemon: (name: string | null) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  selectedPokemon: null,
  setSelectedPokemon: (name) => set({ selectedPokemon: name }),
}));