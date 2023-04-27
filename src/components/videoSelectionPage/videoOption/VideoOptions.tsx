import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/videoOption.module.scss";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { VideoPositionFlow } from "../videoPositionFlow/videoPositionFlow";
import { VideoList } from "../videoList/VideoList";
import {
  correctAnimationStyle,
  selectCarouseWidth,
  videoPositionViewArray,
} from "../helperFunctions/videoStylesHelpers";
import chev from "../assets/chevron.png";
import chevLeft from "../assets/chevron-left.png";

type VideoOption = {
  width: number;
  imageArray: string[];
};

export const VideoOption = memo(function VideoOption({
  width,
  imageArray,
}: VideoOption) {
  const [allFilms, updateFilms] = useState<string[]>(imageArray);

  const [clickbackwards, updateClickbackwards] = useState(0);
  const [clickForwards, updateClickForwardss] = useState(0);

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
  }, [currentFilms]);

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
          onClick={() => {
            clickForwards > 0 ? updateClickbackwards(clickbackwards + 1) : null;
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
        className={`${styles.moveForwardsChevron}`}
        onClick={() => {
          updateClickForwardss(clickForwards + 1);
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
      />
    </div>
  );
});
