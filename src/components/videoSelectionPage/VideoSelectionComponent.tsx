import { useEffect, useState } from "react";
import "video.js/dist/video-js.css";
import { VideoOption } from "./videoOption/VideoOptions";
import { setWindowWidth } from "./helperFunctions/videoPageWidthHelpers";
import styles from "./styles/videoSelection.module.scss";
import { imageArray } from "../../data/imageArray";
import { ImageArrayType } from "./types/videoSelectionPageTypes"


export const VideoSelectionComponent = () => {
  const [width, updateWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(updateWidth);
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className={styles.videoSelectionPageWrapper}>
      {imageArray.map((options: ImageArrayType) => (
        <VideoOption
          key={options.key}
          width={width}
          imageArray={options.films}
          testKey={options.key}
        />
      ))}
    </div>
  );
};
