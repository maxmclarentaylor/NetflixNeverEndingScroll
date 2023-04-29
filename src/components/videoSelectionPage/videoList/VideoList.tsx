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
  return (
    <div className={`${offSet} ${styles.wrapperItem} ${animation}`}>
      {currentFilms.map((value, index) => {
        return (
          <img
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
