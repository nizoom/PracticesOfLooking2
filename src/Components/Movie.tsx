import React from "react";
import ReactPlayer from "react-player/lazy";

type VideoPlayerProps = {
  videoUrl: string;
};
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  // try adding movie to build folder instead
  return (
    <div className="movie-player-wrapper">
      <ReactPlayer
        url={videoUrl}
        width="400"
        height="400"
        controls={false}
        config={{
          youtube: {
            playerVars: { showinfo: 0 },
          },
        }}
      />
    </div>
  );
};
