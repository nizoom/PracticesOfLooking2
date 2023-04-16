import React, { useEffect, useState } from "react";
// import PlayBtn from "../SubChapters/10.1/misc/play-button.png";
import ReactHowler from "react-howler";
import { VideoPlayer } from "./Movie";
import { srcImage } from "../Content";
import { MediaComponentTypedProps } from "../types";

const MediaComponent: React.FC<MediaComponentTypedProps> = (
  MediaComponentTypedProps
) => {
  const [play, setPlay] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const togglePlay = () => {
    setPlay(!play);
  };
  useEffect(() => {
    const propValues = Object.values(MediaComponentTypedProps);
    const loadTestResult = propValues.filter((media) => media);
    if (loadTestResult.length > 0) {
      setIsLoaded(true);
      console.log(MediaComponentTypedProps);
    }
  }, [MediaComponentTypedProps]);

  return (
    <div>
      {!isLoaded ? null : (
        <div className="media-component-wrapper">
          {MediaComponentTypedProps.audioUrl ? (
            <div className="audio-player-wrapper">
              <button className="play-btn" onClick={togglePlay}>
                {!play ? (
                  <img
                    src={require("../SubChapters/10.1/misc/play-button.png")}
                    height="50"
                    width="50"
                    alt="play-audio"
                    style={{ marginLeft: "2px" }}
                  />
                ) : (
                  <img
                    src={require("../SubChapters/10.1/misc/pause-button.png")}
                    height="50"
                    width="50"
                    alt="play-audio"
                  />
                )}
                <ReactHowler
                  src={MediaComponentTypedProps.audioUrl}
                  playing={play}
                />
              </button>
            </div>
          ) : null}

          <div className="image-wrapper">
            {MediaComponentTypedProps.videoUrl ? (
              <VideoPlayer videoUrl={MediaComponentTypedProps.videoUrl} />
            ) : (
              <img
                className="image-square"
                src={srcImage(MediaComponentTypedProps.imageAsset)}
                alt={MediaComponentTypedProps.imgTitle}
                width="200"
                height="400"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaComponent;

// useEffect(() => {
//   if (!props.movieStatus) {
//     const imageSrc = require(`../SubChapters/${props.subChapter}/images/image${props.page}.png`);
//     setImg(imageSrc);
//   }
//   setPlay(false);
// }, [props.page]);

//{require(`../SubChapters/${props.subChapter}/audio/audio${props.page}.mp3`)}
