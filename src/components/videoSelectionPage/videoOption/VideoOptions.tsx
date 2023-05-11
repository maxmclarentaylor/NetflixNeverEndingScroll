import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { VideoPositionFlow } from "../videoPositionFlow/videoPositionFlow";
import { VideoList } from "../videoList/VideoList";
import {
  correctAnimationStyle,
  selectCarouseWidth,
  videoPositionViewArray,
} from "../helperFunctions/videoStylesHelpers";
import {
  IndividualFilm,
  VideoOptionType,
} from "../types/videoSelectionPageTypes";
import chev from "../assets/chevron.png";
import chevLeft from "../assets/chevron-left.png";
import styles from "../styles/videoOption.module.scss";


export const VideoOption = memo(function VideoOption({
  width,
  imageArray,
  testKey,
}: VideoOptionType) {
  const [allFilms, updateFilms] = useState<IndividualFilm[]>(imageArray);

  const [clickbackwards, updateClickBackwards] = useState(0);
  const [clickForwards, updateClickForwards] = useState(0);

  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const { currentFilms, moveBackwards, forwards } = useThrottle(
    allFilms,
    clickbackwards,
    clickForwards,
    width,
    id
  );

  const offSet = useMemo(() => {
    return correctAnimationStyle(moveBackwards, forwards, currentFilms, allFilms);
  }, [moveBackwards, forwards, currentFilms]);

  const carouselItem = useMemo(() => {
    return selectCarouseWidth(currentFilms);
  }, [currentFilms]);

  const positionArray = useMemo(() => {
    return videoPositionViewArray(currentFilms, allFilms);
  }, [currentFilms, allFilms]);

  const animation = useMemo(() => {
    return moveBackwards || forwards ? styles.animation : "";
  }, [moveBackwards, forwards]);

  return (
    <div className={`${styles.headWrap}`}>
      <VideoPositionFlow positionArray={positionArray} />
      <div
        className={`${styles.moveBackCover} ${styles.directionAnimation}`}
        style={{ opacity: clickForwards < 1 ? 1 : 0.7 }}
      ></div>
      {clickForwards > 0 && (
        <div
          data-testid={testKey + " " + "back"}
          onClick={() => {
            clickForwards > 0 ? updateClickBackwards(clickbackwards + 1) : null;
          }}
          className={`${styles.moveBackChevron}`}
        >
          <Image
            src={chevLeft}
            alt="Click back"
            fill={true}
            style={{ objectFit: "contain", opacity: clickForwards < 1 ? 0 : 1 }}
          />
        </div>
      )}
      <div
        data-testid={testKey + " " + "forward"}
        className={`${styles.moveForwardsChevron}`}
        onClick={() => {
          updateClickForwards(clickForwards + 1);
        }}
      >
        <Image
          src={chev}
          alt="Click forward"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={`${styles.moveForwards} ${styles.directionAnimation}`}
      ></div>
      <VideoList
        offSet={offSet}
        currentFilms={currentFilms}
        carouselItem={carouselItem}
        animation={animation}
        testKey={testKey}
      />
    </div>
  );
});
