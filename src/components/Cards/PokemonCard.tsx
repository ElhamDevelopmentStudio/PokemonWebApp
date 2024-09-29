import { useEffect, useState } from "react";
import { getPokeImages } from "../../api/pokeapi";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, index }) => {
  const [spriteUrl, setSpriteUrl] = useState('');

  const getSpriteUrl = async () => {
    const spriteUrl = await getPokeImages(index);

    return spriteUrl
  }

    useEffect(() => {
        getSpriteUrl().then(setSpriteUrl);
    }, []);


    return (
        <Link to={`/pokemon/${name}`} className="block">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:bg-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center">
              <img src={spriteUrl} alt={name} className="w-20 h-20" />
            </div>
            <h3 className="text-xl font-semibold text-center mt-4 capitalize">{name}</h3>
          </div>
        </Link>
  );
}
export default PokemonCard;