import React from 'react';
import cn from 'classnames';
import { usePokemonItemQuery } from '../../../../store/pokemon/pokemon.api';
import PokemonCard from '../pokemonCard/PokemonCard';
import { PokemonItem, Type as PokemonType } from '../../../../models/pokemon';

import styles from './PokemonListCard.module.css';

const POKEMON_TYPES: {
  [key: string]: any;
} = {
  normal: 'normal',
  fighting: 'fighting',
  flying: 'flying',
  poison: 'poison',
  ground: 'ground',
  rock: 'rock',
  bug: 'bug',
  ghost: 'ghost',
  steel: 'steel',
  fire: 'fire',
  water: 'water',
  grass: 'grass',
  electric: 'electric',
  psychic: 'psychic',
  ice: 'ice',
  dragon: 'dragon',
  dark: 'dark',
  fairy: 'fairy',
  unknown: 'unknown',
  shadow: 'shadow'
};

// eslint-disable-next-line no-unused-vars
type PokemonListCardType = { url: string; onClick: (obj: PokemonItem) => void; className: string };

export default function PokemonListCard({ url, onClick, className }: PokemonListCardType) {
  const { data, isLoading, isError } = usePokemonItemQuery(url);
  const handleClick = () => {
    if (!data) return;

    onClick(data);
  };

  return (
    <PokemonCard
      className={className}
      onClick={handleClick}
      src={data?.sprites?.front_default}
      isLoading={isLoading}
      isError={isError}
      name={data?.name}
      content={
        <div className={styles.types}>
          {data?.types?.map((pokemonTypes: PokemonType) => {
            const typeClassName = POKEMON_TYPES[pokemonTypes.type.name] || 'default';

            return (
              <div className={cn(styles.type, styles[typeClassName])} key={pokemonTypes.type.name}>
                {pokemonTypes.type.name}
              </div>
            );
          })}
        </div>
      }
    />
  );
}
