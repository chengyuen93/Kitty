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
      // set the height
      setHeights(h => {
        if (e.target.clientHeight) return [...h, e.target.clientHeight];
      });
      // set image load status
      setImagesLoading(loading => {
        const newLoading = [...loading];
        newLoading[index] = false;
        return newLoading;
      });
    },
    [setHeights, setImagesLoading]
  );

  useEffect(() => {
    // update the height of the image container to set the max of all image heights
    // so that the height does not change when sliding to another picture
    if (heights.length && carouselRef.current) {
      const maxHeight = Math.max(...heights);
      carouselRef.current.style.height = `calc(${maxHeight}px + 1rem)`;
    }
  }, [heights]);

  useEffect(() => {
    // whenever the images array change, set all back to true (loading)
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
            />
          </div>
        );
      })}

      {/* left button to slide the carousel */}
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
      {/* right button to slide the carousel */}
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

export default ImageCarousel;
