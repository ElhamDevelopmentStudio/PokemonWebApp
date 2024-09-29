import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 5000,
});

export const getPokeImages = async (index: number) => {
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
    return spriteUrl;
};

export const getPokemonList = async (limit: number = 20) => {
  const response = await apiClient.get(`/pokemon?limit=${limit}`);
  return response.data;
};

export const getPokemonDetails = async (name: string) => {
  const response = await apiClient.get(`/pokemon/${name}`);
  return response.data;
};