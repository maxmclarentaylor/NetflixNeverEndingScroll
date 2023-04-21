import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import styles from "./videoOption.module.scss";
import { useThrottle } from "../customHooks/VideoSelectionThrottle";
import { v4 as uuidv4 } from "uuid";

export const VideoOption = memo(function VideoOption() {
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

  const { currentFilms, backwards, forwards } = useThrottle(
    allFilms,
    clickbackwards,
    clickForwards
  );

  const offSetInitalFilmlist = useMemo(() => {
    if (forwards.forwards && !forwards.firstFilmList) {
      return styles.firstOffSet;
    }

    if (!forwards.firstFilmList && !forwards.forwards) {
      return styles.offSet;
    }
  }, [forwards]);

  const offSet = useMemo(() => {
    return !backwards && !forwards.forwards
      ? styles.offSet
      : backwards
      ? styles.offSetTrue
      : styles.offSetForward;
  }, [backwards, forwards, clickForwards]);

  const animation = useMemo(() => {
    return backwards || forwards.forwards ? styles.animation : "";
  }, [backwards, forwards]);

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
          className={`${
            forwards.throttleClick ? offSetInitalFilmlist : offSet
          } ${styles.wrapperItem} ${animation}`}
        >
          {currentFilms.map((value) => {
            return (
              <div key={value} className={styles.carouselItem}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
