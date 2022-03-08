import React from 'react';
import styles from './styles';
import { Animated } from 'react-animated-css';
const CardTitle = ({ title, style }) => {
  return (
    <h2 className="dashboard-heading" style={style}>
      {title}
    </h2>
  );
};

const CardQuote = ({ quote }) => {
  return <p className="dash-text">{quote}</p>;
};

const CardTime = ({ time }) => {
  return <h6 className="dash-time m-b-30">{time}</h6>;
};

const CardDescription = ({
  description,
  style,
  animationIn,
  animationOut,
  isVisible,
  animationInDelay,
}) => {
  return (
    <Animated
      animationIn={animationIn}
      animationOut={animationOut}
      animationInDelay={animationInDelay}
      isVisible={isVisible}>
      <p className="dash-text" style={style}>
        {description}
      </p>
    </Animated>
  );
};

const CardContent = ({
  content,
  style,
  isVisible,
  animationIn,
  animationOut,
  animationInDelay,
}) => {
  return (
    <Animated
      animationIn={animationIn}
      animationOut={animationOut}
      isVisible={isVisible}
      animationInDelay={animationInDelay}>
      <p className="dash-text" style={{ ...styles.content, ...style }}>
        {content}
      </p>
    </Animated>
  );
};
const CardAudio = ({ src, style }) => {
  return (
    <div style={{ ...styles.audioWrapper, ...style }}>
      <audio controls="controls" preload="none" onclick="this.play()">
        <source type="audio/mp3" src={src} />
      </audio>
    </div>
  );
};

const CardVideo = ({ src, style }) => {
  return (
    <div
      className="dash-icon text-center"
      style={{
        ...styles.videoDiv,
        ...style,
      }}>
      <video
        width="100%"
        height="100%"
        controls="controls"
        preload="none"
        onclick="this.play()">
        <source type="video/mp4" src={src} />
      </video>
    </div>
  );
};
const CustomImage = ({
  src,
  style,
  title,
  imageStyle,
  animationIn,
  animationOut,
  animationInDelay,
  imageSize = "small"
}) => {
  return (
    <Animated
      animationIn={animationIn}
      animationOut={animationOut}
      animationInDelay={animationInDelay}>
      <div className="dash-icon" style={{ ...styles.imageWrapper, ...style },
        imageSize == "medium" ?
          { ...styles.mediumimageWrapper } : imageSize == "large" ? { ...styles.largeimageWrapper } : { ...styles.imageWrapper }
      }>
        <img
          className="nav-hover"
          src={src}
          style={{ ...styles.imageTag, ...imageStyle }}
        />
      </div>
      <p style={{ textAlign: 'center' }}>{title} </p>
    </Animated>
  );
};
export {
  CardTitle,
  CardQuote,
  CardTime,
  CardDescription,
  CardContent,
  CardAudio,
  CustomImage,
  CardVideo,
};
