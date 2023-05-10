import styles from "../styles/videoList.module.scss";
import {
  VideoListType,
} from "../types/videoSelectionPageTypes";

export const VideoList = ({
  offSet,
  currentFilms,
  carouselItem,
  animation,
  testKey,
}: VideoListType) => {
  console.log(offSet)
  return (
    <div className={`${styles.wrapperItem} ${animation}`}
    style={{transform: `translate3d(-${offSet}%, 0, 0)`}}
    >
      {currentFilms.map((value, index) => {
        return (
          <img
            alt={value.title}
            data-testid={testKey + value.title}
            src={value.srcUrl}
            key={value.title}
            role={(index + 1).toString()}
            className={`${carouselItem} ${styles.carouselNonWidth}`}
          ></img>
        );
      })}
    </div>
  );
};
