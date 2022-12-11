import React, { useEffect, useState } from 'react';
import { Image, Message } from 'semantic-ui-react';
import CustomLoader from '../CustomLoader/CustomLoader';
import TransitionableImagePortal from '../TransitionableImagePortal/TransitionableImagePortal';
import Details from './Details';
import ImageCarousel from './ImageCarousel';
import styles from './styles.module.css';

const CatDetails = ({ data, isLoading, isFetching, isError, error }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (isLoading || isFetching) setImageLoading(true);
  }, [isLoading, isFetching, setImageLoading]);

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
            {data.url ? (
              <div
                className={styles['image-container']}
                onClick={() => {
                  setPreviewImage(data.url);
                  setOpen(true);
                }}
              >
                {imageLoading && <CustomLoader />}
                <Image
                  className={styles.image}
                  src={data.url}
                  size={'medium'}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            ) : data.info ? (
              <ImageCarousel
                images={data.info}
                setPreviewImage={setPreviewImage}
                setOpen={setOpen}
              />
            ) : null}

            {data.breeds?.length ? (
              <Details details={data.breeds[0]} />
            ) : (
              <span>
                <em>
                  {data.info
                    ? `Sorry we can't find any information on this breed!`
                    : `Sorry we don't know what is the breed of this cat. We will do
                  better!`}
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
