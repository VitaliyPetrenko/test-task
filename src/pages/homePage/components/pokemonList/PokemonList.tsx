import React, { useState, useCallback, useEffect } from 'react';
import { usePokemonListQuery } from '../../../../store/pokemon/pokemon.api';
import PokemonDetailedInfoCard from '../pokemonDetailedInfoCard/PokemonDetailedInfoCard';
import PokemonListCard from '../pokemonListCard/PokemonListCard';
import { PokemonItem, Result } from '../../../../models/pokemon';
import { useTableOrMobile } from '../../../../hooks/useTableOrMobile';

import styles from './PokemonList.module.css';
import Modal from '../../../../components/modal/Modal';
import PokemonDetailedInfoModal from '../modals/pokemonDetailedInfoModal/PokemonDetailedInfoModal';

const getUrlParams = (url?: string) => {
  return (url || '').replace(/.+?(\?.+?)/, '$1');
};

const DEFAULT_PARAMS = '?offset=0&limit=12';

function PokemonList() {
  const [urlParams, setUrlParams] = useState(DEFAULT_PARAMS);
  const [selectedCard, setSelectedCard] = useState<PokemonItem | null>(null);
  const { isFetching, isLoading, isError, data } = usePokemonListQuery(urlParams);
  const isTableOrMobile = useTableOrMobile();
  const handleLoadMoreClick = () => {
    setUrlParams(getUrlParams(data?.next));
    setSelectedCard(null);
  };
  const handleRequestClose = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const handlePokemonCardClick = useCallback((card: PokemonItem) => {
    if (!card) return;

    setSelectedCard(card);
  }, []);

  useEffect(() => {
    if (isTableOrMobile && !isFetching) {
      window.scroll(0, 0);
    }
  }, [isFetching]);

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
        {!isTableOrMobile && selectedCard && (
          <div className={styles.detailedInfo}>
            <PokemonDetailedInfoCard data={selectedCard} className={styles.detailedInfoCard} />
          </div>
        )}
      </div>
      <PokemonDetailedInfoModal
        isOpen={Boolean(selectedCard && isTableOrMobile)}
        onRequestClose={handleRequestClose}
        selectedCard={selectedCard}
      />
    </div>
  );
}
export default PokemonList;
