import React, { useEffect, useContext, useRef } from "react";
import SoundPlayerContext from "@/core/contexts/SoundPlayer";
import LoadBar from "@/core/components/LoadBar";
import "./style.css";

export default function TracksList() {
  const {
    albums,
    tracks,
    expand,
    setSelected,
    setTime,
    setPlaying,
    setBuffering,
  } = useContext(SoundPlayerContext);
  const trackRef = useRef(null);
  useEffect(() => {
    if (!expand) trackRef.current.scrollTo(0, 0);
  }, [expand]);

  return (
    <div
      ref={trackRef}
      className={`track-mask mask--${expand ? "open" : "close"}`}
    >
      <ol className="tracks">
        {tracks.map(
          ({ name, album, id, selected, isPlaying, buffering, src }, index) => {
            return (
              <li
                tabIndex="0"
                role="button"
                aria-pressed="false"
                className={`track-info ${expand && "appear-up"} track-info--${
                  selected && "selected"
                }`}
                key={id}
                style={{ animationDelay: `${0.25 + index / 10}s` }}
                onClick={() => setSelected(id)}
              >
                {buffering && <LoadBar></LoadBar>}
                {selected && (
                  <audio
                    onWaiting={() => setBuffering(true)}
                    onLoadStart={() => {
                      console.log("buffering");
                      setTime({
                        target: {
                          currentTime: 0,
                          duration: 0,
                        },
                      });
                      setBuffering(true);
                    }}
                    onCanPlay={() => {
                      setPlaying(true);
                      console.log("can play");
                    }}
                    onEnded={() => setPlaying(false)}
                    onTimeUpdate={(event) => {
                      setTime(event);
                      setBuffering(false);
                    }}
                    src={src}
                    data-id={id}
                  ></audio>
                )}
                <div
                  className={`track-info__image ${isPlaying && "spin"}`}
                  style={{
                    backgroundImage: `url(${albums[album].cover})`,
                  }}
                >
                  <div className="track-info__image__dot"></div>
                </div>
                <div className="wrap-info-content">
                  <p className="track-info__album ">
                    {albums[album].name}
                    <span className="track-info__album__mark "></span>
                  </p>
                  <b className="track-info__track">{name}</b>
                </div>
              </li>
            );
          }
        )}
      </ol>
    </div>
  );
}
