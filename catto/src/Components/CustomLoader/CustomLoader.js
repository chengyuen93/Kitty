import React from 'react';
import {} from 'semantic-ui-react';
import styles from './styles.module.css';

const CustomLoader = () => {
  const barCount = 5;

  return (
    <div className={styles.CustomLoader}>
      <div className={styles.LoaderContent}>
        {Array(barCount)
          .fill(1)
          .map((_, i) => {
            return <div key={i} className={`customloadingbar_${i}`}></div>;
          })}
      </div>
    </div>
  );
};

export default CustomLoader;
