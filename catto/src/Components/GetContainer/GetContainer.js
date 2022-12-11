import React from 'react';
import { Button, Search } from 'semantic-ui-react';
import styles from './styles.module.css';

const GetContainer = ({ randomButtonDisabled, handleGetRandomCat }) => {
  return (
    <div className={styles['button-container']}>
      <div className={`${styles.title} ${styles.item}`}>Find your cat!</div>
      <Button
        onClick={handleGetRandomCat}
        disabled={randomButtonDisabled}
        className={`${styles.item} ${styles.button}`}
      >
        Random
      </Button>
      <Search
        className={`${styles.item}`}
        // loading={loading}
        placeholder="Search by breeds"
        // onSearchChange={handleSearchChange}
        // value={value}
      />
    </div>
  );
};

export default GetContainer;
