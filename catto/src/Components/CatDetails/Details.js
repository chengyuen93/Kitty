import React from 'react';
import { Divider, Flag, Header, Icon, Label, Rating } from 'semantic-ui-react';
import styles from './styles.module.css';

const Details = ({ details }) => {
  const {
    adaptability,
    affection_level,
    // alt_names,
    cfa_url,
    child_friendly,
    country_code,
    // country_codes,
    description,
    dog_friendly,
    energy_level,
    experimental,
    grooming,
    hairless,
    health_issues,
    hypoallergenic,
    // id,
    indoor,
    intelligence,
    lap,
    life_span,
    name,
    natural,
    origin,

    rare,
    // reference_image_id,
    rex,
    shedding_level,
    short_legs,
    social_needs,
    stranger_friendly,
    suppressed_tail,
    temperament,
    vcahospitals_url,
    vetstreet_url,
    vocalisation,
    weight,
    wikipedia_url
  } = details;

  const badges = {
    country_code,
    experimental,
    hairless,
    hypoallergenic,
    indoor,
    lap,
    natural,
    rare,
    rex,
    short_legs,
    suppressed_tail
  };

  const lifeInfo = {
    life_span: life_span + ' years',
    ['weight_(_imperial_)']: weight?.imperial + ' lbs',
    ['weight_(_metric_)']: weight?.metric + ' kg'
  };

  const stars = {
    affection_level,
    adaptability,
    child_friendly,
    dog_friendly,
    energy_level,
    grooming,
    health_issues,
    intelligence,
    shedding_level,
    social_needs,
    stranger_friendly,
    vocalisation
  };

  const urls = {
    cfa: {
      name: "The Cat Fanciers' Association",
      url: cfa_url
    },
    vcahospitals: {
      name: 'VCA Hospitals',
      url: vcahospitals_url
    },
    vetstreet: { name: 'Vetstreet', url: vetstreet_url },
    wikipedia: {
      name: 'Wikipedia',
      url: wikipedia_url
    }
  };

  return (
    <div className={styles['info-container']}>
      {/* badges */}
      <div className={styles['badges-container']}>
        {Object.keys(badges).map(key => {
          const name = key.split('_').join(' ');
          const capitalized = name[0].toUpperCase() + name.slice(1);

          return key === 'country_code' ? (
            <Label key={key}>
              <Flag name={badges[key].toLowerCase()} />
              {origin}
            </Label>
          ) : badges[key] === 1 ? (
            <Label key={key}>{capitalized}</Label>
          ) : null;
        })}
      </div>

      {/* name and description */}
      <h3>{name}</h3>
      {temperament && (
        <h5 className={styles['force-margin-top-collapse']}>
          <em>{temperament}</em>
        </h5>
      )}
      {description && <div>{description}</div>}

      <Divider className={styles['horizontal-divider']} />

      {/* weight and lifespans */}
      {Object.keys(lifeInfo).map(key => {
        if (!lifeInfo[key]) return null;

        const name = key
          .split('_')
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(' ');

        return (
          <div key={key} className={styles['life-info']}>
            <span>{name}</span>
            <span>{lifeInfo[key]}</span>
          </div>
        );
      })}

      {/* ratings */}
      {Object.keys(stars).map(key => {
        if (!stars[key]) return null;

        const name = key
          .split('_')
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(' ');

        return (
          <div key={key} className={styles.rating}>
            <span>{name}</span>
            <Rating
              clearable={false}
              disabled
              icon="star"
              defaultRating={stars[key]}
              maxRating={5}
            />
          </div>
        );
      })}

      <Divider className={styles['horizontal-divider']} />

      {/* urls */}
      <div className={styles['url-container']}>
        {Object.keys(urls).map(link => {
          if (!urls[link].url) return null;

          const name = urls[link].name;
          return (
            <Label as={'a'} href={urls[link].url} target={'_blank'} key={link}>
              {name}
              <Icon name="share square" />
            </Label>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
