import React, { useCallback, useState } from 'react';
import {
  useGetBreedsQuery,
  useLazyGetCatQuery,
  useLazyGetCatsByBreedQuery
} from '../../store/apis/combinedApis';
import CatDetails from '../CatDetails/CatDetails';
import GetContainer from '../GetContainer/GetContainer';
import styles from './styles.module.css';

const HomePage = () => {
  // 0 - nothing, 1 - details from random, 2 - list from search
  const [displayType, setDisplayType] = useState(0);

  const [
    getCat,
    {
      data: getCatData = {},
      isLoading: getCatIsLoading,
      isFetching: getCatIsFetching,
      isError: getCatIsError,
      error: getCatError
    }
  ] = useLazyGetCatQuery();

  const [
    getCatsByBreed,
    {
      data: catsByBreedData,
      isLoading: catsByBreedIsLoading,
      isFetching: catsByBreedIsFetching,
      isError: catsByBreedIsError,
      error: catsByBreedError
    }
  ] = useLazyGetCatsByBreedQuery();

  const {
    data: getBreedsData = [],
    isLoading: getBreedsIsLoading,
    isFetching: getBreedsIsFetching,
    isError: getBreedsIsError,
    error: getBreedsError
  } = useGetBreedsQuery();

  const handleGetRandomCat = useCallback(() => {
    getCat({});
    setDisplayType(1);
  }, [getCat, setDisplayType]);

  const handleGetCatsByBreeds = useCallback(
    breed_id => {
      setDisplayType(2);
      return getCatsByBreed({ breed_id });
    },
    [setDisplayType, getCatsByBreed]
  );

  return (
    <div className="page">
      <div className={styles.header}>Find Some Cattos</div>
      <div className={styles.content}>
        <GetContainer
          randomButtonDisabled={getCatIsLoading || getCatIsFetching}
          handleGetRandomCat={handleGetRandomCat}
          breedsData={getBreedsData}
          searchDisabled={
            getBreedsIsFetching ||
            getBreedsIsLoading ||
            getBreedsIsError ||
            catsByBreedIsFetching ||
            catsByBreedIsLoading ||
            catsByBreedIsError
          }
          searchLoading={
            getBreedsIsFetching ||
            getBreedsIsLoading ||
            catsByBreedIsFetching ||
            catsByBreedIsLoading
          }
          searchError={getBreedsError || catsByBreedError}
          handleGetCatsByBreeds={handleGetCatsByBreeds}
        />
        <div className={styles.display}>
          {displayType === 1 ? (
            <CatDetails
              data={getCatData}
              isLoading={getCatIsLoading}
              isFetching={getCatIsFetching}
              isError={getCatIsError}
              error={getCatError}
            />
          ) : displayType === 2 ? (
            <CatDetails
              data={catsByBreedData}
              isLoading={catsByBreedIsLoading}
              isFetching={catsByBreedIsFetching}
              isError={catsByBreedIsError}
              error={catsByBreedError}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
