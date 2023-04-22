import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import styles from "./videoOption.module.scss";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { v4 as uuidv4 } from "uuid";

type VideoOption = {
  width: number;
};

export const VideoOption = memo(function VideoOption({ width }: VideoOption) {
  const [allFilms, updateFilms] = useState<string[]>([
    "11111111111",
    "22222222",
    "3333333",
    "444444",
    "555555",
    "666666",
    "777777",
    "888888",
    "999999999",
    "10 101 01 10 10 10 10",
    "11 11 11 11 11 11 11 ",
    "12 12 12 12 12 12",
    "13 13 13 13 13 13 13",
    "14 14 14 14 14 14",
    "15 15 15 15 15",
    "16 16 16 16 16 16",
    "17 17 17 17 17 17",
    "18 18 18 18 18 18 181 8",
    "19 19 19 19 19 19 19",
    "20 20 20 20 20 20 20 20",
    "21 21 21 21 21 21 21 21",
    "22 22 22 222 22 22 22 22 22",
    "23 23 23 23 23 23 23",
    "J24 24  24 24 24 24",
    "25 25 25 25 25 25",
  ]);

  const [clickbackwards, updateClickbackwards] = useState(0);
  const [clickForwards, updateClickForwardss] = useState(0);

  const { currentFilms, moveBackwards, forwards } = useThrottle(
    allFilms,
    clickbackwards,
    clickForwards,
    width
  );

  // worth noting there were issues with next and styles components

  const offSet = useMemo(() => {
    if(currentFilms.length === 20) {
      return styles.offSet
    }
    if(currentFilms.length === 17){
      return styles.offSet6
    }
    return !moveBackwards && !forwards
      ? styles.offSet
      : moveBackwards
      ? styles.offSetTrue
      : styles.offSetForward;
  }, [moveBackwards, forwards, clickForwards, currentFilms]);

  const carouselItem = useMemo(() => {
    if(currentFilms.length === 20) {
      return styles.carouselItem
    }
    if(currentFilms.length === 17){
      return styles.carouselItem5
    }
  },[currentFilms])

  const animation = useMemo(() => {
    return moveBackwards || forwards ? styles.animation : "";
  }, [moveBackwards, forwards]);

  return (
    <div>
      <div
        onClick={() => {
          clickForwards > 0 ? updateClickbackwards(clickbackwards + 1) : null;
        }}
      >
        back
      </div>
      <div
        style={{ marginTop: "5rem" }}
        onClick={() => {
          updateClickForwardss(clickForwards + 1);
        }}
      >
        forwards
      </div>
      <div className={`${styles.headWrap}`}>
        <div
          className={`${styles.initialOverflowCover} ${styles.initialOverflowCoverAnimation}`}
          style={{ opacity: clickForwards < 1 ? 1 : 0 }}
        ></div>
        <div className={`${offSet} ${styles.wrapperItem} ${animation}`}>
          {currentFilms.map((value, index) => {
            return (
              <div key={value} className={carouselItem}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
