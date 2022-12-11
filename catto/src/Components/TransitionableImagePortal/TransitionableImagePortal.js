import React from 'react';
import { TransitionablePortal, Dimmer, Image } from 'semantic-ui-react';
import styles from './styles.module.css';

const TransitionableImagePortal = ({
  previewImage,
  open,
  setOpen,
  setPreviewImage
}) => {
  return (
    <TransitionablePortal
      open={open}
      onClose={() => {
        setOpen(false);
        setPreviewImage(null);
      }}
      transition={{
        animation: 'scale',
        duration: 100
      }}
    >
      <Dimmer
        onClick={() => setOpen(false)}
        className={styles.dimmer}
        page
        active
      >
        <div className={styles.container}>
          <Image
            onClick={e => e.stopPropagation()}
            // size="big"
            src={previewImage}
          />
        </div>
      </Dimmer>
    </TransitionablePortal>
  );
};

export default TransitionableImagePortal;
