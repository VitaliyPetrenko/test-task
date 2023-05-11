import React, { ReactElement } from 'react';
import cn from 'classnames';

import styles from './PokemonCard.module.css';
import PokemonCardPlaceholder from './PokemonCardPlaceholder';

type PokemonCardType = {
  name?: string;
  className?: string;
  src?: string;
  isLoading?: boolean;
  isError?: boolean;
  onClick?: () => void;
  content: ReactElement;
};

export default function PokemonCard({
  onClick,
  name,
  src,
  content,
  isLoading,
  className,
  isError
}: PokemonCardType) {
  if (isLoading) return <PokemonCardPlaceholder className={className} />;
  if (isError)
    return <PokemonCardPlaceholder className={className} text="Something went wrong..." />;

  return (
    <div className={cn(styles.card, className)} onClick={onClick} tabIndex={0} role="button">
      <img src={src} alt="pokemon-img" className={styles.image} />
      <div className={styles.name}>{name}</div>
      {content}
    </div>
  );
}
