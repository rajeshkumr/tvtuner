import React, { useState, useEffect } from "react";
import { PlayerStyle } from "./Player.style";
import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { getChannels } from "../../api";
import { Carousel } from "../Carousel";
import { selector, useRecoilValue } from "recoil";
import { channelItemState } from "../../recoilContext";
import { M3uChannel } from "@iptv/playlist";

interface Player {
  width?: string;
  style?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
}

const defaultProps: Player = {
  width: "100%",
  style: "",
  controls: true,
  autoplay: false,
  muted: true,
}


export const Player: React.FunctionComponent<Player> = (props) => {
  const [channel, setChannel] = useState([]);

  const getChannelList = async () => {
    const channel: M3uChannel = await getChannels();
    setChannel(channel);
  };

  useEffect(() => {
    getChannelList();
  }, []);

  const channelItemSelected = selector({
    key: "channelItemSelected",
    get: ({ get }) => {
      const channel = get(channelItemState);
      return channel.url;
    }
  });

  const channelUrl = useRecoilValue(channelItemSelected);

  return (
    // <Spinner size="xl">
    <>
      <PlayerStyle />
      <Box aspectRatio={"16/9"} width={"100%"}>
      <ReactPlayer
        url={channelUrl}
        width={props.width}
        height={"auto"}
        playing={props.autoplay}
        muted={props.muted}
        controls={props.controls}
      />
      <Carousel channel={channel} />
      </Box>
      {/* </Spinner> */}
    </>
  );
};

Player.defaultProps = defaultProps;
