import styles from "../styles/offsetValues.module.scss";

export const correctAnimationStyle = (
  moveBackwards: boolean,
  forwards: boolean,
  currentFilms: string[]
): string => {
  if (currentFilms.length === 20) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault6Items
      : moveBackwards
      ? styles.offSetBackwards6Items
      : styles.offSetForward6Items;
  }
  if (currentFilms.length === 17) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault5Items
      : moveBackwards
      ? styles.offSetBackwards5Items
      : styles.offSetForward5Items;
  }
  if (currentFilms.length === 14) {
    return !moveBackwards && !forwards
      ? styles.offSetDefaul4Items
      : moveBackwards
      ? styles.offSetBackwards4Items
      : styles.offSetForward4Items;
  }
  if (currentFilms.length === 11) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault3Items
      : moveBackwards
      ? styles.offSetBackwards3Items
      : styles.offSetForward3Items;
  }
  return !moveBackwards && !forwards
    ? styles.offSetDefault2Items
    : moveBackwards
    ? styles.offSetBackwards2Items
    : styles.offSetForward2Items;
};

export const selectCarouseWidth = (currentFilms: string[]): string => {
  if (currentFilms.length === 20) {
    return styles.carouselItem6;
  }
  if (currentFilms.length === 17) {
    return styles.carouselItem5;
  }
  if (currentFilms.length === 14) {
    return styles.carouselItem4;
  }
  if (currentFilms.length === 11) {
    return styles.carouselItem3;
  }
  if (currentFilms.length === 8) {
    return styles.carouselItem2;
  }
  return "";
};