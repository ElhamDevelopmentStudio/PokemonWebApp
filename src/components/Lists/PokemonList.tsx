import { useState } from "react";
import { usePokemonData } from "../../hooks/usePokemonData";
import PokemonCard from "../Cards/PokemonCard";
import Loader from "../Globals/Loader";


const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = usePokemonData();

  const filteredData = data ? {
    ...data,
    results: data.results.filter((pokemon: { name: string }) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  } : null

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">Error loading Pokémon</div>;

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredData?.results.map((pokemon: { name: string }, index: number) => (
          <PokemonCard key={index} name={pokemon.name} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
