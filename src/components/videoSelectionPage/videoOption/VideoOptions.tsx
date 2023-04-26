import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import styles from "./videoOption.module.scss";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { correctAnimationStyle, selectCarouseWidth } from "../helperFunctions/videoStylesHelpers";
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
    "26 26 26 26 26 26 26",
    "27 27 27 27 27 27 27",
    "28 28 28 28 28 28",
    "29 29 29 29 29 29 29",
    "30 30 30 30 30 30 30 30"
  ]);

  const [clickbackwards, updateClickbackwards] = useState(0);
  const [clickForwards, updateClickForwardss] = useState(0);

  const id = useMemo(() => {
    return uuidv4()
  }, [])

  const { currentFilms, moveBackwards, forwards } = useThrottle(
    allFilms,
    clickbackwards,
    clickForwards,
    width,
    id
  );

  // worth noting there were issues with next and styled components

  const offSet = useMemo(() => {
    return correctAnimationStyle(moveBackwards, forwards, currentFilms);
  }, [moveBackwards, forwards, currentFilms]);

  const carouselItem = useMemo(() => {
    return selectCarouseWidth(currentFilms);
  }, [currentFilms]);

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
              <div
                key={value}
                className={`${carouselItem} ${styles.carouselNonWithWidth}`}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
