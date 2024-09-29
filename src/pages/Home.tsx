import React from 'react';
import PokemonList from '../components/Lists/PokemonList';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen py-10">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Pokémon Explorer</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <PokemonList />
        </div>
      </div>
    </div>
  );
};

export default Home;