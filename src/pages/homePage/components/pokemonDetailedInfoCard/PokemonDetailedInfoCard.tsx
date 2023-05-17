import React from 'react';
import cn from 'classnames';

import { PokemonItem } from '../../../../models/pokemon';
import PokemonCard from '../pokemonCard/PokemonCard';

import styles from './PokemonDetailedInfoCard.module.css';

type PokemonDetailedInfoCardType = { data: PokemonItem | null; className?: string };

export default function PokemonDetailedInfoCard({ data, className }: PokemonDetailedInfoCardType) {
  if (!data) return null;

  return (
    <PokemonCard
      className={cn(styles.card, className)}
      name={data?.name}
      src={data?.sprites?.front_default}
      content={
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.title}>Type</td>
              <td>
                {data?.types?.map((pokemonType) => {
                  return `${pokemonType.type.name} `;
                })}
              </td>
            </tr>
            {data?.stats?.map((pokemonStat) => {
              return (
                <tr key={pokemonStat.stat.name}>
                  <td className={styles.title}>{pokemonStat.stat.name}</td>
                  <td>{pokemonStat.base_stat}</td>
                </tr>
              );
            })}
            <tr>
              <td className={styles.title}>Weight</td>
              <td>{data?.weight}</td>
            </tr>
            <tr>
              <td className={styles.title}>Total moves</td>
              <td>{data?.moves?.length}</td>
            </tr>
          </tbody>
        </table>
      }
    />
  );
}
