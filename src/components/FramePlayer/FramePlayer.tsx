import ReactPlayer from "react-player";

export const FramePlayer: React.FunctionComponent = () => {
  return (
  // <iframe src={"https://thetvapp.to/tv/wabc-new-york-abc-east-live-stream/"} style={{aspectRatio: 16/9}} width="100%" height="100%" allow="autoplay; fullscreen; picture-in-picture" /> 
  // );
  <ReactPlayer
          url={"https://content-auso1.uplynk.com/channel/640a5a594b434c2691e20580afda564f/g.m3u8?pbs=7c562f71727a4a088dc14f3712866c24"}
          width={"100%"}
          height={"100%"}
          playing={true}
          muted={false}
          controls={true}
          playsinline={true}
        />
  )
};
