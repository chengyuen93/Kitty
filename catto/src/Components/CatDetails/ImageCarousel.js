import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Icon, Image } from 'semantic-ui-react';
import CustomLoader from '../CustomLoader/CustomLoader';

const ImageCarousel = ({ images = [], setPreviewImage, setOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heights, setHeights] = useState([]);
  const [imagesLoading, setImagesLoading] = useState([]);

  const carouselRef = useRef();

  const handleImageOnLoad = useCallback(
    (e, index) => {
      setHeights(h => {
        if (e.target.clientHeight) return [...h, e.target.clientHeight];
      });
      setImagesLoading(loading => {
        const newLoading = [...loading];
        newLoading[index] = false;
        return newLoading;
      });
    },
    [setHeights, setImagesLoading]
  );

  useEffect(() => {
    if (heights.length && carouselRef.current) {
      const maxHeight = Math.max(...heights);
      carouselRef.current.style.height = `calc(${maxHeight}px + 1rem)`;
    }
  }, [heights]);

  useEffect(() => {
    setImagesLoading(Array(images.length).fill(true));
  }, [images]);

  if (!images.length) return null;

  return (
    <div ref={carouselRef} className={`${styles['image-carousel']}`}>
      {images.map(({ id, url }, ind) => {
        return (
          <div
            key={id}
            className={`${styles['image-container']} ${
              styles['carousel-image']
            } ${
              ind < currentIndex
                ? styles.prev
                : ind > currentIndex
                ? styles.next
                : ''
            }`}
            onClick={() => {
              setPreviewImage(url);
              setOpen(true);
            }}
          >
            {!!imagesLoading[ind] && <CustomLoader />}
            <Image
              onLoad={e => handleImageOnLoad(e, ind)}
              className={styles.image}
              src={url}
              //   size="medium"
            />
          </div>
        );
      })}
      {currentIndex > 0 && (
        <Icon
          onClick={e => {
            e.stopPropagation();
            setCurrentIndex(index => index - 1);
          }}
          className={`${styles['carousel-indicator']} ${styles.left}`}
          circular
          name="angle left"
        />
      )}
      {currentIndex < images.length - 1 && (
        <Icon
          onClick={e => {
            e.stopPropagation();
            setCurrentIndex(index => index + 1);
          }}
          className={`${styles['carousel-indicator']} ${styles.right}`}
          circular
          name="angle right"
        />
      )}
    </div>
  );
};
{
  /* <Divider /> */
}
{
  /* <CustomDotGroup slides={3} /> */
}

export default ImageCarousel;

/* 
<Carousel
                className={styles['cat-details']}
                elements={data.info.map(({ url, id }) => {
                  return {
                    render: () => (
                      
                    )
                  };
                })}
                animation="slide left"
                showNextPrev={false}
                showIndicators={true}
              />
*/
