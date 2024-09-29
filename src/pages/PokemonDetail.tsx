import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetails } from '../api/pokeapi';
import Loader from '../components/Globals/Loader';

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (name) {
        try {
          setIsLoading(true);
          const details = await getPokemonDetails(name);
          setPokemonDetails(details);
        } catch (err) {
          setError('Failed to fetch Pokémon details');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pokemonDetails) return null;

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen py-10">
      <div className="container mx-auto p-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">&larr; Back to List</Link>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 capitalize">{pokemonDetails.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <img src={pokemonDetails.sprites.front_default} alt={`${pokemonDetails.name} front`} className="w-full" />
            <img src={pokemonDetails.sprites.back_default} alt={`${pokemonDetails.name} back`} className="w-full" />
          </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Details</h3>
          <p><strong>Height:</strong> {pokemonDetails.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemonDetails.weight / 10} kg</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Types</h3>
          <div className="flex flex-wrap gap-2">
            {pokemonDetails.types.map((type) => (
              <span key={type.type.name} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Abilities</h3>
        <ul className="list-disc list-inside">
          {pokemonDetails.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {pokemonDetails.stats.map((stat) => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="capitalize">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PokemonDetail;