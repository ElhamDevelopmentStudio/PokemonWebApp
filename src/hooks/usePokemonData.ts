import useSWR from "swr"
import { getPokemonList } from "../api/pokeapi"


export const usePokemonData = (limit: number = 20) => {

    const {data, error} = useSWR(`/pokemon?limit=${limit}`, () => getPokemonList(limit))

    return {
        data,
        isLoading: !error && !data,
        isError: error ? error.message : null
    }
}
