import React from 'react';
import cn from 'classnames';

import styles from './PokemonCard.module.css';

export default function PokemonCardPlaceholder({
  text,
  className
}: {
  text: string;
  className?: string;
}) {
  return <div className={cn(styles.card, className)}>{text}</div>;
}

PokemonCardPlaceholder.defaultProps = {
  text: 'Loading...'
};
