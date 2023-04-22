import { FC, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import player from "video.js/dist/types/player.js";
import { VideoOption } from "./videoOption/VideoOptions";
import "video.js/dist/video-js.css";
import styles from "./videoSelection.module.scss";

type ResizeEvent = {
  target: {
    innerWidth: number;
  };
};

export const VideoSelectionComponent = ({ test }: { test: string }) => {
  const [opacity, opacityUpdate] = useState(1);
  const [moreInfo, updateMoreInfo] = useState({
    show: false,
    videoLocation: 0,
  });
  const [width, updateWidth] = useState(0);

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<player>();

  // we come from api call
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    muted: false,
    fluid: true,
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
    ],
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      // console.log(window.innerWidth)
      if (window.innerWidth > 1400) updateWidth(6);
      if (window.innerWidth <= 1400 && window.innerWidth > 1100) updateWidth(5);
      if (window.innerWidth === 1100) updateWidth(4);
      if (window.innerWidth === 800) updateWidth(3);
      if (window.innerWidth === 500) updateWidth(2);
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    if (opacity === 1) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      // have video begin on landing page after 1 second - again this can be dynamic

      setTimeout(() => {
        playerRef.current = videojs(videoElement, videoJsOptions, () => {
          videojs.log("player is ready");
          opacityUpdate((state) => state - 0.1);
        });
      }, 1000);

      //stop video playing on landing page after 15 seconds - will become dynamic
      setTimeout(() => {
        playerRef.current?.pause();
      }, 15000);
    }
  }, [videoJsOptions, videoRef, opacity]);

  //SEE IF I CAN REFACTOR TIS TO USE TRANSITION-PROPERTY INSTEAD
  useEffect(() => {
    // fade out screen opacity
    if (opacity >= 0 && opacity < 1) {
      setTimeout(() => {
        opacityUpdate((state) => state - 0.2);
      }, 60);
    }
  }, [opacity]);

  return (
    <div className={styles.videoSelectionPageWrapper}>
      <div className={styles.videoWrapper}>
        <div ref={videoRef} />
        <div className={styles.videoInfoGrid}>
          <div
            className={styles.videoTitle}
            onClick={() => {
              playerRef.current?.pause();
              // updateMoreInfo({
              //   show: true,
              //   videoLocation: playerRef.current
              //     ? playerRef.current.currentTime()
              //     : 0,
              // });
            }}
          >
            TITLE
          </div>
          <div
            className={styles.videoMuteAndRating}
            onClick={() =>
              playerRef.current?.muted(!playerRef.current?.muted())
            }
          >
            MUTE
          </div>
        </div>
        {opacity >= 0 && (
          <div
            className={styles.startScreen}
            style={{
              opacity: `${opacity.toString()}`,
            }}
          >
            start screen
          </div>
        )}
      </div>
      <VideoOption key={1} width={width} />
    </div>
  );
};
