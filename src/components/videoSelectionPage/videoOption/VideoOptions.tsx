import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { VideoPositionFlow } from "../videoPositionFlow/videoPositionFlow";
import { VideoList } from "../videoList/VideoList";
import { MoveBack, MoveForwards } from "../directions";
import {
  correctAnimationStyle,
  selectCarouseWidth,
  videoPositionViewArray,
} from "../helperFunctions/videoStylesHelpers";
import {
  IndividualFilm,
  VideoOptionType,
} from "../types/videoSelectionPageTypes";
import styles from "../styles/videoOption.module.scss";

export const VideoOption = memo(function VideoOption({
  width,
  imageArray,
  testKey,
}: VideoOptionType) {
  const [allFilms, updateFilms] = useState<IndividualFilm[]>(imageArray);

  const [clickbackwards, updateClickbackwards] = useState(0);
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
    return correctAnimationStyle(moveBackwards, forwards, currentFilms);
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
        <MoveBack
          testKey={testKey}
          updateClickbackwards={updateClickbackwards}
          clickForwards={clickForwards}
          clickbackwards={clickbackwards}
        />
      )}
      <MoveForwards
        testKey={testKey}
        clickForwards={clickForwards}
        updateClickForwards={updateClickForwards}
      />
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
