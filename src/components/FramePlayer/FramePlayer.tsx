import ReactPlayer from "react-player";

export const FramePlayer: React.FunctionComponent = () => {
  return (
  // <iframe src={"https://thetvapp.to/tv/wabc-new-york-abc-east-live-stream/"} style={{aspectRatio: 16/9}} width="100%" height="100%" allow="autoplay; fullscreen; picture-in-picture" /> 
  // );
  <ReactPlayer
          url={"https://content.uplynk.com/channel/ext/96195dc445894d079a91958abba8d3af/kfsn_24x7_news.m3u8"}
          width={"100%"}
          height={"100%"}
          playing={true}
          muted={false}
          controls={true}
          playsinline={true}
        />
  )
};
