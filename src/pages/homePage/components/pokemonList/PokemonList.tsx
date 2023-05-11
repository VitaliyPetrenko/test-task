import React, { useState, useCallback } from 'react';
import { usePokemonListQuery } from '../../../../store/pokemon/pokemon.api';
import PokemonDetailedInfoCard from '../pokemonDetailedInfoCard/PokemonDetailedInfoCard';
import PokemonListCard from '../pokemonListCard/PokemonListCard';
import { PokemonItem, Result } from '../../../../models/pokemon';

import styles from './PokemonList.module.css';

const getUrlParams = (url?: string) => {
  return (url || '').replace(/.+?(\?.+?)/, '$1');
};

const DEFAULT_PARAMS = '?offset=0&limit=12';

function PokemonList() {
  const [urlParams, setUrlParams] = useState(DEFAULT_PARAMS);
  const [selectedCard, setSelectedCard] = useState<PokemonItem | null>(null);
  const { isFetching, isLoading, isError, data } = usePokemonListQuery(urlParams);

  const handleLoadMoreClick = () => {
    setUrlParams(getUrlParams(data?.next));
    setSelectedCard(null);
  };

  const handlePokemonCardClick = useCallback((card: PokemonItem) => {
    if (!card) return;

    setSelectedCard(card);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div>
          <div className={styles.list}>
            {data?.results?.map(({ url }: Result) => {
              return (
                <PokemonListCard
                  className={styles.card}
                  url={url}
                  key={url}
                  onClick={handlePokemonCardClick}
                />
              );
            })}
          </div>
          <button className={styles.loadMore} onClick={handleLoadMoreClick} disabled={isFetching}>
            Load more
          </button>
        </div>
        {selectedCard && (
          <div className={styles.detailedInfo}>
            <PokemonDetailedInfoCard data={selectedCard} />
          </div>
        )}
      </div>
    </div>
  );
}
export default PokemonList;
