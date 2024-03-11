

export const FramePlayer: React.FunctionComponent = () => {
  return (
  <iframe src={"https://awardstreams.netlify.app/jwplayer"} style={{aspectRatio: 16/9}} width="100%" height="100%" allow="autoplay; fullscreen; picture-in-picture" /> 
  );
};
