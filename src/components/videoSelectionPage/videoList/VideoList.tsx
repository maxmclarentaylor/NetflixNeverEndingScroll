import styles from "../styles/videoList.module.scss";

type VideoList = {
  offSet: string;
  currentFilms: string[];
  carouselItem: string;
  animation: string;
};

export const VideoList = ({
  offSet,
  currentFilms,
  carouselItem,
  animation,
}: VideoList) => {
  return (
    <div className={`${offSet} ${styles.wrapperItem} ${animation}`}>
      {currentFilms.map((value, index) => {
        return (
          <img
            src={value}
            key={value}
            className={`${carouselItem} ${styles.carouselNonWidth}`}
          ></img>
        );
      })}
    </div>
  );
};
