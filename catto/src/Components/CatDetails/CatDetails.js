import React, { useState } from 'react';
import { Image, Message } from 'semantic-ui-react';
import CustomLoader from '../CustomLoader/CustomLoader';
import TransitionableImagePortal from '../TransitionableImagePortal/TransitionableImagePortal';
import Details from './Details';
import styles from './styles.module.css';

const CatDetails = ({ data, isLoading, isFetching, isError, error }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <div className={styles.container}>
        {isLoading || isFetching ? (
          <CustomLoader />
        ) : isError ? (
          <Message error>{error?.error || error?.data?.message}</Message>
        ) : (
          <div
            className={`${styles['cat-details']} ${
              !!data.breeds?.length ? '' : styles.center
            }`}
          >
            <div className={styles['image-container']}>
              <Image
                onClick={() => {
                  setPreviewImage(data.url);
                  setOpen(true);
                }}
                className={styles.image}
                src={data.url}
                size={'medium'}
              />
            </div>

            {data.breeds?.length ? (
              <Details details={data.breeds[0]} />
            ) : (
              <span>
                <em>
                  Sorry we don't know what is the breed of this cat. We will do
                  better!
                </em>
              </span>
            )}
          </div>
        )}
      </div>

      <TransitionableImagePortal
        previewImage={previewImage}
        open={open}
        setOpen={setOpen}
        setPreviewImage={setPreviewImage}
      />
    </>
  );
};

export default CatDetails;
