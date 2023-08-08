import React, { useState, useEffect } from "react";
import { PlayerStyle } from "./Player.style";
import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { getChannels, getCountries } from "../../api";
import { ChannelList } from "../ChannelList";
import { CountryList } from "../CountryList";
import { selector, useRecoilValue, useRecoilState } from "recoil";
import { channelItemState, countryItemState, selectedChannelState } from "../../recoilContext";
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
  const [country, setCountry] = useState([]);
  const [activeIndex, setActiveIndex] = useRecoilState(selectedChannelState);

  const getChannelList = async () => {
    const channel: M3uChannel = await getChannels();
    setChannel(channel);
  };

  const getCountryList = async () => {
    const country: Country = await getCountries();
    setCountry(country);
  };

  useEffect(() => {
    getChannelList();
    getCountryList();
  }, []);

  const channelItemSelected = selector({
    key: "channelItemSelected",
    get: ({ get }) => {
      const channel = get(channelItemState);
      return channel;
    }
  });

  const countryItemSelected = selector({
    key: "countryItemSelected",
    get: ({ get }) => {
      setActiveIndex(0);
      const country = get(countryItemState);
      return country.name;
    }
  });

  const channelItem = useRecoilValue(channelItemSelected);
  const selectedCountry = useRecoilValue(countryItemSelected);
  const selectedChannel = channel.filter((item: M3uChannel) => item.groupTitle === selectedCountry);
  const selectedUrl = (selectedChannel as M3uChannel).find((item: M3uChannel) => item.tvgId === channelItem.tvgId)?.url || (selectedChannel as M3uChannel)[0]?.url;
  return (
    // <Spinner size="xl">
    <>
      <CountryList list={country} />
      <PlayerStyle />
      <Box aspectRatio={"16/9"} width={"100%"}>
        <ReactPlayer
          url={selectedUrl}
          width={props.width}
          height={"auto"}
          playing={props.autoplay}
          muted={props.muted}
          controls={props.controls}
        />
        <ChannelList list={selectedChannel} activeIndex={activeIndex} />
      </Box>
      {/* </Spinner> */}
    </>
  );
};

Player.defaultProps = defaultProps;
