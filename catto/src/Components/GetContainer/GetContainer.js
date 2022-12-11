import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Label, Search } from 'semantic-ui-react';
import styles from './styles.module.css';
import './styles.css';

const GetContainer = ({
  randomButtonDisabled,
  handleGetRandomCat,
  handleGetCatsByBreeds,
  breedsData,
  searchLoading,
  searchDisabled,
  searchError
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const timeoutRef = useRef();

  const handleSearchChange = useCallback(
    (e, { value }) => {
      clearTimeout(timeoutRef.current);
      setSearchValue(value);

      timeoutRef.current = setTimeout(() => {
        if (value.length === 0) {
          setSearchResults([]);
          return;
        }

        const lowerCaseQuery = value.toLowerCase();

        const results = breedsData.filter(x => {
          return x.title.toLowerCase().includes(lowerCaseQuery);
        });
        setSearchResults(results);
      }, 300);
    },
    [setSearchResults, breedsData, setSearchValue]
  );

  const handleSelectBreed = useCallback(
    (e, { result }) => {
      handleGetCatsByBreeds(result.id)
        .unwrap()
        .then(ret => {
          if (ret.info.length) setSearchValue('');
          else setSearchValue(result.title);
        });
    },
    [handleGetCatsByBreeds, setSearchValue]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

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
        className={`${styles.item} breedsSearch`}
        loading={searchLoading}
        placeholder="Search by breeds"
        disabled={searchDisabled}
        onSearchChange={handleSearchChange}
        results={searchResults}
        onResultSelect={handleSelectBreed}
        value={searchValue}
      />
      {searchError && (
        <Label basic color="red" pointing>
          {searchError?.error || searchError?.data?.message}
        </Label>
      )}
    </div>
  );
};

export default GetContainer;
