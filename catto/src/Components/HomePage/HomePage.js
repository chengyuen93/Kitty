import React, { useCallback, useState } from 'react';
import { useLazyGetCatQuery } from '../../store/apis/combinedApis';
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

  const handleGetRandomCat = useCallback(() => {
    getCat({});
    setDisplayType(1);
  }, [getCat, setDisplayType]);

  return (
    <div className="page">
      <div className={styles.header}>Find Some Cattos</div>
      <div className={styles.content}>
        <GetContainer
          randomButtonDisabled={getCatIsLoading || getCatIsFetching}
          handleGetRandomCat={handleGetRandomCat}
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
            <>list</>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
