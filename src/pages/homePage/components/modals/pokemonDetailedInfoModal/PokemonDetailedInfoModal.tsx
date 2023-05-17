import React from 'react';

import PokemonDetailedInfoCard from '../../pokemonDetailedInfoCard/PokemonDetailedInfoCard';

import Modal, { ModalType } from '../../../../../components/modal/Modal';
import { PokemonItem } from '../../../../../models/pokemon';

import styles from './PokemonDetailedInfoModal.module.css';

type PokemonDetailedInfoModalType = {
  selectedCard: PokemonItem | null;
} & ModalType;

function PokemonDetailedInfoModal({
  isOpen,
  onRequestClose,
  selectedCard
}: PokemonDetailedInfoModalType) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.content}>
        <PokemonDetailedInfoCard data={selectedCard} />
      </div>
    </Modal>
  );
}
export default PokemonDetailedInfoModal;
