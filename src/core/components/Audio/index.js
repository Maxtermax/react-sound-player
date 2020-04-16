import React from "react";

export default function Audio(props) {
  return (
    <audio
      onWaiting={() => props.setBuffering(true)}
      onLoadStart={() => {
        props.setTime({
          target: {
            currentTime: 0,
            duration: 0,
          },
        });
        props.setBuffering(true);
      }}
      onCanPlay={() => props.setPlaying(true)}
      onEnded={() => props.setPlaying(false)}
      onTimeUpdate={(event) => {
        props.setTime(event);
        props.setBuffering(false);
      }}
      src={props.src}
      data-id={props.id}
    ></audio>
  );
}
