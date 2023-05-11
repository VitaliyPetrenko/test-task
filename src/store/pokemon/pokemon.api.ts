import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonList, PokemonItem } from '../../models/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemon/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: (build) => ({
    pokemonList: build.query<PokemonList, string>({
      query: (params) => `pokemon/${params}`
    }),
    pokemonItem: build.query<PokemonItem, string>({
      query: (url) => url
    })
  })
});

export const { usePokemonListQuery, usePokemonItemQuery } = pokemonApi;
